const bcryptjs = require("bcryptjs");
const securePassword = async (password) => {
    try {
      const passwordHash = await bcryptjs.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };

  module.exports = securePassword;