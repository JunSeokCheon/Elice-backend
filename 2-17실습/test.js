const mongoose = require("mongoose");
const User = require("./model");
// mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice
// mongodb://localhost:27017/elice

mongoose.connect(
    "mongodb://127.0.0.1:27017/elice",
  (err) => {
    console.log("MongoDB Connect");
    const newUser = new User({
      id: "elice1111",
      pw: "1234",
    });
    newUser
      .save()
      .then((v) => {
        console.log("성공");
      })
      .catch((e) => {
        console.log("실패");
      });

    User.find({ id: "apple" })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("찾기 실패");
      });
  }
);

// // 유저가 모이는 유저 데이터(스키마 설계)
// {
//     id: String, 이거 항상 유일해야해,
//     pw: String, 이거는 유일할 필요는 없음
// }
