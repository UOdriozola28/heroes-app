import { useSearchParams } from "react-router";

type SearchParams = { [key: string]: string }

interface Props {
  activeTab: string,
  page: string,
  limit: string,
  category: string,
  handleChangeSearchParams: (params: SearchParams) => void
}

export const useParamsHero = (): Props => {

  const [searchParams, setSearchParams] = useSearchParams();
  const tabType = ['all', 'favorites', 'heroes', 'villains']
  const tabSearchTab = searchParams.get('tab') ?? 'all';
  const activeTab = (tabType.includes(tabSearchTab)) ? tabSearchTab : 'all'
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all'

  const handleChangeSearchParams = (params: SearchParams) => {
    const paramsNew = Object.entries(params)
    setSearchParams(prev => {

      paramsNew.forEach(([key, value]) => {
        prev.set(key, value.toString())
      })

      return prev
    })
  }

  return {
    activeTab,
    page,
    limit,
    category,
    handleChangeSearchParams
  }

}
