import type { RouteObject } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import { SvgIcon } from './features/icons/components/SvgIcon';
import { Link } from './foundation/components/Link';
import { Text } from './foundation/components/Text';
import { ActionLayout } from './foundation/layouts/ActionLayout';
import { CommonLayout } from './foundation/layouts/CommonLayout';
import { Color, Space, Typography } from './foundation/styles/variables';
import { lazyImport } from './lib/lazyNamed';
import { Suspense } from 'react';

const { BookDetailPage } = lazyImport(() => import('./pages/BookDetailPage'), 'BookDetailPage');
const { EpisodeDetailPage } = lazyImport(() => import('./pages/EpisodeDetailPage'), 'EpisodeDetailPage');
const { SearchPage } = lazyImport(() => import('./pages/SearchPage'), 'SearchPage');
const { TopPage } = lazyImport(() => import('./pages/TopPage'), 'TopPage');
const { AuthorDetailPage } = lazyImport(() => import('./pages/AuthorDetailPage'), 'AuthorDetailPage');

const _BackToTopButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${Space * 1}px;
  border: none;
  background-color: transparent;
`;

export const routes = [
  {
    Component: Router,
    path: '*',
  },
] as const satisfies RouteObject[];

export function Router(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<CommonLayout />} path={'/'}>
          <Route element={<TopPage />} path={''} />
        </Route>
        <Route
          element={
            <ActionLayout
              leftContent={
                <_BackToTopButton href={'/'}>
                  <SvgIcon color={Color.MONO_100} height={32} type="ArrowBack" width={32} />
                  <Text color={Color.MONO_100} typography={Typography.NORMAL16} weight="bold">
                    トップへ戻る
                  </Text>
                </_BackToTopButton>
              }
            />
          }
          path={'/'}
        >
          <Route element={<BookDetailPage />} path={'books/:bookId'} />
          <Route element={<EpisodeDetailPage />} path={'books/:bookId/episodes/:episodeId'} />
          <Route element={<AuthorDetailPage />} path={'authors/:authorId'} />
          <Route element={<SearchPage />} path={'search'} />
        </Route>
      </Routes>
    </Suspense>
  );
}
