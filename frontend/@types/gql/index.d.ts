export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type ArchiveArticleInput = {
  id: Scalars['String']['input'];
};

export type Article = {
  __typename?: 'Article';
  content?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  premiumContent?: Maybe<Scalars['JSON']['output']>;
  premiumViews: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Float']['output'];
};

export type ArticleInput = {
  id: Scalars['String']['input'];
  view?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArticlesInput = {
  archived: Scalars['Boolean']['input'];
};

export type AuthenticateInput = {
  initDataRaw: Scalars['String']['input'];
};

export type CreateArticleInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  premiumContent?: InputMaybe<Scalars['JSON']['input']>;
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  archiveArticle: Scalars['Boolean']['output'];
  authenticate: Scalars['Boolean']['output'];
  createArticle: Article;
  updateArticle: Scalars['Boolean']['output'];
};


export type MutationArchiveArticleArgs = {
  input: ArchiveArticleInput;
};


export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};


export type MutationUpdateArticleArgs = {
  input: UpdateArticleInput;
};

export type Query = {
  __typename?: 'Query';
  article?: Maybe<Article>;
  articles: Array<Article>;
  user: User;
};


export type QueryArticleArgs = {
  input: ArticleInput;
};


export type QueryArticlesArgs = {
  input: ArticlesInput;
};

export type UpdateArticleInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['String']['input'];
  premiumContent?: InputMaybe<Scalars['JSON']['input']>;
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String']['output'];
  id: Scalars['Float']['output'];
};
