const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

//Connection for Mongo Store to persist Session
const store = new MongoDBStore({
    uri: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    collection: process.env.DB_SESSION_COLLECTION
});


// Init Session
module.exports = 
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 *2,
            secure: process.env.NODE_ENV === "production" ? true : false,
            httpOnly: true,
        },
        store: store,
        name: 'cookie'
    }, (error) => {
        if (error) console.log(error);
    });
