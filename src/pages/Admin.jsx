import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { designerService, requestService, platformService, clientService, shopService } from '../services/api';

const Admin = () => {
  const navigate = useNavigate();

  // 设计师数据
  const [designers, setDesigners] = useState([]);
  // 需求数据
  const [requests, setRequests] = useState([]);
  // 平台数据
  const [platforms, setPlatforms] = useState([]);
  // 合作店铺数据
  const [shops, setShops] = useState([]);
  const [newShop, setNewShop] = useState('');
  // 客户数据
  const [clients, setClients] = useState([]);
  // 订单对接管理相关状态
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      // 如果没有登录，重定向到登录页面
      navigate('/admin-login');
    }
  }, [navigate]);

  // 实时同步数据
  useEffect(() => {
    const syncData = async () => {
      // 同步设计师数据
      const designersData = await designerService.getDesigners();
      setDesigners(designersData);
      
      // 同步需求数据
      const requestsData = await requestService.getRequests();
      setRequests(requestsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      
      // 同步平台数据
      const platformsData = await platformService.getPlatforms();
      setPlatforms(platformsData);
      
      // 同步客户数据
      const clientsData = await clientService.getClients();
      setClients(clientsData);
      
      // 同步店铺数据
      const shopsData = await shopService.getShops();
      setShops(shopsData);
    };

    // 初始加载数据
    syncData();

    // 定时轮询检查更新（每5秒）
    const interval = setInterval(syncData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 审核设计师
  const handleReview = async (id, status) => {
    const updatedDesigners = designers.map(designer => {
      if (designer.id === id && status === '已通过' && !designer.employeeId) {
        // 生成工号：DES + 4位序号
        const maxId = Math.max(...designers.map(d => {
          if (d.employeeId && d.employeeId.startsWith('DES')) {
            return parseInt(d.employeeId.substring(3) || '0');
          }
          return 0;
        }));
        const newId = maxId + 1;
        const employeeId = `DES${String(newId).padStart(4, '0')}`;
        return { ...designer, status, employeeId };
      }
      return designer.id === id ? { ...designer, status } : designer;
    });
    setDesigners(updatedDesigners);
    // 保存到后端
    await designerService.updateDesigner(id, updatedDesigners.find(d => d.id === id));
  };

  // 删除设计师
  const handleDelete = async (id) => {
    const updatedDesigners = designers.filter(designer => designer.id !== id);
    setDesigners(updatedDesigners);
    // 保存到后端
    await designerService.deleteDesigner(id);
  };

  // 审核平台
  const handlePlatformReview = async (id, status) => {
    const updatedPlatforms = platforms.map(platform => 
      platform.id === id ? { ...platform, status } : platform
    );
    setPlatforms(updatedPlatforms);
    // 保存到后端
    await platformService.updatePlatform(id, updatedPlatforms.find(p => p.id === id));
  };

  // 删除平台
  const handlePlatformDelete = async (id) => {
    const updatedPlatforms = platforms.filter(platform => platform.id !== id);
    setPlatforms(updatedPlatforms);
    // 保存到后端
    await platformService.deletePlatform(id);
  };

  // 派单给设计师
  const handleAssign = async (id) => {
    const updatedRequests = requests.map(req => {
      if (req.id === id) {
        // 生成订单号：年份+月份+日期+4位序号
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000); // 4位随机数
        const orderNumber = `${year}${month}${day}${random}`;
        return { ...req, status: '已派单', orderNumber };
      }
      return req;
    });
    setRequests(updatedRequests);
    // 保存到后端
    await requestService.updateRequest(id, updatedRequests.find(r => r.id === id));
  };

  // 添加合作店铺
  const handleAddShop = async (e) => {
    e.preventDefault();
    if (newShop) {
      const newId = shops.length + 1;
      const newShopData = { id: newId, name: newShop };
      const updatedShops = [...shops, newShopData];
      setShops(updatedShops);
      // 保存到后端
      await shopService.createShop(newShopData);
      setNewShop('');
    }
  };

  // 删除合作店铺
  const handleDeleteShop = async (id) => {
    const updatedShops = shops.filter(shop => shop.id !== id);
    setShops(updatedShops);
    // 保存到后端
    await shopService.deleteShop(id);
  };

  // 删除客户
  const handleDeleteClient = async (username) => {
    const updatedClients = clients.filter(client => client.username !== username);
    setClients(updatedClients);
    // 保存到后端
    await clientService.deleteClient(username);
  };

  // 处理退款申请
  const handleRefundRequest = async (id, status) => {
    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, refundStatus: status } : req
    );
    setRequests(updatedRequests);
    // 保存到后端
    await requestService.updateRequest(id, updatedRequests.find(r => r.id === id));
  };

  // 计算每个设计师的订单数量
  const getDesignerOrderCount = (designerId) => {
    return requests.filter(req => req.designerId === designerId).length;
  };

  // 过滤和分页
  const filteredRequests = requests.filter(req => {
    const searchLower = searchTerm.toLowerCase();
    return (
      req.type.toLowerCase().includes(searchLower) ||
      (req.designerName && req.designerName.toLowerCase().includes(searchLower)) ||
      (req.orderNumber && req.orderNumber.toLowerCase().includes(searchLower))
    );
  });

  // 计算分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // 改变页码
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin">
      <h2>管理后台</h2>
      
      <div className="admin-section">
        <h3>设计师管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>工号</th>
                <th>姓名</th>
                <th>技能</th>
                <th>状态</th>
                <th>订单数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {designers.map(designer => (
                <tr key={designer.id}>
                  <td>{designer.id}</td>
                  <td>{designer.employeeId || '未生成'}</td>
                  <td>{designer.name}</td>
                  <td>{designer.skills.join(', ')}</td>
                  <td>{designer.status}</td>
                  <td>{getDesignerOrderCount(designer.id)}</td>
                  <td>
                    {designer.status === '待审核' && (
                      <>
                        <button 
                          className="btn small-btn approve-btn"
                          onClick={() => handleReview(designer.id, '已通过')}
                        >
                          通过
                        </button>
                        <button 
                          className="btn small-btn reject-btn"
                          onClick={() => handleReview(designer.id, '已拒绝')}
                        >
                          不通过
                        </button>
                      </>
                    )}
                    <button 
                      className="btn small-btn delete-btn"
                      onClick={() => handleDelete(designer.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>需求管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>类型</th>
                <th>预算</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.type}</td>
                  <td>¥{req.budget}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === '待派单' && (
                      <button 
                        className="btn small-btn assign-btn"
                        onClick={() => handleAssign(req.id)}
                      >
                        派单
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>订单对接管理</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索订单类型、设计师或订单号"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>需求类型</th>
                <th>预算</th>
                <th>状态</th>
                <th>设计师</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.orderNumber || '未生成'}</td>
                  <td>{req.type}</td>
                  <td>¥{req.budget}</td>
                  <td>{req.status}</td>
                  <td>{req.designerName || '未分配'}</td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 分页 */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="admin-section">
        <h3>平台认证管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>平台名称</th>
                <th>联系人</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(platform => (
                <tr key={platform.id}>
                  <td>{platform.id}</td>
                  <td>{platform.platformName}</td>
                  <td>{platform.contactPerson}</td>
                  <td>{platform.status}</td>
                  <td>
                    {platform.status === '待审核' && (
                      <>
                        <button 
                          className="btn small-btn approve-btn"
                          onClick={() => handlePlatformReview(platform.id, '已通过')}
                        >
                          通过
                        </button>
                        <button 
                          className="btn small-btn reject-btn"
                          onClick={() => handlePlatformReview(platform.id, '已拒绝')}
                        >
                          不通过
                        </button>
                      </>
                    )}
                    <button 
                      className="btn small-btn delete-btn"
                      onClick={() => handlePlatformDelete(platform.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>合作店铺管理</h3>
        <div className="shops-list">
          {shops.map(shop => (
            <div key={shop.id} className="shop-item">
              {shop.name}
              <button 
                className="btn small-btn delete-btn"
                onClick={() => handleDeleteShop(shop.id)}
                style={{ marginLeft: '10px' }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddShop} className="add-shop-form">
          <input 
            type="text" 
            value={newShop} 
            onChange={(e) => setNewShop(e.target.value)}
            placeholder="输入店铺名称"
            className="form-control"
            required
          />
          <button type="submit" className="btn add-shop-btn">
            添加店铺
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3>客户管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>账号</th>
                <th>手机号码</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map(client => (
                  <tr key={client.username}>
                    <td>{client.username}</td>
                    <td>{client.phone || '未设置'}</td>
                    <td>
                      <button 
                        className="btn small-btn delete-btn"
                        onClick={() => handleDeleteClient(client.username)}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-orders">
                    暂无客户数据
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section">
        <h3>退款管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>订单ID</th>
                <th>订单类型</th>
                <th>金额</th>
                <th>退款原因</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {requests.filter(req => req.refunded).length > 0 ? (
                requests.filter(req => req.refunded).map(req => (
                  <tr key={req.id}>
                    <td>{req.id}</td>
                    <td>{req.type}</td>
                    <td>¥{req.budget}</td>
                    <td>{req.refundReason || '未填写'}</td>
                    <td>{req.refundStatus || '待处理'}</td>
                    <td>
                      {!req.refundStatus && (
                        <>
                          <button 
                            className="btn small-btn approve-btn"
                            onClick={() => handleRefundRequest(req.id, '已同意')}
                          >
                            同意
                          </button>
                          <button 
                            className="btn small-btn reject-btn"
                            onClick={() => handleRefundRequest(req.id, '已拒绝')}
                          >
                            拒绝
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-orders">
                    暂无退款申请
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-actions">
        <Link to="/analytics" className="btn analytics-btn">
          数据可视化
        </Link>
        <Link to="/" className="btn back-btn">
          返回首页
        </Link>
        <button 
          className="btn logout-btn"
          onClick={() => {
            sessionStorage.removeItem('adminLoggedIn');
            navigate('/admin-login');
          }}
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default Admin;