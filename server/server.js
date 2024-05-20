const express = require('express');
const cors = require('cors');
const userRouters = require('./user/userRoutes'); // userRoutes.js 파일을 불러옴
const postRouters = require('./post/postRoutes'); // userRoutes.js 파일을 불러옴

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-type', 'Authorization'],
  }),
);

app.use('/api', userRouters, postRouters);

app.listen(port, () => {
  console.log(`서버 실행: 포트 ${port}`);
});

// const mongoose = require('mongoose');
// mongoose
//   .connect(
//     //이 부분은 본인에게 맞게 설정 하세요
//     'mongodb+srv://heejin094:park5610!@cluster0.dbo7t5n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
//   )
//   .then(() => console.log('MongoDB connected...'))
//   .catch((err) => console.log(err));
