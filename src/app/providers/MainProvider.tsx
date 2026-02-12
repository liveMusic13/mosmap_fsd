import { FC, ReactNode } from 'react';

import QueryProvider from './QueryProvider';
import TokenProvider from './TokenProvider';

interface IProps {
	children: ReactNode;
	token: string | undefined;
}

const MainProvider: FC<IProps> = ({ children, token }) => {
	return (
		<>
			<QueryProvider>
				<TokenProvider token={token}>{children}</TokenProvider>
			</QueryProvider>
		</>
	);
};

export default MainProvider;
