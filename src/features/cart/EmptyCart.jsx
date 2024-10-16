import Button from '../../UI/Button';
import { useSelector } from 'react-redux';

function EmptyCart() {
  const username = useSelector((store) => store.user.username);

  return (
    <div className="mt-20 flex flex-col items-center">
      <p className="rounded-lg bg-stone-100 p-4 text-center text-lg font-medium text-stone-500">
        {username}, your cart is empty. Start by adding pizzas 🍕
      </p>
      <Button to="/menu" type="small" className="mt-4">
        Take a look
      </Button>
    </div>
  );
}

export default EmptyCart;
