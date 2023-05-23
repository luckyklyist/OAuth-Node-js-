const mongoose=require('mongoose');

const connectDb=()=>{
    mongoose.connect(`${process.env.LOCAL_DATABASE_URL}`)
        .then(console.log('connected to the database'))
        .catch(err=>console.log("Error connectiong to the database"));
}

module.exports=connectDb;