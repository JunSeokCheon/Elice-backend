const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local");

// <username>:<password>
// admin:1234


mongoose // 몽고db에 연결 -> 성공 시 -> 새로운 데이터 입력/저장 -> 성공 시 -> 저장 완료|| 실패 시 -> DB 연결 실패 | 데이터 입력/저장 실패 시 -> 데이터가 이미 존재함
  .connect("mongodb+srv://admin:1234@cluster0.yfbio.mongodb.net/elice")
  .then(async () => {
    try {
      const user = new User({ // User는 위에서 선언해줌 데이터 스키마
        username: "elice",
        password: "1234",
      });
      await user.save(); // 문서를 데이터베이스에 저장하는 데 사용.

      const user2 = new User({
        username: "elice2",
        password: "5678",
      });
      await user2.save();
    } catch (e) {
      console.log("데이터 이미 있음");
    }
  })
  .catch((e) => {
    console.log("DB 연결 실패", e);
  });

// body 값을 파싱하기 위한 bodyparser 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use( 
  session({ // 세션 적용 함수(secret:세션 암호, resave: 세션을 항상 저장할지 여부, saveUninitialized:초기화되지 않은채 스토어에 저장되는 세션, store:데이터를 저장되는 형식)
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize()); // 인증유저 초기화하는 미들웨어(passport 초기화)
app.use(passport.session()); // sesseion 연결


// body username,password
passport.use(
  new Strategy(async (username, password, done) => { // passport 미들웨어에서 사용하는 인증 전략
    console.log("전달 받은 값", username, password);
    const userData = await User.findOne({ username });
    // username: elice, password: 1234,ObjectId:123213213

    if (userData === null) {
      // 아이디가 없는 경우
      done(null, false);
    } else if (userData.password === password) {
      // 로그인 성공
      done(null, userData);
    } else {
      done(null, false);
      // 비밀번호 틀림.
    }
  })
);

passport.serializeUser((user, done) => { // 특정 사용자가 최초 접근하는 함수 : user 정보 전체를 session에 저장
  console.log("최초 인증된 유저", user);
  done(null, user); // 여기서 브라우저한테 쿠키(입장권) 세션 내부적으로 저장.
});

passport.deserializeUser((user, done) => { // 인증된 사용자가 모든 사용자 페이지에 접근하는 함수 : session에 저장된 값을 이용해, 사용자 프로필을 찾은 후 HTTP request를 리턴한다.
  console.log("이미 인증된 유저", user);
  done(null, user); // req.user 갱신
});

app.use((req, res, next) => {
  console.log("세션", req.session);
  next();
});

app.post(
  "/login",
  passport.authenticate("local", { // local 전략 
    successRedirect: "/", // 성공했을 때 res.redirect("/") 같은말
    failureRedirect: "/login", // 실패했을 때 res.redirect("/login") 같은말
  })
);

app.get("/login", (req, res) => {
  res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" value="로그인" />
        </form>
    `);
});

app.get("/logout", (req, res) => {
  req.logout(); // 클라이언트가 서버와 연결된 상태라면 세션 지움!!
  res.redirect("/"); // logout 페이지를 만들지 않아서 바로 "/"로 redirect! -> 하지만 /로 가지않고 /login으로 간다.(why? 로그아웃이후 바로 로그인 동작을 위해서)
});

const post = [];

app.post("/post", (req, res) => {
  if (req.user === undefined) { // 요청된 사용자가 저장된 사용자가 아니라면 글 쓰기 금지
    res.send({
      status: "로그인 하고 다시 오삼 ㅡㅡ",
    });
    return;
  }
  const { body, title } = req.body;
  const { username } = req.user;
  post.push({
    body: body,
    title: title,
    author: username,
  });
  res.redirect("/");
});

app.get("/", (req, res) => {
  console.log(req.user);
  if (req.user === undefined) {
    res.redirect("/login");
  } else {
    res.send(`
        <h1>${req.user.username}님 환영합니다.</h1>
        <a href="/logout">로그아웃</a>

        <form action="/post" method="POST">
            <input type="text" name="title" placeholder="title.."/>
            <textarea name="body" placeholder="body.."></textarea>
            <input type="submit" />
        </form>

        ${post
          .map(
            (p) => `
            <div>
                <p>제목: ${p.title}</p>
                <p>작성자: ${p.author}</p>
                <p>${p.body}</p>
            </div>
            <hr />
        `
          )
          .join("")}
        `);
  }
});

app.listen(3000, () => console.log("3000 port listen"));