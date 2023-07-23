const router = require('express').Router();

router.get("/aman", (req,res)=>{
  console.log("nitinnnnn");
  res.send("new aman")
})

module.exports = router;