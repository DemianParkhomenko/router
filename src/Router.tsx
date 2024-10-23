import { ReactNode, createContext, useContext } from 'react';

export type GenericConfig = readonly {
  path: string;
  element: JSX.Element;
}[];

export type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, {}>;

export function createRouter<Config extends GenericConfig>(config: Config) {
  const RouterContext = createContext<{ params: Record<string, string> }>({ params: {} });

  function Router() {
    console.log(config);
    return (
      <RouterContext.Provider value={{ params: {} }}>{config.map(({ element }) => element)}</RouterContext.Provider>
    );
  }

  function useParams<T extends Config[number]['path']>(currentPath: T): ExtractParams<T> {
    const context = useContext(RouterContext);
    return context.params as ExtractParams<T>;
  }

  function Link<T extends Config[number]['path']>({
    to,
    params,
    children,
  }: {
    to: T;
    params?: ExtractParams<T>;
    children: ReactNode;
  }) {
    return <a href={to}>{children}</a>;
  }

  return { Router, useParams, Link };
}
