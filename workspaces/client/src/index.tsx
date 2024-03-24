// import './side-effects';

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SWRConfig } from 'swr';

import { AdminApp } from '@wsh-2024/admin/src/index';
import { ClientApp, routes } from '@wsh-2024/app/src/index';

import { preloadImages } from './utils/preloadImages';
import { registerServiceWorker } from './utils/registerServiceWorker';

const router = createBrowserRouter(routes);

function documentReady(fn: () => void) {
  function handler() {
    document.removeEventListener('DOMContentLoaded', handler);
    window.removeEventListener('load', handler);
    fn();
  }

  if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', handler);
    window.addEventListener('load', handler);
  }
}

const main = async () => {
  await registerServiceWorker();
  // await preloadImages();

  function handler() {
    if (window.location.pathname.startsWith('/admin')) {
      ReactDOM.createRoot(document.getElementById('root')!).render(<AdminApp />);
    } else {
      ReactDOM.hydrateRoot(
        document.getElementById('root')!,
        <SWRConfig value={{ revalidateIfStale: true, revalidateOnFocus: false, revalidateOnReconnect: false }}>
          <ClientApp />
          <RouterProvider router={router} />
        </SWRConfig>,
      );
    }
  }

  documentReady(handler);
};

main().catch(console.error);
