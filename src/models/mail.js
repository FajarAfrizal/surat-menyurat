  const { PrismaClient } = require("@prisma/client");
  const dbService = new PrismaClient();

async function create(mailData, req) {
  return await dbService.mail.create({
    data: {
      user: {
        connect: { id: req.user.id },
      },
      about: mailData.about,
      from: mailData.from,
      mail_code: Number(mailData.mail_code),
      date_of_letter: new Date(mailData.date_of_letter).toISOString(),
      date_of_receipt: new Date(mailData.date_of_receipt).toISOString(),
      notes: mailData.notes,
      status: Number(mailData.status),
      tendency: Number(mailData.tendency),
      mail_type: Number(mailData.mail_type),
      file: `uploads/mail/${req.file.filename}`,
    },
  });
}

async function findAll() {
  return await dbService.mail.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      user: true,
    },
  });
}

async function findAllByUserId(userId) {
  return await dbService.mail.findMany({
    where: {
      user_id: userId,
      deleted_at: null,
    },
    include: {
      user: true,
    },
  });
}

async function findOne(id) {
  return await dbService.mail.findFirst({
    where: {
      id,
      deleted_at: null,
    },
    include: {
      user: true,
    },
  });
}

async function update(updateDto, id, req) {
  let dataToUpdate = {
    user: {
      connect: { id: req.user.id },
    },
    about: updateDto.about,
    from: updateDto.from,
    mail_code: Number(updateDto.mail_code),
    date_of_letter: new Date(updateDto.date_of_letter),
    date_of_receipt: new Date(updateDto.date_of_receipt),
    notes: updateDto.notes,
    status: Number(updateDto.status),
    tendency: Number(updateDto.tendency),
    mail_type: Number(updateDto.mail_type),
    updated_at: new Date(),
  };

  // Check if req.file exists before adding the file field
  if (req.file) {
    dataToUpdate.file = `uploads/mail/${req.file.filename}`;
  }

  return await dbService.mail.update({
    where: {
      id,
    },
    data: dataToUpdate,
  });
}


async function deleted(id) {
  return await dbService.mail.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}

async function getMailByType(type) {
  try {
    const mail = await dbService.mail.findMany({
      where: {
        mail_type: type,
      },
    });
    console.log(mail);
    return mail;
  } catch (error) {
    return error;
  }
}

async function totalMail() {
  try {
    const mail = await dbService.mail.findMany();
    const total_trash = mail.filter((m) => m.deleted_at != null).length;
    const total_incoming = mail.filter((m) => m.mail_type == 1).length;
    const total_outgoing = mail.filter((m) => m.mail_type == 2).length;
    // Mendapatkan tahun saat ini
    const year = new Date().getFullYear();

    // Mengelompokkan data per bulan
    const incoming = {};
    const outgoing = {};

    mail.forEach((item) => {
      const yearMail = new Date(item.created_at).getFullYear();
      const monthMail = new Date(item.created_at).getMonth();
      if (yearMail === year) {
        if (item.mail_type == 1) {
          const key = `${yearMail}-${(monthMail + 1)
            .toString()
            .padStart(2, "0")}`;

          if (!incoming[key]) {
            incoming[key] = 0;
          }
          incoming[key]++;
        } else if (item.mail_type == 2) {
          const key = `${yearMail}-${(monthMail + 1)
            .toString()
            .padStart(2, "0")}`;

          if (!outgoing[key]) {
            outgoing[key] = 0;
          }
          outgoing[key]++;
        }
      }
    });
    // console.log(incoming_mail);

    return {
      total_trash,
      total_incoming,
      total_outgoing,
      incoming,
      outgoing,
    };
  } catch (error) {
    console.error("Error:", error.message);
    // Handle error jika diperlukan
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleted,
  findAllByUserId,
  totalMail,
  getMailByType,
};