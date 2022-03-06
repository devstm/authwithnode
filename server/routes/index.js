const express = require("express");
const { storeUser, selectUser,selectUserById } = require("../conrollers");
const router = express.Router();
const crypt = require("bcrypt");

const hashepassword=(req, res, next) => {
    let pw = req.body.password;
    let pwwithstring = pw + 'saleh';
  crypt.genSalt(10, (err, salt) => {
    if (err) {
      res.send("error in hash");
      next();
    } else {
      crypt.hash(pwwithstring, salt, (error, result) => {
        if (error) {
          res.send("error in hash");
          next();
        } else {
          req.body.password = result;
          next();
        }
      });
    }
  });
};
router.use(hashepassword)
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  storeUser(username, password).then((resp) => res.send("created"));
});
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  selectUser(username).then((response) => {
      console.log(response);
    crypt.compare(response.rows[0].password, password, (err, resss) => {
      if (err) {
        res.send(err);
      }else{
        res.status(200).cookie('id' , response.rows[0].id).redirect('/home');
      }
    });
  });
});
router.use((req,res ,next)=>{
   if(req.cookies.id){
    selectUserById(req.cookies.id).then(r=>{
        req.you = r.rows[0];
        next();
    })
   }else{
       res.redirect('/')
   }
})
router.get('/home' ,(req , res)=>{
    res.json(req.you);
})
router.get('/saleh' ,(req , res)=>{
    res.json({saleh : "saleh"});
})

module.exports = router;
