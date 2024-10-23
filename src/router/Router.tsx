import { useState, useEffect, useMemo } from 'react';
import { RouterOptions, RoutesDefinition } from './index';
import { RouterContext } from './contexts/RouterContext';

const isCurrentPath = ({ path, currentPath }: { path: string; currentPath: string }) => {
  const pathSegments = path.split('/').filter(Boolean);
  const currentPathSegments = currentPath.split('/').filter(Boolean);
  if (pathSegments.length !== currentPathSegments.length) {
    return false;
  }
  return pathSegments.every((segment, index) => {
    if (segment.startsWith(':')) {
      return true;
    }
    return segment === currentPathSegments[index];
  });
};

const extractParams = ({ path, currentPath }: { path: string; currentPath: string }) => {
  const pathSegments = path.split('/').filter(Boolean);
  const currentPathSegments = currentPath.split('/').filter(Boolean);
  return pathSegments.reduce((acc, segment, index) => {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      return { ...acc, [paramName]: currentPathSegments[index] };
    }
    return acc;
  }, {});
};

export const createRouter = <Routes extends RoutesDefinition>(routes: Routes, options: RouterOptions) => {
  return function Router() {
    const [params, setParams] = useState<Record<string, string>>({});
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
      const handlePopState = () => {
        setCurrentPath(window.location.pathname);
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const route = useMemo(() => {
      return routes.find(({ path }) => isCurrentPath({ path, currentPath }));
    }, [currentPath]);

    useEffect(() => {
      if (route) {
        setParams(extractParams({ path: route.path, currentPath }));
      }
    }, [currentPath, route]);

    return (
      <RouterContext.Provider value={{ params }}>
        {route ? route.element : options.notFoundElement || <div>404 Not Found</div>}
      </RouterContext.Provider>
    );
  };
};
