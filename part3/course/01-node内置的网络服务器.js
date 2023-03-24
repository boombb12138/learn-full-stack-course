// 用 Node 内置的 http 网络服务器直接实现我们的服务器代码
const http = require("http");

//向前端提供 JSON 格式的原始数据
let notes = [
  {
    id: 1,
    content: "HTML is easy",
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

//  createServer 方法创建一个新的网络服务器
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT); //监听发送到 3001 端口的 HTTP 请求
console.log(`Server running on port ${PORT}`);
