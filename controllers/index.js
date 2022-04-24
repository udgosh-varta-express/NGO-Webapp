//Rendering Home Page 
exports.getIndex = (req, res) => {
    res.render('index', { title: 'Home' });
}

//Rendering Book page 
exports.getBook = (req, res) => {

    res.render('book', { title: "Donate Books" });
}

//Rendering Shelter page 
exports.getShelter = (req, res) => {

    res.render('shelter', { title: "Donate Shelters" });
}

//Rendering Food page 
exports.getFood = (req, res) => {

    res.render('food', { title: "Donate Foods" });
}

//Rendering Clothes page 
exports.getClothes = (req, res) => {

    res.render('clothes', {
        title: "Donate Clothes"
    });
}


//Rendering Join Us page 
exports.getJoinus = (req, res) => {

    res.render('joinus', { title: "Join Us" });
}






