import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContex {
  favorites: Hero[],
  favoriteCount: number,
  isFavorite: (hero: Hero) => boolean,
  toggleFavorite: (hero: Hero) => void
}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContex = createContext({} as FavoriteHeroContex);

const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : []
}

// HOC
export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage())

  const isFavorite = (hero: Hero) => {
    return favorites.some((fav) => fav.id === hero.id)
  }

  const toggleFavorite = (hero: Hero) => {

    const heroExist = favorites.find((fav) => fav.id === hero.id)

    if (heroExist) {
      setFavorites((prev) => {
        return [
          ...prev.filter((prevFav) => prevFav.id !== hero.id)
        ]
      })
      return;
    }

    setFavorites((prev) => {
      return [
        ...prev,
        hero
      ]
    })

  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  return (
    <FavoriteHeroContex value={{
      favorites,
      favoriteCount: favorites.length,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoriteHeroContex>
  )
}

