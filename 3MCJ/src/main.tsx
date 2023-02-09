import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Context from './Context/Context'
import { HashRouter } from 'react-router-dom'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase';

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
   <Context>
        <App />
    </Context>
  </HashRouter>
);
