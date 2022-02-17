const express = require("express");
const app = express();
const data = require("./movieData");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./model");

// GET params, query: 여러가지 데이터 가능
// POST body

// 바디는 JSON 형태로 받을 수 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userData = [
  {
    id: "elice",
    pw: "1234",
  },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// app.post("/register", (req, res) => {
//   const { id, pw } = req.body;
//   const newData = {
//     id,
//     pw,
//   };
//   userData.push(newData);
//   res.send({
//     status: "succ",
//   });
// });

// app.post("/login", (req, res) => {
//   console.log("클라이언트 값", req.body);
//   const { id, pw } = req.body;
//   // const id = req.body.id;
//   // const pw = req.body.pw;

//   const findElement = userData.find((v) => v.id === id);
//   if (findElement !== undefined && findElement.pw === pw) {
//     // 성공
//     res.send({
//       status: "succ",
//     });
//   }
//   res.send({
//     status: "fail",
//   });
// });
function middle1(req, res, next) {
    console.log("중간과정");
    next();
  }
  
  app.use(middle1);
  
  app.get("/middle", (req, res) => {
    console.log("마무리 >>>", req.params.temp);
    res.send("Hello");
  });
  
  app.get("/middle2", (req, res) => {
    res.send("middle2");
  });


app.post("/login", (req, res) => {
    const { id, pw } = req.body;
  
    // mongoDB find == 배열 메소드 filter와 같음 => 배열을 반환
    // mongoDB findOne == 배열 메소드 find와 같음 => 요소를 반환
  
    User.findOne({ id: id })
      .then((result) => {
        console.log(result);
        if (result.pw === pw) {
          res.send({
            status: "로그인 성공",
          });
        } else {
          res.send({
            status: "비밀번호 틀림",
          });
        }
      })
      .catch((err) => {
        res.send({
          status: "아이디가 없음.",
        });
      });
  });
  

app.post("/register", (req,res) => {
    const {id, pw} = req.body
    const newUser = new User({
        id: id,
        pw: pw,
      });
      newUser
        .save()
        .then((v) => {
            res.send({
                status:"회원가입 성공"
            })
        })
        .catch((e) => {
            res.send({
                status:"회원가입 실패"
            })
        })
})


app.listen(3000, () => {
  console.log("3000 port listen!");

  mongoose.connect(
    "mongodb://127.0.0.1:27017/elice",
    (err) => {
      console.log("MongoDB Connect");
    }
  );
});
// function movieSearch(name) {
//   return data.movieData.filter((v) => {
//     return v.name.includes(name);
//   });
// }


// // app.get("/search2/:name", (req, res) => {
// // // http://localhost:3000/search2/도라
// // // /로 인자로 구분하나 인자를 하나만 줄 수 있다.
// // // 여러개도 가능하지만 가독성이 좋지 않다.
// // // http://localhost:3000/search2/도라/모가디/탐정
// //   const name = req.params.name;
// //   const result = movieSearch(name);
// //   res.send({
// //     result,
// //   });
// // });

// // app.get("/", (req,res) => {
// //     res.sendFile(path.join(__dirname, "./index.html"))
// // })


// // app.get("/search", (req, res) => { 
// // // http://localhost:3000/search?name=도라
// // // ? 로 구분하여 인자를 여러개 줄 수 있다.
// //   const name = req.query.name;
// //   const result = movieSearch(name);
// //   res.send({
// //     result,   // result 와 변수이름 result가 같으면 생략 가능, 다르다면 result : result2 이렇게 선언해줘야함.
// //   });
// // });
// app.get("/search", (req, res) => {
//     const name = req.query.name;
//     res.send("Search");
//   });
// /**
//  * POST http://localhost:3000/search
//  * 필요 헤더 JSON
//  * 필요 바디 name:영화이름
//  */
//  app.post("/search", (req, res) => {
//     const name = req.body.name;
//     const result = movieSearch(name);
//     res.send({
//       result,
//     });
//   });
  
//   app.post("/sum", (req, res) => {
//     const arr = req.body.arr;
//     console.log(req.body);
//     res.send({
//       result: arr.reduce((a, b) => a + b),
//     });
//   });
  
//   app.listen(3000, () => {
//     console.log("3000 port listen!");
//   });
// ----------------------------------------------------
// const express = require("express");
// const app = express();
// const data = require("./movieData");
// const path = require("path");

// // GET params, query: 여러가지 데이터 가능
// // POST body

// // 바디는 JSON 형태로 받을 수 있다.
// app.use(express.json());

// function movieSearch(name) {
//   return data.movieData.filter((v) => {
//     return v.name.includes(name);
//   });
// }

// app.get("/search", (req, res) => {
//   const name = req.query.name;
//   res.send("Search");
// });

// /**
//  * POST http://localhost:3000/search
//  * 필요 헤더 JSON
//  * 필요 바디 name: 영화이름
//  */

// app.post("/search", (req, res) => {
//   const name = req.body.name;
//   const result = movieSearch(name);
//   res.send({
//     result,
//   });
// });

// app.post("/sum", (req, res) => {
//   const arr = req.body.arr;
//   console.log(req.body);
//   res.send({
//     result: arr.reduce((a, b) => a + b),
//   });
// });

// app.listen(3000, () => {
//   console.log("3000 port listen!");
// });