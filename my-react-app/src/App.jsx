import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loginUser } from './Auth/authSlice';  
import 'react-toastify/dist/ReactToastify.css';
import DefaultLayout from './layout/DefaultLayout';
import { FetchProducts } from './api/FetchProducts';

const Header = React.lazy(() => import('./components/Header/header'));
const Home = React.lazy(() => import('./components/Index'));
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
  const { isLoggedIn, role, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && !isLoggedIn) {
      // If the token exists but the user is not logged in yet, restore the login state
      const email = localStorage.getItem('username');
      const storedRole = localStorage.getItem('role');
      dispatch(loginUser({ email, password: 'restoredSession' }));  // Replace password logic for token restoration
    }
  }, [dispatch, isLoggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;  // Add a proper loader if needed
  }

  const routes = [
    { path: '/Index', component: Index, allowedRoles: ['admin'] },
    { path: '/Inventory', component: Inventory, allowedRoles: ['admin'] },
    { path: '/Reports', component: Report, allowedRoles: ['admin'] },
    { path: '/Orders', component: Orders, allowedRoles: ['admin'] },
    { path: '/Inventory/product/:id', component: ProductInfo, allowedRoles: ['admin'] },
    { path: '/Suppliers', component: Suppliers, allowedRoles: ['admin'] },
    { path: '/search-results', component: SearchResults, allowedRoles: ['admin', 'user'] },
    { path: '/', component: Index, allowedRoles: ['admin'] },
    { path: '/', component: UserHome, allowedRoles: ['user'] },
    { path: '/product/:id', component: ProductPage, allowedRoles: ['user'] },
  ];

  return (
    <FetchProducts>
      <Router>
        <div className="App">
          <DefaultLayout role={role} sessionExpired={!isLoggedIn}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/signin/" element={<Signin />} />
                <Route path="*" element={<Error />} />
                {routes.map(({ path, component: Component, allowedRoles }) => (
                  allowedRoles.includes(role) ? (
                    <Route key={path} path={path} element={<Component />} />
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
