const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")) // compare the token with private key 

    req.user = decoded;

    next();
  } catch (err) {
    res.send('Invalid token').status(400)
  }
}



module.exports = auth