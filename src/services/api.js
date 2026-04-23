// 服务层：与后端 API 交互
const API_BASE_URL = 'http://localhost:3001/api';

// 通用请求函数
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error('API 请求失败');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API 请求错误:', error);
    // 降级到本地存储
    return null;
  }
}

// 设计师相关服务
const designerService = {
  getDesigners: async () => {
    const data = await fetchApi('/designers');
    if (data) return data;
    return JSON.parse(localStorage.getItem('designers') || '[]');
  },
  
  createDesigner: async (designer) => {
    const data = await fetchApi('/designers', {
      method: 'POST',
      body: JSON.stringify(designer)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('designers') || '[]');
    existing.push(designer);
    localStorage.setItem('designers', JSON.stringify(existing));
    return designer;
  },
  
  updateDesigner: async (id, updates) => {
    const data = await fetchApi(`/designers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('designers') || '[]');
    const updated = existing.map(d => d.id === id ? { ...d, ...updates } : d);
    localStorage.setItem('designers', JSON.stringify(updated));
    return updated.find(d => d.id === id);
  },
  
  deleteDesigner: async (id) => {
    const data = await fetchApi(`/designers/${id}`, {
      method: 'DELETE'
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('designers') || '[]');
    const updated = existing.filter(d => d.id !== id);
    localStorage.setItem('designers', JSON.stringify(updated));
    return { success: true };
  }
};

// 客户相关服务
const clientService = {
  getClients: async () => {
    const data = await fetchApi('/clients');
    if (data) return data;
    return JSON.parse(localStorage.getItem('clients') || '[]');
  },
  
  createClient: async (client) => {
    const data = await fetchApi('/clients', {
      method: 'POST',
      body: JSON.stringify(client)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('clients') || '[]');
    existing.push(client);
    localStorage.setItem('clients', JSON.stringify(existing));
    return client;
  },
  
  deleteClient: async (username) => {
    const data = await fetchApi(`/clients/${username}`, {
      method: 'DELETE'
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('clients') || '[]');
    const updated = existing.filter(c => c.username !== username);
    localStorage.setItem('clients', JSON.stringify(updated));
    return { success: true };
  }
};

// 平台相关服务
const platformService = {
  getPlatforms: async () => {
    const data = await fetchApi('/platforms');
    if (data) return data;
    return JSON.parse(localStorage.getItem('platforms') || '[]');
  },
  
  createPlatform: async (platform) => {
    const data = await fetchApi('/platforms', {
      method: 'POST',
      body: JSON.stringify(platform)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('platforms') || '[]');
    existing.push(platform);
    localStorage.setItem('platforms', JSON.stringify(existing));
    return platform;
  },
  
  updatePlatform: async (id, updates) => {
    const data = await fetchApi(`/platforms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('platforms') || '[]');
    const updated = existing.map(p => p.id === id ? { ...p, ...updates } : p);
    localStorage.setItem('platforms', JSON.stringify(updated));
    return updated.find(p => p.id === id);
  },
  
  deletePlatform: async (id) => {
    const data = await fetchApi(`/platforms/${id}`, {
      method: 'DELETE'
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('platforms') || '[]');
    const updated = existing.filter(p => p.id !== id);
    localStorage.setItem('platforms', JSON.stringify(updated));
    return { success: true };
  }
};

// 需求相关服务
const requestService = {
  getRequests: async () => {
    const data = await fetchApi('/requests');
    if (data) return data;
    return JSON.parse(localStorage.getItem('requests') || '[]');
  },
  
  createRequest: async (request) => {
    const data = await fetchApi('/requests', {
      method: 'POST',
      body: JSON.stringify(request)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('requests') || '[]');
    existing.push(request);
    localStorage.setItem('requests', JSON.stringify(existing));
    return request;
  },
  
  updateRequest: async (id, updates) => {
    const data = await fetchApi(`/requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('requests') || '[]');
    const updated = existing.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem('requests', JSON.stringify(updated));
    return updated.find(r => r.id === id);
  }
};

// 合作店铺相关服务
const shopService = {
  getShops: async () => {
    const data = await fetchApi('/shops');
    if (data) return data;
    return JSON.parse(localStorage.getItem('shops') || '[]');
  },
  
  createShop: async (shop) => {
    const data = await fetchApi('/shops', {
      method: 'POST',
      body: JSON.stringify(shop)
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('shops') || '[]');
    existing.push(shop);
    localStorage.setItem('shops', JSON.stringify(existing));
    return shop;
  },
  
  deleteShop: async (id) => {
    const data = await fetchApi(`/shops/${id}`, {
      method: 'DELETE'
    });
    if (data) return data;
    
    // 降级到本地存储
    const existing = JSON.parse(localStorage.getItem('shops') || '[]');
    const updated = existing.filter(s => s.id !== id);
    localStorage.setItem('shops', JSON.stringify(updated));
    return { success: true };
  }
};

export {
  designerService,
  clientService,
  platformService,
  requestService,
  shopService
};