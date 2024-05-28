const httpRes = require("../helpers/httpRes");
const mailDto = require("../dto/mail.dto");
const mailModel = require("../models/mail");

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const mailData = mailDto.mailCreateDto(data);
    await mailModel.create(mailData, req);
    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};

const totalMail = async (req, res, next) => {
  try {
    const mail = await mailModel.totalMail();
    return httpRes(res, 201, mail);
  } catch (error) {
    return next(error);
  }
};

const getMailByType = async (req, res, next) => {
  try {
    const type = Number(req.params.type);
    const mail = await mailModel.getMailByType(type);
    return httpRes(res, 201, mail);
  } catch (error) {
    return next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const mail = await mailModel.findAll();
    return httpRes(res, 200, mail);
  } catch (err) {
    return next(err);
  }
};

const findAllUserId = async (req, res, next) => {
  try {
    const userId = Number(req.user.id);
    const mail = await mailModel.findAllByUserId(userId);
    return httpRes(res, 200, mail);
  } catch (err) {
    return next(err);
  }
};

const getDispotitionUser = async (req, res, next) => {
  try {
    const user_id = Number(req.user.id);
    const dispotition = await mailModel.getDispotitionUser(user_id);
    return httpRes(res, 200, dispotition);
  } catch (error) {
    return next(error);
  }
};
const findOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const mail = await mailModel.findOne(id);
    if (mail == null) {
      return res.json({
        status: 400,
        message: "Data Not Found",
      });
    } else {
      return httpRes(res, 201, mail);
    }
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updateDto = mailDto.mailCreateDto(data);
    const mail = await mailModel.update(updateDto, id, req);
    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};
const deleted = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const mail = await mailModel.deleted(id);
    return httpRes(res, 200);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleted,
  findAllUserId,
  getDispotitionUser,
  totalMail,
  getMailByType,
};
