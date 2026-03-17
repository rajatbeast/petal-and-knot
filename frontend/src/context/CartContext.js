import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from server if logged in, else from localStorage
  const loadCart = useCallback(async () => {
    if (user) {
      try {
        const res = await api.get("/cart");
        setCart(res.data);
      } catch {}
    } else {
      const local = localStorage.getItem("cart");
      if (local) setCart(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save to localStorage when not logged in
  useEffect(() => {
    if (!user) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, user]);

  // const addToCart = async (product) => {
  //   if (user) {
  //     const res = await api.post("/cart/add", {
  //       productId: product._id,
  //       name: product.name,
  //       price: product.price,
  //       emoji: product.emoji,
  //       quantity: 1,
  //     });
  //     setCart(res.data);
  //   } else {
  //     setCart((prev) => {
  //       const existing = prev.items.find((i) => i.product === product._id);
  //       if (existing) {
  //         return {
  //           items: prev.items.map((i) =>
  //             i.product === product._id
  //               ? { ...i, quantity: i.quantity + 1 }
  //               : i,
  //           ),
  //         };
  //       }
  //       return {
  //         items: [
  //           ...prev.items,
  //           {
  //             product: product._id,
  //             name: product.name,
  //             price: product.price,
  //             emoji: product.emoji,
  //             quantity: 1,
  //           },
  //         ],
  //       };
  //     });
  //   }
  //   setCartOpen(true);
  // };

  const addToCart = async (product) => {
    if (user) {
      const res = await api.post("/cart/add", {
        productId: product._id,
        name: product.name,
        price: product.price,
        emoji: product.emoji,
        image: product.image, // ← add this
        quantity: 1,
      });
      setCart(res.data);
    } else {
      setCart((prev) => {
        const existing = prev.items.find((i) => i.product === product._id);
        if (existing) {
          return {
            items: prev.items.map((i) =>
              i.product === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          };
        }
        return {
          items: [
            ...prev.items,
            {
              product: product._id,
              name: product.name,
              price: product.price,
              emoji: product.emoji,
              image: product.image, // ← add this
              quantity: 1,
            },
          ],
        };
      });
    }
    setCartOpen(true);
  };

  const updateQuantity = async (productId, quantity) => {
    if (user) {
      const res = await api.put(`/cart/update/${productId}`, { quantity });
      setCart(res.data);
    } else {
      setCart((prev) => ({
        items:
          quantity <= 0
            ? prev.items.filter((i) => i.product !== productId)
            : prev.items.map((i) =>
                i.product === productId ? { ...i, quantity } : i,
              ),
      }));
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const res = await api.delete(`/cart/remove/${productId}`);
      setCart(res.data);
    } else {
      setCart((prev) => ({
        items: prev.items.filter((i) => i.product !== productId),
      }));
    }
  };

  const clearCart = async () => {
    if (user) await api.delete("/cart/clear");
    setCart({ items: [] });
  };

  const totalItems = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
