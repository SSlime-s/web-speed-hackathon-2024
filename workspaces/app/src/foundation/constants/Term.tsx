import { useAsync } from 'react-use';

export const Term: React.FC = () => {
  const { loading, value } = useAsync(async () => {
    const response = await fetch('/assets/text/Term.txt');
    const term = await response.text();

    return term;
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <>{value}</>;
};
