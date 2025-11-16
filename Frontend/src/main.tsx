import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IsOpenProvider } from './provaider/isOpenProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <IsOpenProvider>
    <App />
  </IsOpenProvider>
);