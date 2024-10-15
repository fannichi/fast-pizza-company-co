import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import User from '../features/user/User';

function Header() {
  return (
    <header className="bg-yellow-500 uppercase">
      <Link to="/" className="tracking-[.25rem]">
        Fast pizza company Co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
