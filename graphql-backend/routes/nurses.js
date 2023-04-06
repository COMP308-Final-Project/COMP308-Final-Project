const express = require('express');
const router = express.Router();
const Nurse = require('../models/nurse');

// Getting all nurses
router.get('/', async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.json(nurses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One nurse
router.get('/:id', getNurse, (req, res) => {
  res.json(res.nurse);
});

// Creating one nurse
router.post('/', async (req, res) => {
  const nurse = new Nurse({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
    try {
    const newNurse = await nurse.save();
    res.status(201).json(newNurse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One nurse
router.patch('/:id', getNurse, async (req, res) => {
  if (req.body.name != null) {
    res.nurse.name = req.body.name;
  }
  if (req.body.userName != null) {
    res.nurse.userName = req.body.userName;
  }
  if (req.body.email != null) {
    res.nurse.email = req.body.email;
  }
  if (req.body.password != null) {
    res.nurse.password = req.body.password;
  }
  try {
    const updatedNurse = await res.nurse.save();
    res.json(updatedNurse);
  } catch (err) {7
    res.status(400).json({ message: err.message });
  }
});

// Deleting One nurse
router.delete('/:id', getNurse, async (req, res) => {
  try {
    await res.nurse.remove();
    res.json({ message: 'Deleted Nurse' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getNurse(req, res, next) {
  let nurse;
  try {
    nurse = await Nurse.findById(req.params.id);
    if (nurse == null) {
      return res.status(404).json({ message: 'Cannot find nurse' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.nurse = nurse
  next()
}

module.exports = router
