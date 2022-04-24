
//Viewing User on Profile Page
exports.getUserProfile = (req,res)=>{

  //Here we giving user object as person so we dont get ejs compilation error "person not found"
  const person = req.user;
  res.render('profile',{person,title:'Profile'});
}