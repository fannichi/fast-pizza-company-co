import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header>
      <Link to="/">Fast pizza company Co.</Link>
      <SearchOrder />
      <p>Youssef</p>
    </header>
  );
}

export default Header;
