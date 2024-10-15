import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const isLoading = useNavigation().state === 'loading';
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      {/* <main>
        <h1>content</h1>
      </main> */}
      <Outlet />
      <CartOverview />
    </div>
  );
}

export default AppLayout;
