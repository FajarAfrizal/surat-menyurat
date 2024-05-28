const httpRes = require("../helpers/httpRes");
const dispotitionModel = require("../models/dispotition");
const dispotitionDto = require("../dto/dispotition");

const create = async (req, res, next) => {
  try {
    const dataList = req.body;
    const dispotitionDataList = dataList.map((data) =>
      dispotitionDto.dispotitionCreateDto(data)
    );

    await dispotitionModel.create(dispotitionDataList);

    return httpRes(res, 201);
  } catch (error) {
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const dispotition = await dispotitionModel.findAll();
    if (dispotition == null) {
      return httpRes(res, 401, "Data Not Found!");
    }
    return httpRes(res, 201, dispotition);
  } catch (error) {
    return next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const dispotition = await dispotitionModel.findOne(id);
    if (dispotition.data == null) {
      return httpRes(res, 401, "Data Not Found!");
    }
    return httpRes(res, 201, dispotition);
  } catch (error) {
    return next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const dispotitionData = await dispotitionDto.dispotitionCreateDto(data);
    const dispotition = await dispotitionModel.update(id, dispotitionData, req);
    return httpRes(res, 201);
  } catch (error) {
    return next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const dispotition = await dispotitionModel.remove(id);
    return httpRes(res, 201);
  } catch (error) {
    return next(error);
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    console.log(userId);
    const dispotition = await dispotitionModel.findAllByUserId(userId);
    if (dispotition == null) {
      return httpRes(res, 401, "Data Not Found!");
    }
    return httpRes(res, 200, dispotition);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  getByUserId,
};
