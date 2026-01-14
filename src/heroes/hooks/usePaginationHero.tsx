import { useQuery } from "@tanstack/react-query"
import { getHeroesByPageAction } from "../actions/get-herores-by-page.action"

export const usePaginationHero = (limit: number, page: number) => {
  return useQuery({
    queryKey: ['heroes', { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 1,
  })
}
