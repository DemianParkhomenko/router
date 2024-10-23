import { ReactNode, useCallback, useMemo } from 'react';
import { ExtractParams, RoutesDefinition } from './index';

const generateHref = (to: string, params?: object) => {
  const pathSegments = to.split('/').filter(Boolean);
  for (const [key, value] of Object.entries(params || {})) {
    const index = pathSegments.indexOf(`:${key}`);
    if (index !== -1) {
      if (typeof value !== 'string') {
        console.error(`Expected a string value for param ${key}`);
        continue;
      }
      pathSegments[index] = value;
    }
  }
  return `/${pathSegments.join('/')}`;
};

export const createLink = <Routes extends RoutesDefinition>() => {
  return function Link<T extends Routes[number]['path'], P extends ExtractParams<T>>({
    to,
    params,
    children,
  }: {
    to: T;
    params?: P;
    children: ReactNode;
  }) {
    const href = useMemo(() => generateHref(to, params), [to, params]);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
      [href]
    );

    return (
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    );
  };
};
