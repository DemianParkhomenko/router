# Router Library Documentation

This library provides tools to configure and use routing for a React application.

## API

### `Router`

The `Router` component is used to render the defined routes. It should be included in the main application component to handle route navigation.

### `Link`

The `Link` component is used for navigation within the application. It allows you to create links that update the URL and navigate to different routes.

### `useParams`

The `useParams` hook is used to access route parameters. It returns an object containing the values of dynamic parameters defined in the route path.

## Usage Example

```javascript
import { configureRouter } from './router/index';

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
];

const { Router, Link, useParams } = configureRouter(routes);

function App() {
  return <Router />;
}

export default App;
```

- Use **`Router`** to render the defined routes.
- Use **`Link`** to create navigational links.
- Use **`useParams`** to access dynamic route parameters.
