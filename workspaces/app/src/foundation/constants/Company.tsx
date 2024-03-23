import { useAsync } from 'react-use';

export const Company: React.FC = () => {
  const { loading, value } = useAsync(async () => {
    const response = await fetch('/assets/text/Company.txt');
    const company = await response.text();

    return company;
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <>{value}</>;
};
