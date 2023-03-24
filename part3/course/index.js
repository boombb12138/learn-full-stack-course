const { request, response } = require("express");
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

// 创建路由 获取单一资源
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id); //动态路由中参数的获取request.params.id
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    // 如果没有找到数据 就返回404 status设置状态 end来响应请求
    response.status(404).end();
  }
});

// 删除资源
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end(); //删除资源成功 就返回204无内容状态码
});

// 添加笔记
// 给新加的笔记唯一ID
const generateId = () => {
  // notes.map((n) => n.id)返回id数组 展开后作为参数给Math.max
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0; //找到notes中最大的id
  return maxId + 1;
};

app.use(express.json()); //访问数据 要express的json-parser帮助,它可以将JSON转为JS对象
app.post("/api/notes", (request, response) => {
  const body = request.body; //获取数据

  // 如果收到的数据缺少content属性
  // 就以400状态码响应请求
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };
  notes = notes.concat(note); //concat合并两个或多个数组,返回新数组
  // note.id = generateId(); //给新增的笔记一个id
  response.json(note);
});

const PORT = 3001;
app.listen(PORT); //监听发送到 3001 端口的 HTTP 请求
console.log(`Server running on port ${PORT}`);
