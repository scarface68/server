const express = require('express');
const router = express.Router();
const User = require('./user.model');

// Route 1: Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
router.get('/users1', async (req, res) => {
  try {
    const users = await User.find({
      income: { $lt: '$5' },
      car: { $in: ['BMW', 'Mercedes'] },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route 2: Male Users which have phone price greater than 10,000.
router.get('/users2', async (req, res) => {
  try {
    const users = await User.find({
      gender: 'Male',
      phone_price: { $gt: 10000 },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route 3: Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
router.get('/users3', async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/i },
      quote: { $gt: 15 },
      email: { $regex: /M$/i },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route 4: Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
router.get('/users4', async (req, res) => {
  try {
    const users = await User.find({
      car: { $in: ['BMW', 'Mercedes', 'Audi'] },
      email: { $not: /\d/ },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route 5: Show the data of top 10 cities which have the highest number of users and their average income.
router.get('/users5', async (req, res) => {
  try {
    const result = await User.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 }, totalIncome: { $sum: { $toDouble: { $substrCP: ['$income', 1, { $subtract: [{ $strLenCP: '$income' }, 1] }] } } } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { _id: 1, count: 1, averageIncome: { $round: [{ $divide: ['$totalIncome', '$count'] }, 2] } } },
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;