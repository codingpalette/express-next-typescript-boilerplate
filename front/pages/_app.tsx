import { AppProps } from 'next/app';
import { GlobalStyles } from '../components/GlobalStyles';
import { Global } from '@emotion/react';
import wrapper from '../store';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global styles={GlobalStyles} />
			<Component {...pageProps}>
			</Component>
		</>
	)
}

// redux, saga 설정
export default wrapper.withRedux(App);
