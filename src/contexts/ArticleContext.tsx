import React, { createContext, useContext, useState } from 'react';
import {
	defaultArticleState,
	type ArticleStateType,
} from '../constants/articleProps';

type ArticleContextType = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	applyFormState: (formState: ArticleStateType) => void;
	resetArticleState: () => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const applyFormState = (formState: ArticleStateType) => {
		setArticleState(formState);
	};

	const resetArticleState = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<ArticleContext.Provider
			value={{
				articleState,
				setArticleState,
				applyFormState,
				resetArticleState,
			}}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticleContext = () => {
	const context = useContext(ArticleContext);
	if (context === undefined) {
		throw new Error('useArticleContext must be used within an ArticleProvider');
	}
	return context;
};
