const UserModel = require("./usermodel");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

// User controller
// single controller with all the required functions inside it
const User = {
  // Register Function
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await UserModel.findOne({ username });
      const emailCheck = await UserModel.findOne({ email });

      // Username Check
      if (usernameCheck) {
        return res.json({
          status: "fail",
          message: "Username already exists.",
        });
      }

      // Email Check
      if (emailCheck) {
        return res.json({
          status: "fail",
          message: "Email is already in use.",
        });
      }

      // hashing the user password
      // second param is the number of salt rounds for hashing the given password
      const hashedpassword = await bcrypt.hash(password, 5);

      // Creating a new user document
      const user = await UserModel.create({
        username,
        email,
        password: hashedpassword,
      });

      if (user) {
        console.log(`User ${username} was added to the Database`);
      }

      // returning response to the client
      return res.json({ status: "pass", user });
    } catch (ex) {
      // passing any kind of exception to the next middlware functions
      // this will help Express to be aware of any kind of exception
      // we only have to do this incase we are using asynchronous functions that are
      // called by different route handlers and middleware
      next(ex);
    }
  },

  // Login
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // Email checking
      const user = await UserModel.findOne({ username });
      if (!user) {
        return res.json({
          status: "fail",
          message: "User does not exists.",
        });
      }
      // Password checking
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.json({
          status: "fail",
          message: "Password is incorrect.",
        });
      }

      return res.json({ status: "pass", user });
    } catch (ex) {
      next(ex);
    }
  },

  // setting the user avatar
  async setAvatar(req, res, next) {
    try {
      const avatarImage = req.body.image;
      const userid = req.params.id;
      const user = await UserModel.findByIdAndUpdate(userid, {
        isAvatarImageSet: true,
        avatarImage,
      });
      if (user) {
        const updateduser = await UserModel.findById(userid);
        return res.json({ status: "pass", updateduser });
      } else {
        return res.json({
          status: "fail",
          message: "Setting Avatar Image failed",
        });
      }
    } catch (ex) {
      next(ex);
    }
  },

  // for getting random avatars
  async getRandomAvatars(req, res, next) {
    // return res.send( "Hello World" )
    try {
      const dir = "static/profileimages";
      const files = await fs.readdir(dir);

      const avatarNames = new Set();
      while (avatarNames.size < 4) {
        const file = files[Math.floor(Math.random() * files.length)];
        avatarNames.add(file);
      }

      return res.json({ avatarNames: [...avatarNames] });
    } catch (ex) {
      next(ex);
    }
  },

  /// for getting all the users
  async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.find({ _id: { $ne: req.params.id } });
      return res.json({ users });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = User;
