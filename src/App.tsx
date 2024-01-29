import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StatisticProvider } from '../src/context/StatisticContext';
import { QueryClient, QueryClientProvider } from 'react-query';

import IndexPage from './pages/index';
import DetailPage from './pages/detail';

import './App.css';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <StatisticProvider>
            {/* Provide your children components here */}
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/detail" element={<DetailPage />} />
            </Routes>
          </StatisticProvider>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
