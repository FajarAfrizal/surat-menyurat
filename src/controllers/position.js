
const httpRes = require("../helpers/httpRes");
const flaverr = require("flaverr");
const positionModel = require("../models/position");
const positionDto = require("../dto/position.dto");
const Create = async (req, res, next) => {
  try {
    const data = req.body;
    const position = positionDto.positionCreateDto(data);
    await positionModel.create(position);
    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};

const FindAll = async (req, res, next) => {
  try {
    const position = await positionModel.Index();
    return httpRes(res, 200, position);
  } catch (err) {
    return next(err); //kalo ada eror jadi ga load
  }
};

const FindOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    console.log('=================>', id)
    const position = await positionModel.FindOne(id);
    return httpRes(res, 200, position);
  } catch (err) {
    return next(err)
  }
}

const Update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updateDto =  positionDto.positionCreateDto(data);
    await positionModel.Update(id, updateDto);
    return httpRes(res, 201);
  } catch (err) {
    return next(err)
  }
}


const Delete = async (req, res, next) => {
  try {
    const  id  = Number(req.params.id);
    await positionModel.Delete(id);
    return httpRes(res, 201)
  } catch (err){
    return next(err)
  }
}

module.exports = {
  Create,
  FindAll,
  FindOne,
  Update,
  Delete
};
