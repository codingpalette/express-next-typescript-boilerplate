import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import bcrypt from "bcrypt";

export default () => {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'

	}, async (email, password, done) => {
		try {
			const user = await getRepository(User).findOne({
				where: { email }
			});
			if (!user) {
				return done(null, false, { reason: '존재하지 않는 이메일입니다!' })
			}
			const res = await bcrypt.compare(password, user.password)
			if (res) {
				return done(null, user);
			}
			return done(null, false, { reason: '비밀번호가 틀렸습니다!' })
		} catch (e) {
			console.error(e)
			return done(e)
		}

	}));
}
