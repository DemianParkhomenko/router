import { ReactNode } from 'react';

type Config = readonly { path: string; element: ReactNode }[];

export function Router({ config }: { config: Config }) {
  console.log(config);
  return <></>;
}

// export const createUseParams = ({ config }: { config: Config }) => {
//   return () => {
//     useParams();
//   };
// };

// export function useParams() {
//   throw new Error('not implemented');
// }

const config = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/orders/:id',
    element: <Order />,
  },
] as const;

export const createLinkComponent = ({ config }: { config: Config }) => {};

export function Link({
  to,
  params,
  children,
}: {
  to: Pick<Config[number], 'path'>;
  params?: { [key: string]: string };
  children: ReactNode;
  }) {
  
}

<Link to="" >
