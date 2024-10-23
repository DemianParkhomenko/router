import { ReactNode, useContext } from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {[1, 2, 3].map((id) => (
          <li key={id}>
            <Link to="/dashboard" params={{}}>
              Order {id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Order() {
  const { id } = useParams('/orders/:id');
  return (
    <div>
      <h1>Order {id}</h1>
    </div>
  );
}




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

type Config = typeof config;


export function useParams<T extends  Config[number]['path']>(
  currentPath: T
): ExtractParams<T> {
  return {} as any;
}


export function Router({ config }: { config: Config }) {
  console.log(config);

  return <></>;
}

type ExtractParam<Path, NextPart> = Path extends `:${infer Param}` ? Record<Param, string> & NextPart : NextPart;

type ExtractParams<Path> = Path extends `${infer Segment}/${infer Rest}`
  ? ExtractParam<Segment, ExtractParams<Rest>>
  : ExtractParam<Path, {}

export function Link<T extends  Config[number]['path']>({
  to,
  params,
  children,
}: {
  to:   T ;
  params?: ExtractParams<T>;
  children: ReactNode;
}) {
  return <div></div>;
}

function App() {
  return <Router config={config} />;
}

export default App;

const MyComponent = () => {
  return (
    <div>
      <Link to='/orders/:id' params={{id: 's'}}>
        Dashboard
      </Link>
    </div>
  );
};
