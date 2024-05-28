const { PrismaClient } = require("@prisma/client");

const dbService = new PrismaClient();

async function create(dispotitionDataList) {
  const createdDispotitions = await dbService.dispotition.createMany({
    data: dispotitionDataList.map((data) => ({
      user_id: parseInt(data.user_id),
      mail_id: parseInt(data.mail_id),
    })),
  });
  return createdDispotitions;
}

async function findAll() {
  const dispotition = await dbService.dispotition.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      mail: true,
      user: true,
    },
  });

  return dispotition;
}

async function findOne(id) {
  const dispotition = await dbService.dispotition.findFirst({
    where: {
      id: id,
      deleted_at: !null,
    },
    include: {
      mail: true,
      user: true,
    },
  });

  return dispotition;
}

async function update(id, dispotitionData, req) {
  const dispotition = await dbService.dispotition.update({
    where: {
      id: id,
    },
    data: {
      mail: {
        connect: {
          id: req.user.id,
        },
      },
      user: {
        connect: {
          id: dispotitionData.user_id,
        },
      },
    },
  });
  return dispotition;
}

async function remove(id) {
  const dispotition = await dbService.dispotition.update({
    where: {
      id: id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
  return dispotition;
}

async function findAllByUserId(userId) {
  const dispotition = await dbService.dispotition.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
    },
    include: {
      mail: true,
      user: true,
    },
  });
  return dispotition;
}
module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  findAllByUserId,
};
