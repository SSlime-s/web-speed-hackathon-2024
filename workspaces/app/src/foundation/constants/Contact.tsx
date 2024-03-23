import { useAsync } from 'react-use';

export const Contact: React.FC = () => {
  const { loading, value } = useAsync(async () => {
    const response = await fetch('/assets/text/Contact.txt');
    const contact = await response.text();

    return contact;
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <>{value}</>;
};
