import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Pricing from './Pages/Pricing';
import Product from './Pages/Product';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import AppLayout from './Pages/AppLayout';
import { useEffect, useState } from 'react';
import CityList from './components/CityList';

const BASE_URL = 'http://localhost:8000';

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error('There is error in fetching cities...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='product' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route path='app' element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path='cities'
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route path='countries' element={<p>Countries</p>} />
            <Route path='form' element={<p>Form</p>} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
