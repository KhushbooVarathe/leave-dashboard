const bcrypt = require('bcryptjs')


const calculateDaysBetweenDates = (startDate, endDate) => {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  if ((end - start) / (1000 * 3600 * 24) === 0) {
    return 1;
  } else {
    return (end - start) / (1000 * 3600 * 24) + 1;
  }
};


const getEncodedPassword = async (password) => {
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
}


const DecodedToken = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (isPasswordValid) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  calculateDaysBetweenDates, getEncodedPassword, DecodedToken
};