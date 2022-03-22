

exports.get_index=(req,res)=>{
    console.log(`user in getindex method ${req.user.firstname}`);
    res.render('index',{firstName:req.user.firstname});
}


