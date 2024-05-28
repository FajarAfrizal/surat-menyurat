const { PrismaClient } = require("@prisma/client");
const dbService = new PrismaClient();

async function create(employeeData) {
  const employee = await dbService.employee.create({
    data: {
      fullname: employeeData.fullname,
      position: {
        connect: { id: employeeData.position_id },
      },
    },
  });
}
async function findAll() {
  const employee = await dbService.employee.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      position: true,
    },
  });
  return employee;
}

async function findOne(id) {
  const employee = await dbService.employee.findFirst({
    where: {
      id: id,
      deleted_at: null,
    },
    include: {
      position: true,
    },
  });
  return employee;
}
async function update(updateDto, id) {
  const employee = await dbService.employee.update({
    where: {
      id: id,
    },
    data: {
      fullname: updateDto.fullname,
      position: {
        connect: {
          id: updateDto.position_id,
        },
      },
      updated_at: new Date(),
    },
  });
  return employee;
}

async function deleted(id) {
  const employee = await dbService.employee.update({
    where: {
      id: id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
  return employee;
}
module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleted,
};
