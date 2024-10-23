import { configureRouter, RouterOptions, RoutesDefinition } from './router/index';

const routes = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/orders/:orderId',
    element: <Order />,
  },
  {
    path: '/orders/:orderId/products/:productId',
    element: <Product />,
  },
  {
    path: '/',
    element: <Root />,
  },
] as const satisfies RoutesDefinition;

const routerOptions: RouterOptions = {
  notFoundElement: <div>👾 Route 404</div>,
};

const { Router, Link, useParams } = configureRouter(routes, routerOptions);

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {[1, 2, 3].map((orderId) => (
          <li key={orderId}>
            <Link to="/orders/:orderId" params={{ orderId: orderId.toString() }}>
              Order {orderId}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Order() {
  const params = useParams('/orders/:orderId');
  return (
    <div>
      <h1>Order {params.orderId}</h1>
      {[1, 2, 3].map((productId) => (
        <li key={productId}>
          <Link
            to="/orders/:orderId/products/:productId"
            params={{ orderId: params.orderId, productId: productId.toString() }}
          >
            Product {productId}
          </Link>
        </li>
      ))}
    </div>
  );
}

function Product() {
  const params = useParams('/orders/:orderId/products/:productId');
  return (
    <div>
      <h1>Product {params.productId} </h1>
      <div>
        Order {params.orderId} Product {params.productId}
      </div>
    </div>
  );
}

function Root() {
  return (
    <div>
      <h1>Root</h1>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;
