const mongoose=require('mongoose');


async function connectDB(){
    console.log('Connecting to MongoDB...');
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        console.log('MongoDB connected');
    }catch(error){
        console.log(error);
    }
}

module.exports=connectDB;