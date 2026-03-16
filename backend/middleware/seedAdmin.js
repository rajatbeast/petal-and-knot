const User = require('../models/User');

module.exports = async function seedAdmin() {
  try {
    const exists = await User.findOne({ role: 'admin' });
    if (exists) return;
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@petalandknot.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });
    console.log('Admin user seeded');
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};
