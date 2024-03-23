import { useAsync } from 'react-use';

export const Question: React.FC = () => {
  const { loading, value } = useAsync(async () => {
    const response = await fetch('/assets/text/Question.txt');
    const question = await response.text();

    return question;
  });

  if (loading) {
    return <>Loading...</>;
  }

  return <>{value}</>;
};
