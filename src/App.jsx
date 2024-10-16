import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './UI/AppLayout';
import Error from './UI/Error';
import Home from './UI/Home';
import Cart from './features/cart/Cart';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateOrder, { action as createOrderAction } from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/menu',
          loader: menuLoader,
          element: <Menu />,
          errorElement: <Error />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/order/new',
          action: createOrderAction,
          element: <CreateOrder />,
        },
        {
          path: '/order/:orderId',
          loader: orderLoader,
          action: updateOrderAction,
          errorElement: <Error />,
          element: <Order />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
