const bcrypt = require("bcrypt");

module.exports = {
  /**
   *
   * @param {String} password
   * @returns Password hash
   */
  hashPassword: (password) => {
    if (!password) {
      return false;
    }
    //const salt = bcrypt.genSaltSync(config.BYCRYPT_SALT);
    const hashedPassword = bcrypt.hashSync(password, 8);
    return hashedPassword;
  },
  /**
   *
   * @param {String} password
   * @param {String} hashedPassword
   * @returns True or False
   */
  comparePassword: (password, hashedPassword) => {
    if (!password) {
      return false;
    }
    const result = bcrypt.compareSync(password, hashedPassword);
    return result;
  },
  /**
   *
   * @param {Number} passwordLength
   * @returns 8 digit password string
   */
  generatePassword: (passwordLength) => {
    const numberChars = "0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const symbols = "$%^&)><?'\"@";
    const allChars = numberChars + upperChars + lowerChars + symbols;
    let randPasswordArray = Array(passwordLength);

    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray[3] = symbols;
    randPasswordArray = randPasswordArray.fill(allChars, 4);

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    return shuffleArray(
      randPasswordArray.map((x) => x[Math.floor(Math.random() * x.length)])
    ).join("");
  },
};
