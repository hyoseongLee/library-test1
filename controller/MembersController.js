const mariadb = require("../database/mariadb");
const { StatusCodes } = require("http-status-codes");
const crypto = require('crypto'); // 암호화
const jwt = require('jsonwebtoken'); //토큰 인증서
const dotenv = require('dotenv') // env 모듈
dotenv.config()


const join = (req, res) => {
  const { email, password } = req.body;
    //비밀번호 암호화 (hash함수는 따로 공부할것.)
    const salt = crypto.randomBytes(10).toString('base64');
    const hashPassword = crypto.pbkdf2Sync(password,salt,10000,10,'sha512').toString('base64')

    //암호화 된 비밀번호 DB에 저장
  let sql = "INSERT INTO Members(email, password,salt)VALUES(?,?,?)";
  let values = [email, hashPassword,salt];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req, res) => {
    const {email,password} = req.body;
    let sql = 'SELECT * FROM Members where email = ?'
    mariadb.query(sql, email,
         (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        const loginMembers = results[0];

        //비밀번호 암호화하기 
        const salt = crypto.randomBytes(10).toString('base64');
        const hashPassword = crypto.pbkdf2Sync(password,loginMembers.salt,10000,10,'sha512').toString('base64')


        if(loginMembers && loginMembers.password == hashPassword){
            //토큰 발행
            const token = jwt.sign({
                email : loginMembers.email
            },process.env.PRIVATE_KEY,{
                expiresIn : '5m',
                issuer : "hyoseong"
            })
            //토큰 쿠키에 담기
            res.cookie("token",token,{
                httpOnly : true
            })
            console.log(token);
            res.status(StatusCodes.OK).json(results);
        }else {
            return res.status(StatusCodes.UNAUTHORIZED).end() // 401. Unauthorized (비인증) 403. Forbidden (접근권리없음) 
        }
      });
};

const PassWordResetrequest = (req, res) => {
    const {email} = req.body
    let sql = 'SELECT * FROM Members WHERE email = ?'
    mariadb.query(sql,email, (err,result) => {
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        //이메일로 유저찾기
        const user = result[0]
        if(user) {
            return res.status(StatusCodes.OK).json({
                email : email
            })
        }else {
            return res.status(StatusCodes.UNAUTHORIZED).end()
        }
    })
};

const passwordReset = (req, res) => {
    const {password,email} = req.body;

    let sql = `UPDATE Members SET password = ?, salt=? where email=?` 
    const salt = crypto.randomBytes(10).toString('base64');

    const hashPassword = crypto.pbkdf2Sync(password,salt,10000,10,'sha512').toString('base64')
    let values = [hashPassword,salt,email]

    mariadb.query(sql,values,(err,results) => {
        if(err){
            console.log(err)
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        if(results.affectedRows == 0)
            return res.status(StatusCodes.BAD_REQUEST).end()
        else 
            return res.status(StatusCodes.OK).json(results)
    })
}


module.exports = {
  join,
  login,
  PassWordResetrequest,
  passwordReset,
};
