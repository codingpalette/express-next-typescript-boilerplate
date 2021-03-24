"use strict";
exports.__esModule = true;
var express_1 = require("express");
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var app = express_1["default"]();
typeorm_1.createConnection()
    .then(function () {
    console.log('db 연결 성공!!');
})["catch"](function (error) { return console.log(error); });
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
