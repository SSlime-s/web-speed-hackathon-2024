import { Suspense, useId } from 'react';

import { BookCard } from '../../features/book/components/BookCard';
import { FeatureCard, FeatureCardSkeleton } from '../../features/feature/components/FeatureCard';
import { useFeatureList } from '../../features/feature/hooks/useFeatureList';
import { RankingCard, RankingCardSkeleton } from '../../features/ranking/components/RankingCard';
import { useRankingList } from '../../features/ranking/hooks/useRankingList';
import { useRelease } from '../../features/release/hooks/useRelease';
import { Box } from '../../foundation/components/Box';
import { Flex } from '../../foundation/components/Flex';
import { Spacer } from '../../foundation/components/Spacer';
import { Text } from '../../foundation/components/Text';
import { Color, Space, Typography } from '../../foundation/styles/variables';
import { getDayOfWeekStr } from '../../lib/date/getDayOfWeekStr';

import { CoverSection } from './internal/CoverSection';

const FeatureSection: React.FC = () => {
  const { data: featureList } = useFeatureList({ query: {} });

  const pickupA11yId = useId();

  return (
    <Box aria-labelledby={pickupA11yId} as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} id={pickupA11yId} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
          {featureList.map((feature) => (
            <FeatureCard key={feature.id} book={feature.book} bookId={feature.book.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
const FeatureSkeleton: React.FC = () => {
  return (
    <Box as="section" maxWidth="100%" mt={16} width="100%">
      <Text as="h2" color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
        ピックアップ
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" direction="row" gap={Space * 2} justify="flex-start">
          {[...Array(5)].map((_, index) => (
            <FeatureCardSkeleton key={index} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const RankingSection: React.FC = () => {
  const { data: rankingList } = useRankingList({ query: {} });

  const rankingA11yId = useId();

  return (
    <Box aria-labelledby={rankingA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={rankingA11yId} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Flex align="center" as="ul" direction="column" justify="center">
          {rankingList.map((ranking) => (
            <RankingCard key={ranking.id} book={ranking.book} bookId={ranking.book.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
const RankingSkeleton: React.FC = () => {
  return (
    <Box as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} typography={Typography.NORMAL20} weight="bold">
        ランキング
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="hidden" overflowY="hidden">
        <Flex align="center" as="ul" direction="column" justify="center">
          {[...Array(5)].map((_, index) => (
            <RankingCardSkeleton key={index} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const ReleaseSection: React.FC = () => {
  const todayStr = getDayOfWeekStr(new Date());

  const { data: release } = useRelease({ params: { dayOfWeek: todayStr } });

  const todayA11yId = useId();

  return (
    <Box aria-labelledby={todayA11yId} as="section" maxWidth="100%" width="100%">
      <Text as="h2" color={Color.MONO_100} id={todayA11yId} typography={Typography.NORMAL20} weight="bold">
        本日更新
      </Text>
      <Spacer height={Space * 2} />
      <Box maxWidth="100%" overflowX="scroll" overflowY="hidden">
        <Flex align="stretch" gap={Space * 2} justify="flex-start">
          {release.books.map((book) => (
            <BookCard key={book.id} book={book} bookId={book.id} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

const TopPage: React.FC = () => {
  return (
    <Flex align="flex-start" direction="column" gap={Space * 2} justify="center" pb={Space * 2}>
      <Box as="header" maxWidth="100%" width="100%">
        <CoverSection />
      </Box>
      <Box as="main" maxWidth="100%" width="100%">
        <Suspense fallback={<FeatureSkeleton />}>
          <FeatureSection />
        </Suspense>

        <Spacer height={Space * 2} />

        <Suspense fallback={<RankingSkeleton />}>
          <RankingSection />
        </Suspense>

        <Spacer height={Space * 2} />

        <Suspense fallback={null}>
          <ReleaseSection />
        </Suspense>
      </Box>
    </Flex>
  );
};

const TopPageWithSuspense: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <TopPage />
    </Suspense>
  );
};

export { TopPageWithSuspense as TopPage };
