import { create } from "zustand";
import { persist } from "zustand/middleware";
import useAxios from "../utils/axios";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartStore = create()(
  persist(() => initialState, {
    name: "cartStore",
  })
);

const updateCart = (userId, productId, quantity, api) => {
  api.post(`/cart/add`, {
    customerId: userId,
    productId: productId,
    quantity: quantity,
  });
};

const useCartService = () => {
  const api = useAxios();
  const { items, totalPrice } = cartStore();

  return {
    items,
    totalPrice,
    totalItems: items.reduce((acc, item) => acc + item.quantity, 0),
    setItems: (items) => {
      const { totalPrice } = calcPrice(items);
      cartStore.setState({ items, totalPrice });
    },
    increase: (item, userId, quantity = 1) => {
      const exist = items.find((x) => x.productId === item.productId);

      const updatedCartItems = exist
        ? items.map((x) =>
            x.productId === item.productId
              ? { ...exist, quantity: exist.quantity + quantity }
              : x
          )
        : [...items, { ...item, quantity: quantity }];

      const { totalPrice } = calcPrice(updatedCartItems);

      updateCart(userId, item.productId, quantity, api);
      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    decrease: (item, userId) => {
      const exist = items.find((x) => x.productId === item.productId);
      if (!exist) return;

      const updatedCartItems =
        exist.quantity === 1
          ? items.filter((x) => x.productId !== item.productId)
          : items.map((x) =>
              x.productId === item.productId
                ? { ...exist, quantity: exist.quantity - 1 }
                : x
            );

      const { totalPrice } = calcPrice(updatedCartItems);
      updateCart(userId, item.productId, -1, api);

      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    remove: (item, userId) => {
      const updatedCartItems = items.filter(
        (x) => x.productId !== item.productId
      );
      const { totalPrice } = calcPrice(updatedCartItems);
      api.delete(`/cart/remove/${item.productId}/${userId}`);

      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
        totalPrice: 0,
      });
    },
    init: () => cartStore.setState(initialState),
  };
};

export default useCartService;

export const calcPrice = (items) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalPrice = Math.round((itemsPrice + Number.EPSILON) * 100) / 100;
  return { totalPrice };
};
