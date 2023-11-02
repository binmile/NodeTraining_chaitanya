require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);

  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: 'Token is not valid' });
  }
}

module.exports = { authenticateToken };
 