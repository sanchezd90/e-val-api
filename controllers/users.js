const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { v4: uuid } = require("uuid");
const { send } = require("../services/mail");

const createUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errores: error.array() });
  }

  try {
    const { email, pass } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User is already registered" });
    }
    user = new User(req.body);
    const salt = await bcryptjs.genSalt(10);
    user.pass = await bcryptjs.hash(pass, salt);
    const uid = uuid();
    user.uid = uid;
    await user.save();
    const payload = {
      user: {
        email: user.email,
        role: user.role,
        valid_email: user.valid_email,
      },
    };
    send({
      mail: email,
      body: `<h1> Bienvenido a Report!</h1>
            Hacé click <a href="http://${process.env.NEXT_PUBLIC_API_SERVER_NAME}:${process.env.NEXT_PUBLIC_API_SERVER_PORT}/verify/${uid}">acá</a> para validar tu cuenta de correo y finalizar el registro de usuario.`,
    });
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("register error");
  }
};

const verifyEmail = async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  try {
    const response = await User.updateOne({ uid: uid }, { valid_email: true });
    if (response) {
      let [user] = await User.find({ uid: uid });
      const payload = {
        user: {
          email: user.email,
          role: user.role,
          valid_email: user.valid_email,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token: token });
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("register error");
  }
};

const authUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errores: error.array() });
  }

  try {
    let { email, pass } = req.body;
    let user = await User.findOne({ email: email });
    if (bcryptjs.compareSync(pass, user.pass)) {
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };
      jwt.sign(
        payload,
        process.env.SECRETA,
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token: token });
        }
      );
    } else {
      res.json({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("register error");
  }
};

const login = async (req, res) => {
  const { email, pass } = req.body;  
  try {
    const [user] = await User.find({ email: email });    
    if (user) {    
    bcryptjs.compare(pass, user.pass, function (err, response) {
        if (response) {
          if (user.deleted === "0") {
            const payload = {
                user: {
                  email: user.email,
                  role: user.role,
                  valid_email: user.valid_email,
                },
              };
              jwt.sign(
                payload,
                process.env.SECRETA,
                {
                  expiresIn: 3600,
                },
                (error, token) => {
                  if (error) throw error;
                  res.json({ msg: "success", token: token });
                }
              );
          } else {
            res.status(200).json({ msg: "deleted", token: null });
          }
        } else {
          res.status(200).json({ msg: "wrong pass", token: null });
        }
      });
    } else {
      res.status(200).json({ msg: "user not found", token: null });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getUser = async (req, res) => {
  const { email } = req.body;  
  try {
    const [user] = await User.find({ email: email });    
    if (user) {    
      res.json({ user: user });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { createUser, verifyEmail, authUser, login, getUser };
