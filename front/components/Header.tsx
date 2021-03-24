import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Header = () => {
	return(
		<>
			<HeaderBox>
				<ul>
					<li>
						<Link href='/'>Home</Link>
						<Link href='/login'>Login</Link>
					</li>
				</ul>
			</HeaderBox>
		</>
	)
}

const HeaderBox = styled.div`
	width: 100%;
	border-bottom: 1px solid #ccc;
`;

export default Header;
