import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Layout from "../components/Layout";
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../reducers';
import { User, USER_ADD_REQUEST, USER_LOG_IN_REQUEST } from '../reducers/userReducer';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { me } = useSelector<ReducerType, User>(state=> state.userReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		console.log(me);
	}, [])

	const signupOnSubmit = (e) => {
		e.preventDefault();
		const signupData = {
			email,
			password
		}
		dispatch(USER_ADD_REQUEST(signupData))
	}

	const loginOnSubmit = (e) => {
		e.preventDefault();
		const loginData = {
			email,
			password
		}
		dispatch(USER_LOG_IN_REQUEST(loginData))
	}

	const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	return(
		<>
			<Layout>
				<FormBox>
					<form onSubmit={signupOnSubmit}>
						<p>회원가입</p>
						<input type="text" value={email} onChange={emailChange}  />
						<input type="password" value={password} onChange={passwordChange}  />
						<button type="submit">회원가입</button>
					</form>
				</FormBox>
				<FormBox>
					<form onSubmit={loginOnSubmit}>
						<p>로그인</p>
						<input type="text" value={email} onChange={emailChange}  />
						<input type="password" value={password} onChange={passwordChange}  />
						<button type="submit">로그인</button>
					</form>
				</FormBox>
			</Layout>
		</>
	)
}

const FormBox = styled.div`
	margin: 30px auto 0;
	text-align: center;
`;

export default Login;
