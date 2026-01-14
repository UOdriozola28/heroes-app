import { useSearchParams } from "react-router";

interface Props {
  activeTab: string,
  page: string,
  limit: string,
  handleChangeSearchParams: (key: string, value: string) => void
}

export const useParamsHero = (): Props => {

  const tabType = ['all', 'favorites', 'heroes', 'villains']
  const [searchParams, setSearchParams] = useSearchParams();
  const tabSearchTab = searchParams.get('tab') ?? 'all';
  const activeTab = (tabType.includes(tabSearchTab)) ? tabSearchTab : 'all'
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';

  const handleChangeSearchParams = (key: string, value: string) => {
    setSearchParams(prev => {
      prev.set(key, value)
      return prev
    })
  }

  return {
    activeTab,
    page,
    limit,
    handleChangeSearchParams
  }

}
