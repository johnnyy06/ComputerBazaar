// frontend/src/hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { addToFavorites, removeFromFavorites, checkFavorite } from '../services/favoriteService';
import { ProductData } from '../services/productService';

export const useFavorites = (product?: ProductData) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    // Only check favorite status if user is logged in and product is provided
    if (user && product?._id) {
      const checkIfFavorite = async () => {
        try {
          const result = await checkFavorite(product._id as string);
          setIsFavorite(result);
        } catch (err) {
          console.error('Error checking favorite status:', err);
        }
      };

      checkIfFavorite();
    }
  }, [user, product]);

  const toggleFavorite = useCallback(async () => {
    if (!user) {
      setError('Te rugăm să te autentifici pentru a adăuga produse la favorite');
      return;
    }

    if (!product || !product._id) {
      setError('Produs invalid');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isFavorite) {
        await removeFromFavorites(product._id);
        setIsFavorite(false);
      } else {
        await addToFavorites(product._id);
        setIsFavorite(true);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('A apărut o eroare. Te rugăm să încerci din nou.');
      }
    } finally {
      setLoading(false);
    }
  }, [isFavorite, product, user]);

  return { isFavorite, toggleFavorite, loading, error };
};

export default useFavorites;