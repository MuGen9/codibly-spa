import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModalProvider from 'providers/ModalProvider';
import { SnackbarProvider } from 'notistack';
import MainView from 'views/main/Main';

const App = () => {
  return (
    <SnackbarProvider autoHideDuration={3000}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<MainView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </SnackbarProvider>
  );
};

export default App;
