import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import passport from "passport";

export const getUser = async (req: any, res: Response, next: NextFunction): Promise<Response> => {
	try {
		console.log(req.user);
		if (req.user) {
			const id = req.user.id
			const userRepository = getRepository(User);
			const user = await userRepository.findOneOrFail(id, {
				select: ["id", "email"], //We dont want to send the password on response
			});
			// const data = user.toJSON();
			return res.status(200).json(user)
		} else {
			res.status(200).json(null)
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
	// const results = await getRepository(User).findOne(req.params.id);
	// return res.json(results);
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

	const user = await getRepository(User).findOne({ email: req.body.email});

	if (user) {
		// return res.status(401).send('이미 가입된 사용자 입니다.');
		return res.status(200).json({isError: true, message: '이미 사용중인 이메일입니다.'})
	} else {
		const newUser = await getRepository(User).create({
			email: req.body.email,
			password: req.body.password,
		});

		await getRepository(User).save(newUser);
		return res.status(200).json(true)
	}
};

export const loginUser = async (req: any, res: Response, next: NextFunction): Promise<void> => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.error(err);
			return next(err);
		}
		if (info) {
			console.log(info)
			return res.status(200).json({isError: true, message: info.reason})
			// return res.status(401).send(info.reason);
		}
		return req.login(user, async (loginErr) => {
			if (loginErr) {
				// console.error(loginErr)
				return next(loginErr);
			}
			const id = req.user.id
			const userRepository = getRepository(User);
			const user = await userRepository.findOneOrFail(id, {
				select: ["id", "email"], //We dont want to send the password on response
				// relations: ["posts"]
			});
			// console.log(user)
			return res.status(200).json(user)
		})
	})(req, res, next)
}

export const logoutUser = (req: any, res: Response) => {
	req.logout();
	req.session.destroy();
	res.send('ok');
}
