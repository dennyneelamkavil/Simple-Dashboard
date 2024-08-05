const mongoose = require('mongoose');
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;


mongoose.connect(`${MONGO_DB_URL}/${DB_NAME}`)
.then(()=> {console.log('DB connected successfully with backend');})
.catch(err=>{console.log('Error connectig to DB: ' + err.message)});