import { create } from "zustand";
import { persist } from "zustand/middleware";
import { round2 } from "../utils";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartStore = create()(
  persist(() => initialState, {
    name: "cartStore",
  })
);

const useCartService = () => {
  const { items, totalPrice } = cartStore();

  return {
    items,
    totalPrice,
    increase: (item) => {
      const exist = items.find((x) => x.id === item.id);

      const updatedCartItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];

      const { totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    decrease: (item) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;

      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x) => x.slug !== item.slug)
          : items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
            );

      const { totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        totalPrice,
      });
    },
    clear: () => {
      cartStore.setState({
        items: [],
      });
    },
    init: () => cartStore.setState(initialState),
  };
};

export default useCartService;

export const calcPrice = (items) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  return { itemsPrice };
};
