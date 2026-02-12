'use client';

import { FC, ReactNode, createContext, useContext } from 'react';

interface IProps {
	children: ReactNode;
	token: string | undefined;
}

const TokenContext = createContext<{ token: string | undefined }>({
	token: undefined,
});

const TokenProvider: FC<IProps> = ({ children, token }) => {
	return (
		<TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
	);
};

export default TokenProvider;

export const useCheckToken = () => useContext(TokenContext);
