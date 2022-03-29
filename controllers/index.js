let username;

//Render index page after login/Register
exports.get_index=(req,res)=>{
    if(username == undefined)
        userNameConvert(req.user.firstname) 

    res.render('index',{firstName:username});
}

//Render Book page 
exports.get_book=(req,res)=>{
    if(username == undefined)
        userNameConvert(req.user.firstname) 
    
        res.render('book',{firstName:username});
}

//Render Shelter page 
exports.get_shelter=(req,res)=>{
    if(username == undefined)
    userNameConvert(req.user.firstname) 
    
    res.render('shelter',{firstName:username});
}

//Render Food page 
exports.get_food=(req,res)=>{
    if(username == undefined)
    userNameConvert(req.user.firstname) 
    
    res.render('food',{firstName:username});
}

//Render Clothes page 
exports.get_clothes=(req,res)=>{
    if(username == undefined)
        userNameConvert(req.user.firstname) 

    res.render('clothes',{firstName:username});
}
















//Function for changing usename string into 'Username' format
function userNameConvert(reqName){
        let name = reqName.toLowerCase()
        username = name.charAt(0).toUpperCase()+name.slice(1)
}


