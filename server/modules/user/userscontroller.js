const UserModel = require("./usermodel");
const bcrypt = require("bcrypt");

// User controller
// single controller with all the required functions inside it
const User = {
  // Register Function
  async Register(req, res, next) {
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
      const hashedpassword = await bcrypt.hash(password, 20);

      // Creating a new user document
      const user = await UserModel.create({
        username,
        email,
        password: hashedpassword,
      });

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
};

module.exports = User;
