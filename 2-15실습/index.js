// const http = require("http");
// const fs = require("fs")
const fs = require("fs");
const express = require("express");
const app = express();

console.log(express)
const arr = [];

// app.get("/", (req, res) => {
//     fs.readFile("./index.html", "utf-8", (err, data) => {
//         res.send(data)
//     })
// });

// app.get("/arr", (req, res) => {
//   res.send({
//     arr: arr,
//   });
// });

// app.post("/arr", (req, res) => {
//   arr.push("new Data");
//   res.send({
//     status: "succ",
//   });
// });

// app.put("/arr", (req, res) => {
//   arr[0] = "Update";
//   res.send({
//     status: "succ",
//   });
// });

// app.delete("/arr", (req, res) => {
//   arr.pop();
//   res.send({
//     status: "succ",
//   });
// });

// app.listen(3000, () => console.log("서버 켜짐 3000 포트"));


// function onRequest(req, res) {
//   console.log(req.method, req.url);
//   if (req.method === "GET") {
//     if (req.url === "/test") {
//       res.writeHead(200, { "Content-Type": "text/plain" });
//       res.write("Test Page");
//       res.end();
//     } else if (req.url === "/") {
//         fs.readFile("./index.html", "utf-8", (err, data) => {
//             res.writeHead(200, { "Content-Type": "text/html" });
//             res.write(data);
//             res.end();
//         })
//     } else {
//       res.writeHead(404, { "Content-Type": "text/html" });
//       res.write("404 Error");
//       res.end();
//     }
//   } else if (req.method === "POST") {
//     if (req.url === "/test") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(JSON.stringify(arr));
//       res.end();
//     }
//   } else if (req.method === "PUT") {
//     arr.push("new Data");

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(
//       JSON.stringify({
//         status: "succ",
//       })
//     );
//     res.end();
//   } else if (req.method === "DELETE") {
//     arr.pop();

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(
//       JSON.stringify({
//         status: "succ",
//       })
//     );
//     res.end();
//   }
// }

// http.createServer(onRequest).listen(3000);
// // http://localhost:3000