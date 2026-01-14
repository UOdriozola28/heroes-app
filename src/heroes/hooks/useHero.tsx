import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/get-hero.action"

export const useHero = (idSlug: string) => {

  const { data: superheroData } = useQuery({
    queryKey: ['hero-page', idSlug],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 6 * 1
  })

  const totalPower = (superheroData?.strength ?? 0) + (superheroData?.intelligence ?? 0) + (superheroData?.speed ?? 0) + (superheroData?.durability ?? 0)
  const averagePower = Math.round((totalPower / 4) * 10)

  return {
    superheroData,
    averagePower
  }

}
