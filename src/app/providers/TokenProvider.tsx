'use client';

import { FC, ReactNode, createContext, useContext } from 'react';

import { decodeJWTToken } from '@/shared/lib/decodedToken';
import { IDecodedTokenData } from '@/shared/types/shared.type';

interface IProps {
	children: ReactNode;
	token: string | undefined;
}

const TokenContext = createContext<{
	token: string | undefined;
	decodeToken: IDecodedTokenData | null;
}>({
	token: undefined,
	decodeToken: null,
});

const TokenProvider: FC<IProps> = ({ children, token }) => {
	const decodeToken = decodeJWTToken(token || null);

	return (
		<TokenContext.Provider value={{ token, decodeToken }}>
			{children}
		</TokenContext.Provider>
	);
};

export default TokenProvider;

export const useCheckToken = () => useContext(TokenContext);
