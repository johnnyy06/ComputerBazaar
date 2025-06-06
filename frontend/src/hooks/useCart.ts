// frontend/src/hooks/useCart.ts
import { useContext } from 'react';
import CartContext from '../context/CartContextDefinition';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;