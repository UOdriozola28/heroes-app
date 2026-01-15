import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { memo, use } from 'react';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginationHero } from '@/heroes/hooks/usePaginationHero';
import { useParamsHero } from '@/heroes/hooks/useParamsHero';
import { FavoriteHeroContex } from '@/heroes/contexts/FavoriteHeroContext';

export const HomePage = memo(() => {

  const { activeTab, limit, page, category, handleChangeSearchParams } = useParamsHero()
  const { data: heroesReponse } = usePaginationHero(+limit, +page, category)
  const { data: summary } = useHeroSummary()
  const { favorites, favoriteCount } = use(FavoriteHeroContex);

  // ? ya no se usa useEffect con TanStack
  // useEffect(() => {
  //   getHeroesByPage().then(heroes => {
  //     console.log(heroes)
  //   })
  // }, [])

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() =>
              handleChangeSearchParams({
                tab: 'all',
                category: 'all',
                page: '1',
              })
            }>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() =>
                handleChangeSearchParams({
                  tab: 'favorites',
                  category: 'favorites',
                  page: '1',
                })
              }
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() =>
              handleChangeSearchParams({
                tab: 'heroes',
                category: 'hero',
                page: '1',
              })
            }>
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() =>
                handleChangeSearchParams({
                  tab: 'villains',
                  category: 'villain',
                  page: '1',
                })
              }
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesReponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesReponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los Villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesReponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}

        {
          activeTab !== 'favorites' && <CustomPagination totalPages={heroesReponse?.pages ?? 0} />
        }

      </>
    </>
  );
})
