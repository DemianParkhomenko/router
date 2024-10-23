import { createRouter } from './Router';
import { createLink } from './Link';
import { useRouterContext } from './contexts/RouterContext';

export type RoutesDefinition = readonly {
  path: string;
  element: JSX.Element;
}[];

export type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

export type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, object>;

export type RouterOptions = {
  notFoundElement?: JSX.Element;
};

export const configureRouter = <Routes extends RoutesDefinition>(routes: Routes, options: RouterOptions = {}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const useParams = <T extends Routes[number]['path']>(_: T): ExtractParams<T> => {
    const context = useRouterContext();
    return context.params as ExtractParams<T>;
  };

  const Router = createRouter(routes, options);
  const Link = createLink<Routes>();

  return { Router, useParams, Link };
};
