import { ReactNode } from 'react';

export function Router({ config }: { config: { path: string; element: ReactNode }[] }) {
  throw new Error('not implemented');
}

export function useParams() {
  throw new Error('not implemented');
}

export function Link({
  to,
  params,
  children,
}: {
  to: string;
  params?: { [key: string]: string };
  children: ReactNode;
}) {
  throw new Error('not implemented');
}
