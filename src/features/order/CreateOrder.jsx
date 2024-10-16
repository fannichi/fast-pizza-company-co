import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import Button from '../../UI/Button';
import { formatCurrency } from '../../utils/helpers';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

const inputStyle =
  'rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-400 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-theme-color focus:ring-opacity-50 md:px-6 md:py-3';

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((store) => store.user);
  const isLoadingAddress = addressStatus === 'loading';

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  // this happens when there is no submission  due to errors
  const formErrors = useActionData();

  const isSubmitting = navigation.state === 'submitting';
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalOrderPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-6 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={username}
            name="customer"
            required
            className={`${inputStyle} grow`}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className={`${inputStyle} w-full`} />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="relative grow">
            <input
              disabled={isLoadingAddress}
              defaultValue={address}
              type="text"
              name="address"
              required
              className={`${inputStyle} w-full`}
            />
            {!position.latitude && !position.longitude && (
              <button
                className="absolute right-0.5 z-50"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                <img src="/loc.png" className="h-11 w-11" />
              </button>
            )}
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-500">{errorAddress}</p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-theme-color focus:ring-theme-color h-6 w-6 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : 'not available'
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? 'Placing order...' : `Order now (${formatCurrency(totalOrderPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
    position: data.position,
  };

  // validation
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = 'Invalid phone number!';
  if (Object.keys(errors).length > 0) return errors;

  // create order
  const newOrder = await createOrder(order);

  //Do not overuse store.dispatch, use it only when necessary
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
