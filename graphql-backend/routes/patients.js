const express = require('express')
const router = express.Router()
const Patient = require('../models/patient')

// Getting all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find()
    res.json(patients)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One patient
router.get('/:id', getPatient, (req, res) => {
  res.json(res.patient)
})

// Creating one patient
router.post('/', async (req, res) => {
  const patient = new Patient({
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
  try {
    const newPatient = await patient.save()
    res.status(201).json(newPatient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One patient
router.patch('/:id', getPatient, async (req, res) => {
  if (req.body.name != null) {
    res.patient.name = req.body.name
  }
  if (req.body.userName != null) {
    res.patient.userName = req.body.userName
  }
  if (req.body.email != null) {
    res.patient.email = req.body.email
  }
  if (req.body.password != null) {
    res.patient.password = req.body.password
  }
  try {
    const updatedPatient = await res.patient.save()
    res.json(updatedPatient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One patient
router.delete('/:id', getPatient, async (req, res) => {
  try {
    await res.patient.remove()
    res.json({ message: 'Deleted Patient' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getPatient(req, res, next) {
  let patient
  try {
    patient = await Patient.findById(req.params.id)
    if (patient == null) {
      return res.status(404).json({ message: 'Cannot find patient' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.patient = patient
  next()
}

module.exports = router
