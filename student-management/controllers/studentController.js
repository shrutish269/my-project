const Student = require('../models/studentModel');

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

exports.getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.status(200).json(student);
};

exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Student deleted', student });
};