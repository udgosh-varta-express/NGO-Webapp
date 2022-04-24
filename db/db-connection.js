const mongoose = require('mongoose')

// Making a connection to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
    })
    .then(() => {
        console.log('💾 Mongodb connected...');
        
    })
    .catch((err) => console.log(err.message));

    //This function is used to view message db is connected
    mongoose.connection.on('connected',()=>{
        console.log('Mongoose connected to db');
    })
    
    //This function is used to view error message of db
    mongoose.connection.on('error',(err)=>{
        console.log(err.message);
    })
    
    //This function is used to view message db is disconnected
    mongoose.connection.on('disconnected',()=>{
        console.log('Mongoose connection is disconnected.');
    })
    
    //If Program Stopped By Pressing ctrl+C then this function will trigger
    process.on('SIGINT',async()=>{
        await mongoose.connection.close()
        process.exit(0)
    })