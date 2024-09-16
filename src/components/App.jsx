import css from './App.module.css';
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from '../redux/campersSlice';
import { getCampers } from '../redux/camperOps';
import CamperFeatures from './CamperFeatures/CamperFeatures.jsx';
import CamperReviews from './CamperReviews/CamperReviews.jsx';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import('../pages/CatalogPage/CatalogPage.jsx'));
const CamperDetailsPage = lazy(() =>
  import('../pages/CamperDetailsPage/CamperDetailsPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage/NotFoundPage.jsx')
);

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getCampers());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<CamperDetailsPage />}>
            <Route path="features" element={<CamperFeatures />} />
            <Route path="reviews" element={<CamperReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
