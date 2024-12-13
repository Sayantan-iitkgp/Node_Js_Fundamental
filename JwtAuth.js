const jwt = require("jsonwebtoken");
const Person = require("./models/person");
//JWT token generation
const generate_token = function (payload) {
  const token = jwt.sign(payload, process.env.secret_key, {
    expiresIn: 3000000,
  });
  return token;
};
//Owner candidate JWT token verification
const verify_owner_token = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "JWT token tampered" });
    }
    const decoded_payload = jwt.verify(token, process.env.secret_key);
    if (!decoded_payload) {
      return res.status(401).json({ message: "No payload exists" });
    } else {
      const Id = decoded_payload.Id;
      const User = await Person.findById(Id);
      const Job = User.work;
      if (Job != "Owner") {
        console.log(
          "Non-Owner person is trying to investigate others credentials"
        );
        res
          .status(400)
          .json({ message: "you are not allowed to investigate this route" });
      } else {
        req.user = User;
        next();
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Normal candidate JWT token verification
const verify_normal_token = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("token is tampered");
      res.status(400).json({ message: "token is tampered" });
    } else {
      const decoded_payload = jwt.verify(token, process.env.secret_key);
      if (!decoded_payload) {
        console.log("Invalid user is trying to generate illegal token");
        res.status(400).json({ message: "you are not allowed to enter" });
      } else {
        // console.log("User profile fetched successfully");
        const Id = decoded_payload.Id;
        const User = await Person.findById(Id);
        req.user = User;
        next();
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Exporting necessary modules
module.exports = { generate_token, verify_normal_token, verify_owner_token };
