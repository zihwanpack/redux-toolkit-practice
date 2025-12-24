import { Provider } from 'react-redux';
import { CartItemsPage } from './pages/CartItemsPage.tsx';
import { store } from './redux/store.ts';

function App() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <CartItemsPage />
      </main>
    </Provider>
  );
}

export default App;
