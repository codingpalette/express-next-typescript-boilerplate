import express from 'express';
import { createConnection } from 'typeorm';
import cors from "cors";
import session from 'express-session';
import cookieParser from'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import path from 'path';
import hpp from 'hpp';
import helmet from 'helmet';
import dotenv from 'dotenv';
import "reflect-metadata";

// Import Routers
import userRouter  from './routes/user';
import passportConfig from './passport';

dotenv.config();
const app = express();
createConnection()
	.then(() => {
		console.log('db 연결 성공!!');
	})
	.catch((error) => console.log(error));

passportConfig();

if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1);
	app.use(morgan('combined'));
	app.use(hpp());
	app.use(helmet());
	app.use(cors({
		origin: true,
		// origin: '', // 배포 후 도메인이 들어가면 된다.
		credentials: true,
	}));
} else {
	app.use(morgan('dev'));
	app.use(cors({
		origin: true,
		credentials: true,
	}));
}

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
if (process.env.NODE_ENV === 'production') {
	app.use(session({
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
} else {
	app.use(session({
		saveUninitialized: false,
		resave: false,
		secret: process.env.COOKIE_SECRET,
	}));
}

app.use(passport.initialize());
app.use(passport.session());


console.log(process.env.COOKIE_SECRET)


app.get('/', (req: express.Request, res: express.Response) => {
	res.send('Hello World!');
});

app.use(userRouter);

app.listen(4000, () => {
	console.log('Example app listening on port 4000!');
});
