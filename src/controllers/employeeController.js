const httpRes = require("../helpers/httpRes");
const employeeDto = require("../dto/employee.dto");
const employeeModel = require("../models/employee");

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const employeeData = employeeDto.employeeCreateDto(data);
    await employeeModel.create(employeeData);
    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};

const findAll = async (req, res, next) => {
  try {
    const employee = await employeeModel.findAll();
    return httpRes(res, 201, employee);
  } catch (error) {
    return next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const employee = await employeeModel.findOne(id);
    if (employee == null) {
      return res.json({
        status: 400,
        message: "Data Not Found",
      });
    } else {
      return httpRes(res, 201, employee);
    }
  } catch (error) {
    return next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updateDto = employeeDto.employeeCreateDto(data);
    const employee = await employeeModel.update(updateDto, id);
    return httpRes(res, 201);
  } catch (error) {
    return next(error);
  }
};
const deleted = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const employee = await employeeModel.deleted(id);
    return httpRes(res, 201);
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  create,
  findAll,
  update,
  findOne,
  deleted,
};
