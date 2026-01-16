import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/hero.interface"

interface Options {
  name?: string,
  team?: string,
  category?: string,
  universe?: string,
  status?: string,
  strength?: string,
}

const BASE_URL = import.meta.env.VITE_API_URL

export const getSearchHeroAction = async ({ category = '', name = '', status = '', strength = '', team = '', universe = '' }: Options) => {

  const { data } = await heroApi.get<Hero[]>(`/search`, {
    params: {
      name,
      category,
      status,
      strength,
      team,
      universe
    }
  })

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`
  }))
}
