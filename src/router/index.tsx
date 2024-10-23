import { createRouter } from './Router';
import { createLink } from './Link';
import { useRouterContext } from './contexts/RouterContext';

export type RouterConfig = readonly {
  path: string;
  element: JSX.Element;
}[];

export type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, object>;

export const configureRouter = <Config extends RouterConfig>(config: Config) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useParams = <T extends Config[number]['path']>(_: T): ExtractParams<T> => {
    const context = useRouterContext();
    return context.params as ExtractParams<T>;
  };

  const Router = createRouter(config);
  const Link = createLink<Config>();

  return { Router, useParams, Link };
};
