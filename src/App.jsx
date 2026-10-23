import { createRoot } from 'react-dom/client';
import { router } from './router';
import { store } from './store';

const root = document.getElementById('root');
const appRoot = createRoot(root);

appRoot.render(
  <router />
);

export default App;