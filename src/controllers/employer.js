const express = require("express");
const Employee = require("../model/employee");

//GET LIST OF ALL THE EMPLOYEES
exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  try {
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error);
  }
};

//GET DETAILS OF EMPLOYEE BY EMPLOYEE-ID
exports.getEmployeeById = async (req, res) => {
  const employeeId = req.body.id;
  //console.log(employeeId);
  const employee = await Employee.findById(employeeId);
  //console.log(employee);
  try {
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

/* CREATE EMPLOYEE -- Check whether the employee is already registered & if employee is already registered,
then return a message, else create a new employee in the database.   */
exports.createEmployee = async (req, res) => {
  const existingEmployee = await Employee.findOne({ email: req.body.email });
  if (existingEmployee) {
    return res.status(409).send({ message: "Employee already registered" });
  }
  const employee = await new Employee({
    employeeName: req.body.employeeName,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender,
    department: req.body.department,
    currentPosition: req.body.currentPosition,
    experience: req.body.experience,
    reportingHead: req.body.reportingHead,
    salary: req.body.salary,
  });
  try {
    const result = await employee.save();
    res.status(201).json({
      message: "Employee added to database successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// EDIT EMPLOYEE DETAILS
exports.updateEmployee = async (req, res) => {
  const employeeId = req.body.id;
  //console.log(employeeId);
  try {
    const employee = await Employee.findById(employeeId);
    //console.log(employee);
    if (!employee) {
      res.status(404).send({ message: "Employee not found" });
    }
    employee.employeeName = req.body.employeeName;
    employee.email = req.body.email;
    employee.age = req.body.age;
    employee.gender = req.body.gender;
    employee.department = req.body.department;
    employee.currentPosition = req.body.currentPosition;
    employee.experience = req.body.experience;
    employee.reportingHead = req.body.reportingHead;
    employee.salary = req.body.salary;

    const result = await employee.save();
    res.status(201).json({
      message: "Employee edited successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//DELETE AN EMPLOYEE FROM DATABASE
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.body.id;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      res.status(404).send({ message: "Employee Not Found" });
    }
    await Employee.findByIdAndRemove(employeeId);
    res.status(201).json({
      message: `Employee ${employee.employeeName} deleted successfully`,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
