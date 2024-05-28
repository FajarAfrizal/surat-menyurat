const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const httpRes = require("../helpers/httpRes");
const flaverr = require("flaverr");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        employee: {
          include: {
            position: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      position: user.employee.position.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const data = {
      user: payload,
      token,
    };

    return httpRes(res, 200, data);
  } catch (err) {
    return next(err);
  }
};

const Register = async (req, res, next) => {
  try {
    const { name, email, password, position_id } = req.body;

    const checkDuplicate = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (checkDuplicate) {
      throw flaverr("E_DUPLICATE", Error("email already in use"));
    }
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        name,
        employee: {
          connect: {
            id: employee_id,
          },
        },
        password: hashedPassword,
      },
    });
    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};
const Index = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        is_active: true,
      },

      include: {
        employee: {
          include: {
            position: true,
          }
        },
      },
    });

    if (!user.length) {
      throw flaverr("E_NOT_FOUND", Error("User not found")); // Melempar kesalahan jika pengguna tidak ditemukan. contoh E_NOT_FOUND nya ada di middleware
    }

    return httpRes(res, 200, user); // sudah di setting di httpRes
  } catch (err) {
    return next(err);
  }
};

const Create = async (req, res, next) => {
  try {
    const { name, email, password, employee_id } = req.body;
    const checkDuplicate = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (checkDuplicate) {
      throw flaverr("E_DUPLICATE", Error("email already in use"));
    }
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // console.log('=========================?', hashedPassword)
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        employee: {
          connect: {
            id: employee_id,
          },
        },
        is_active: true,
      },
    });

    return httpRes(res, 201);
  } catch (err) {
    return next(err);
  }
};

const FindById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const id_int = parseInt(id);
    //    console.log('===========================>',id);
    const user = await prisma.user.findUnique({
      where: {
        id: id_int,
        is_active: true,
      },
      include: {
        employee: true,
      },
    });

    if (!user) {
      throw flaverr("E_NOT_FOUND", Error(`User not found with id ${id}`));
    }
    return httpRes(res, 200, user);
  } catch (err) {
    return next(err);
  }
};

const Update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const id_int = parseInt(id);

    const { name, email, password, employee_id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: id_int,
      },
    });

    if (!user) {
      throw new Error(`User with id ${id_int} not found`);
    }

    const checkDuplicate = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkDuplicate) {
      throw flaverr("E_DUPLICATE", Error("Email already in use"));
    }

    if (password) {
      const salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await prisma.user.update({
        where: {
          id: id_int,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    await prisma.user.update({
      where: {
        id: id_int,
      },
      data: {
        email,
        name,
        updated_at: new Date(),
        employee: {
          connect: {
            id: employee_id,
          },
        },
      },
    });

    return httpRes(res, 200);
  } catch (err) {
    return next(err);
  }
};

const Delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const id_int = parseInt(id);

    const user = await prisma.user.update({
      where: {
        id: id_int,
      },
      data: {
        deleted_at: new Date(),
        is_active: false,
      },
    });

    if (!user) {
      throw flaverr("E_NOT_FOUND", Error(`User with id ${id} not found`));
    }

    return httpRes(res, 200);
  } catch (Err) {
    return next(Err);
  }
};

module.exports = {
  Index,
  Create,
  FindById,
  Login,
  Register,
  Update,
  Delete,
};
