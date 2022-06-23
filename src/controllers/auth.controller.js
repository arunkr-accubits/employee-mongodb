const User = require("../model/user");

const {
  hashPassword,
  comparePassword,
  generatePassword,
  generateToken,
} = require("../utils/utils");

//SIGNUP
exports.signup = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).send({ message: "User already registered" });
  }

  const user = await new User({
    fullName: req.body.fullName,
    email: req.body.email,
    role: req.body.role,
    password: hashPassword(generatePassword.toString()), //passes random generated and encrypted password
  });

  try {
    await user.save();
    res.status(200).send({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      message: "User Registered Successfully ",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//SIGNIN
exports.signin = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send({
      message: "User Not Found",
    });
  }

  //checking if password was valid and send response accordingly
  if (!comparePassword) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password",
    });
  }

  //responding to client requests with user profile success message and access token
  res.status(200).send({
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
    message: "Login successful",
    accessToken: generateToken(user),
  });
};
