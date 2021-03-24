import passport from "passport";
import {getRepository} from "typeorm";
import { User } from "../entity/User";
import local from "./local";

export default () => {
	passport.serializeUser((user: any, done) => {
		done(null, user.id);
	})

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await getRepository(User).findOne(id);
			// const user = await User.findOne({ where: { id } })
			done(null, user)
		} catch (e) {
			console.error(e);
			done(e);
		}
	});

	local();
}
