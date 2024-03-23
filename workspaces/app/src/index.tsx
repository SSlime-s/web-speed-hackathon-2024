import { Dialog } from './foundation/components/Dialog';
import { GlobalStyle } from './foundation/styles/GlobalStyle';
export { Router, routes } from './routes';

export const ClientApp: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Dialog />
    </>
  );
};
