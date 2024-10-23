import { createRouter, GenericConfig } from './Router';

const config = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/orders/:id',
    element: <Order />,
  },
] as const satisfies GenericConfig;

const { Router, Link, useParams } = createRouter(config);

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {[1, 2, 3].map((id) => (
          <li key={id}>
            <Link to="/orders/:id" params={{ id: id.toString() }}>
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

function App() {
  return <Router />;
}

export default App;
