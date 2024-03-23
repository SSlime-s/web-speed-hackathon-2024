import { useAsync } from 'react-use';

export const Overview: React.FC = () => {
  const { loading, value } = useAsync(async () => {
    const response = await fetch('/assets/text/Overview.txt');
    const overview = await response.text();

    return overview;
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <>{value}</>;
};
