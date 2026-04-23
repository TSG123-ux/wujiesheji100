// 内存存储模型

// 内存存储
const memoryStorage = {
  designers: [],
  clients: [],
  platforms: [],
  requests: [],
  shops: []
};

// 设计师模型
class Designer {
  constructor(data) {
    this.id = data.id || Date.now();
    this.employeeId = data.employeeId;
    this.name = data.name;
    this.username = data.username;
    this.password = data.password;
    this.skills = data.skills || [];
    this.portfolio = data.portfolio;
    this.status = data.status || '待审核';
  }
  
  static find() {
    return Promise.resolve(memoryStorage.designers);
  }
  
  static findOne(filter) {
    const designer = memoryStorage.designers.find(d => {
      for (let key in filter) {
        if (d[key] !== filter[key]) return false;
      }
      return true;
    });
    return Promise.resolve(designer);
  }
  
  static findOneAndUpdate(filter, updates) {
    const index = memoryStorage.designers.findIndex(d => {
      for (let key in filter) {
        if (d[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.designers[index] = { ...memoryStorage.designers[index], ...updates };
    }
    return Promise.resolve(memoryStorage.designers[index]);
  }
  
  static findOneAndDelete(filter) {
    const index = memoryStorage.designers.findIndex(d => {
      for (let key in filter) {
        if (d[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.designers.splice(index, 1);
    }
    return Promise.resolve({ success: true });
  }
  
  save() {
    memoryStorage.designers.push(this);
    return Promise.resolve(this);
  }
}

// 客户模型
class Client {
  constructor(data) {
    this.username = data.username;
    this.phone = data.phone;
    this.createdAt = data.createdAt || new Date();
  }
  
  static find() {
    return Promise.resolve(memoryStorage.clients);
  }
  
  static findOne(filter) {
    const client = memoryStorage.clients.find(c => {
      for (let key in filter) {
        if (c[key] !== filter[key]) return false;
      }
      return true;
    });
    return Promise.resolve(client);
  }
  
  static findOneAndDelete(filter) {
    const index = memoryStorage.clients.findIndex(c => {
      for (let key in filter) {
        if (c[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.clients.splice(index, 1);
    }
    return Promise.resolve({ success: true });
  }
  
  save() {
    memoryStorage.clients.push(this);
    return Promise.resolve(this);
  }
}

// 平台模型
class Platform {
  constructor(data) {
    this.id = data.id || Date.now();
    this.platformName = data.platformName;
    this.contactPerson = data.contactPerson;
    this.status = data.status || '待审核';
  }
  
  static find() {
    return Promise.resolve(memoryStorage.platforms);
  }
  
  static findOne(filter) {
    const platform = memoryStorage.platforms.find(p => {
      for (let key in filter) {
        if (p[key] !== filter[key]) return false;
      }
      return true;
    });
    return Promise.resolve(platform);
  }
  
  static findOneAndUpdate(filter, updates) {
    const index = memoryStorage.platforms.findIndex(p => {
      for (let key in filter) {
        if (p[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.platforms[index] = { ...memoryStorage.platforms[index], ...updates };
    }
    return Promise.resolve(memoryStorage.platforms[index]);
  }
  
  static findOneAndDelete(filter) {
    const index = memoryStorage.platforms.findIndex(p => {
      for (let key in filter) {
        if (p[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.platforms.splice(index, 1);
    }
    return Promise.resolve({ success: true });
  }
  
  save() {
    memoryStorage.platforms.push(this);
    return Promise.resolve(this);
  }
}

// 需求模型
class Request {
  constructor(data) {
    this.id = data.id || Date.now();
    this.type = data.type;
    this.budget = data.budget;
    this.pages = data.pages;
    this.style = data.style;
    this.status = data.status || '待派单';
    this.designerId = data.designerId;
    this.designerName = data.designerName;
    this.orderNumber = data.orderNumber;
    this.createdAt = data.createdAt || new Date();
    this.refunded = data.refunded || false;
    this.refundReason = data.refundReason;
    this.refundStatus = data.refundStatus;
    this.review = data.review;
  }
  
  static find() {
    return Promise.resolve(memoryStorage.requests);
  }
  
  static findOne(filter) {
    const request = memoryStorage.requests.find(r => {
      for (let key in filter) {
        if (r[key] !== filter[key]) return false;
      }
      return true;
    });
    return Promise.resolve(request);
  }
  
  static findOneAndUpdate(filter, updates) {
    const index = memoryStorage.requests.findIndex(r => {
      for (let key in filter) {
        if (r[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.requests[index] = { ...memoryStorage.requests[index], ...updates };
    }
    return Promise.resolve(memoryStorage.requests[index]);
  }
  
  save() {
    memoryStorage.requests.push(this);
    return Promise.resolve(this);
  }
}

// 合作店铺模型
class Shop {
  constructor(data) {
    this.id = data.id || Date.now();
    this.name = data.name;
  }
  
  static find() {
    return Promise.resolve(memoryStorage.shops);
  }
  
  static findOne(filter) {
    const shop = memoryStorage.shops.find(s => {
      for (let key in filter) {
        if (s[key] !== filter[key]) return false;
      }
      return true;
    });
    return Promise.resolve(shop);
  }
  
  static findOneAndDelete(filter) {
    const index = memoryStorage.shops.findIndex(s => {
      for (let key in filter) {
        if (s[key] !== filter[key]) return false;
      }
      return true;
    });
    
    if (index !== -1) {
      memoryStorage.shops.splice(index, 1);
    }
    return Promise.resolve({ success: true });
  }
  
  save() {
    memoryStorage.shops.push(this);
    return Promise.resolve(this);
  }
}

// 导出模型
module.exports = {
  Designer,
  Client,
  Platform,
  Request,
  Shop
};