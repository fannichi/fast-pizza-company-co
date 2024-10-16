import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import LinkButton from '../../UI/LinkButton';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>

      {cart.length === 0 ? (
        <>
          <>
            <div className="mt-20 flex flex-col items-center">
              <p className="rounded-lg bg-stone-100 p-4 text-center text-lg font-medium text-stone-500">
                {username}, your cart is empty. Start by adding pizzas 🍕
              </p>
              <Button to="/menu" type="small" className="mt-4">
                Take a look
              </Button>
            </div>
          </>
        </>
      ) : (
        <>
          <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
          <ul className="mt-3 divide-y divide-stone-200 border-b">
            {cart.map((item) => (
              <CartItem item={item} key={crypto.randomUUID()} />
            ))}
          </ul>

          <div className="mt-6 space-x-2">
            <Button to="/order/new" type="primary">
              Order pizzas
            </Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
              Clear cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
