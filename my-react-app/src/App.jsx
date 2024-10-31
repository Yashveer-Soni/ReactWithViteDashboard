import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { restoreSession } from './Auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './layout/DefaultLayout';
import Spinner from './components/LoadingSpinner';
import { FetchProducts } from './api/FetchProducts';

const Inventory = React.lazy(() => import('./components/Inventory/Inventory'));
const Report = React.lazy(() => import('./components/Reports'));
const Orders = React.lazy(() => import('./components/Orders'));
const ProductInfo = React.lazy(() => import('./components/Inventory/Productinfo'));
const Suppliers = React.lazy(() => import('./components/Suppliers'));
const Signin = React.lazy(() => import('./components/Signin'));
const Error = React.lazy(() => import('./snippets/Error'));
const SearchResults = React.lazy(() => import('./components/SearchResults'));
const UserHome = React.lazy(() => import('./user/UserHome'));
const ProductPage = React.lazy(() => import('./user/ProductPage'));
const Index = React.lazy(() => import('./components/Pages/Dashboard/Index'));

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !isLoggedIn) {
      dispatch(restoreSession())
        .then(() => {
          setIsAuthChecked(true);
        })
        .catch(() => {
          setIsAuthChecked(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsAuthChecked(true);
      setIsLoading(false);
    }
  }, [dispatch, isLoggedIn]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthChecked) {
    return <div>Checking authentication...</div>;
  }

  const routes = [
    { path: '/inventory', component: Inventory, allowedRoles: ['admin'] },
    { path: '/reports', component: Report, allowedRoles: ['admin'] },
    { path: '/orders', component: Orders, allowedRoles: ['admin'] },
    { path: '/inventory/product/:id', component: ProductInfo, allowedRoles: ['admin'] },
    { path: '/suppliers', component: Suppliers, allowedRoles: ['admin'] },
    { path: '/search-results', component: SearchResults, allowedRoles: ['admin', 'user'] },
    { path: '/home', component: UserHome, allowedRoles: ['user'] },
    { path: '/dashboard', component: Index, allowedRoles: ['admin'] },
    { path: '/product/:id', component: ProductPage, allowedRoles: ['user'] },
  ];

  return (
    <FetchProducts>
      <Router>
        <div className="App">
          <DefaultLayout role={role} sessionExpired={!isLoggedIn}>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/signin/" element={<Signin />} />
                <Route path="*" element={<Error />} />
                <Route
                  path="/"
                  element={role === 'admin' ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
                />
                {routes.map(({ path, component: Component, allowedRoles }) => (
                  allowedRoles.includes(role) ? (
                    <Route key={path} path={path} element={<Component role={role} />} />
                  ) : (
                    <Route key={path} path={path} element={<Navigate to="/signin/" />} />
                  )
                ))}
              </Routes>
            </Suspense>
          </DefaultLayout>
        </div>
      </Router>
    </FetchProducts>
  );
}

export default App;
