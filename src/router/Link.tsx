import { ReactNode, useCallback } from 'react';
import { ExtractParams, RouterConfig } from './index';

const generateHref = (to: string, params?: object) => {
  const pathSegments = to.split('/').filter(Boolean);
  for (const [key, value] of Object.entries(params || {})) {
    const index = pathSegments.indexOf(`:${key}`);
    if (index !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      pathSegments[index] = value;
    }
  }
  return `/${pathSegments.join('/')}`;
};

export const createLink = <Config extends RouterConfig>() => {
  return function Link<T extends Config[number]['path'], P extends ExtractParams<T>>({
    to,
    params,
    children,
  }: {
    to: T;
    params?: P;
    children: ReactNode;
  }) {
    const href = generateHref(to, params);

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
