"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var passport_1 = __importDefault(require("passport"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
// Import Routers
var user_1 = __importDefault(require("./routes/user"));
var passport_2 = __importDefault(require("./passport"));
dotenv_1.default.config();
var app = express_1.default();
typeorm_1.createConnection()
    .then(function () {
    console.log('db 연결 성공!!');
})
    .catch(function (error) { return console.log(error); });
passport_2.default();
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    app.use(morgan_1.default('combined'));
    app.use(hpp_1.default());
    app.use(helmet_1.default());
    app.use(cors_1.default({
        origin: true,
        // origin: '', // 배포 후 도메인이 들어가면 된다.
        credentials: true,
    }));
}
else {
    app.use(morgan_1.default('dev'));
    app.use(cors_1.default({
        origin: true,
        credentials: true,
    }));
}
app.use('/', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default(process.env.COOKIE_SECRET));
if (process.env.NODE_ENV === 'production') {
    app.use(express_session_1.default({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        proxy: true,
        cookie: {
            httpOnly: true,
            secure: true,
            domain: process.env.NODE_ENV === 'production' && '.codingpalette.com',
            maxAge: 60 * 60 * 1000
        },
    }));
}
else {
    app.use(express_session_1.default({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
    }));
}
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
console.log(process.env.COOKIE_SECRET);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use(user_1.default);
app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});
