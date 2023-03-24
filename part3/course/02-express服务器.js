const express = require("express");
const app = express();

//向前端提供 JSON 格式的原始数据
let notes = [
  {
    id: 1,
    content: "HTML is noeasy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

// 参数1：包含 HTTP 请求的所有信息
// 参数2：响应
app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>"); //通过使用 response 对象的 send 方法
});
app.get("/api/notes", (request, response) => {
  response.json(notes); //用 response 对象的 json 方法来响应
});

const PORT = 3001;
app.listen(PORT); //监听发送到 3001 端口的 HTTP 请求
console.log(`Server running on port ${PORT}`);
