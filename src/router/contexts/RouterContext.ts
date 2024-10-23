import { createContext, useContext } from 'react';

export const RouterContext = createContext<{ params: Record<string, string> }>({
  params: {},
});

export const useRouterContext = () => useContext(RouterContext);
