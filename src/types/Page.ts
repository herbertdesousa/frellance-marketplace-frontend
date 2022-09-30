import { NextPage } from 'next';

export type Page<T = {}> = NextPage<T & { children?: React.ReactNode }>;
