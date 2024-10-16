import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import User from '../features/user/User';

function Header() {
  return (
    <header className="bg-theme-color flex items-center justify-between border-b border-stone-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[.25rem]">
        Fast pizza company Co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
