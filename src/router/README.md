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

> [!TIP]
> See example: https://github.com/DemianParkhomenko/router/blob/6c22a366fdffa032ce066ac04e44828959b5ae6a/src/App.tsx#L89-L91

```ts
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
```

```ts
const { Router, Link, useParams } = configureRouter(routes, routerOptions);
```

```ts
const params = useParams('/orders/:orderId');
```

```ts
<Link to="/orders/:orderId" params={{ orderId: orderId.toString() }}>
  Order {orderId}
</Link>
```
