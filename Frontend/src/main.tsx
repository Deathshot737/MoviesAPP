import ReactDOM from 'react-dom/client';
import App from './App';
import { IsOpenProvider } from './provaider/isOpenProvider';
import { AuthProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <IsOpenProvider>
      <App />
    </IsOpenProvider>
  </AuthProvider>
);