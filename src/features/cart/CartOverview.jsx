import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQuantity } from './cartSlice';
import { getTotalCartPrice } from './cartSlice';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <div className="flex items-center justify-between bg-stone-500 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      {totalCartPrice === 0 || totalCartQuantity === 0 ? (
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          Empty cart, start adding delicious pizzas from the{' '}
          <Link className="text-yellow-400 hover:text-yellow-300" to="/menu">
            menu
          </Link>
        </p>
      ) : (
        <>
          <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
            <span>{totalCartQuantity} pizzas</span>
            <span>
              {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalCartPrice)}
            </span>
          </p>
          <Link to="/cart" className="text-yellow-400 hover:text-yellow-300">
            Open cart &rarr;
          </Link>
        </>
      )}
    </div>
  );
}

export default CartOverview;
