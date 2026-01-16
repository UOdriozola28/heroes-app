import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getSearchHeroAction } from '@/heroes/actions/get-search-hero.action';

export const SearchPage = () => {

  const [searchParams] = useSearchParams()

  const name = searchParams.get('name') ?? ''
  const category = searchParams.get('category') ?? ''
  const status = searchParams.get('status') ?? ''
  const strength = searchParams.get('strength') ?? ''
  const team = searchParams.get('team') ?? ''
  const universe = searchParams.get('universe') ?? ''

  const { data: heroesResponse } = useQuery({
    queryKey: ['hero-search', { name, category, status, strength, team, universe }],
    queryFn: () => getSearchHeroAction({ category, name, status, strength, team, universe }),
    staleTime: 1000 * 6 * 3
  })

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'Home1', to: '/' },
      //   { label: 'Home2', to: '/' },
      //   { label: 'Home3', to: '/' },
      // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heroes={heroesResponse ?? []} />
    </>
  );
};

export default SearchPage;
