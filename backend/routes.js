const express = require('express');
const router = express.Router();
const { Designer, Client, Platform, Request, Shop } = require('./models');

// 设计师相关路由
router.get('/designers', async (req, res) => {
  try {
    const designers = await Designer.find();
    res.json(designers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/designers', async (req, res) => {
  try {
    const designer = new Designer(req.body);
    await designer.save();
    res.json(designer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/designers/:id', async (req, res) => {
  try {
    const designer = await Designer.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(designer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/designers/:id', async (req, res) => {
  try {
    await Designer.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 客户相关路由
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/clients', async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/clients/:username', async (req, res) => {
  try {
    await Client.findOneAndDelete({ username: req.params.username });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 平台相关路由
router.get('/platforms', async (req, res) => {
  try {
    const platforms = await Platform.find();
    res.json(platforms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/platforms', async (req, res) => {
  try {
    const platform = new Platform(req.body);
    await platform.save();
    res.json(platform);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/platforms/:id', async (req, res) => {
  try {
    const platform = await Platform.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(platform);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/platforms/:id', async (req, res) => {
  try {
    await Platform.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 需求相关路由
router.get('/requests', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/requests', async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/requests/:id', async (req, res) => {
  try {
    const request = await Request.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 合作店铺相关路由
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/shops', async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/shops/:id', async (req, res) => {
  try {
    await Shop.findOneAndDelete({ id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;