const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/quizz-app");

const userRoutes = require('./routes/user');
const examRoutes = require('./routes/exam');
const questionRoutes = require('./routes/question');
const resultRoutes = require('./routes/result');

app.use('/api/user', userRoutes);

// app.get('/', (req,res)=>{
//     res.send('hello world');
// })

// add exam

app.use('/api/exam', examRoutes);

// add questions

app.use('/api/questions', questionRoutes);

// resut routes

app.use('/api/result', resultRoutes);



app.listen(4000, function(){
    console.log('server is running at port 5000');
})