import { Suspense, lazy } from 'react';

const Icons = {
  ArrowBack: lazy(() => import('@mui/icons-material/ArrowBack')),
  Close: lazy(() => import('@mui/icons-material/Close')),
  Favorite: lazy(() => import('@mui/icons-material/Favorite')),
  FavoriteBorder: lazy(() => import('@mui/icons-material/FavoriteBorder')),
  NavigateNext: lazy(() => import('@mui/icons-material/NavigateNext')),
  Search: lazy(() => import('@mui/icons-material/Search')),
} as const;

type Props = {
  color: string;
  height: number;
  type: keyof typeof Icons;
  width: number;
};

export const SvgIcon: React.FC<Props> = ({ color, height, type, width }) => {
  // eslint-disable-next-line
  const Icon = Icons[type];
  return (
    <Suspense fallback={null}>
      <Icon style={{ color, height, width }} />
    </Suspense>
  );
};
