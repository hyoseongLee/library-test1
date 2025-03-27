const jwt = require ("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const ensuerAuthorization = (req,res) => {
  try {
  let receivedJwt = req.headers["authorization"]
console.log("received jwt :",receivedJwt)
if(receivedJwt){
    let decodedjwt = jwt.verify(receivedJwt,process.env.PRIVATE_KEY)
return decodedjwt;
}else {
throw new ReferenceError("jwt must be provided");
}
  }catch (err) {
    console.log(err.name)
    console.log(err.message)
    return err;
}
}
module.exports = ensuerAuthorization