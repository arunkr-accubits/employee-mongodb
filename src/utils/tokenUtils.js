const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (user) => {
    return jwt.sign({ id: user._id }, process.env.API_SECRET, {
      expiresIn: 86400,
    });
  },
};
