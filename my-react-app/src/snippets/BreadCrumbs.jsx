import React from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react'; // Assuming you're using Iconify for icons

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean); 

  const isDashboard = paths[0] === 'dashboard'; // Check if the first path is 'dashboard'

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* Conditionally render the Home link */}
        {!isDashboard && (
          <li>
            <Link to="/" className="text-sm flex items-center gap-2 font-medium dark:text-white hover:text-blue-600">
              <Icon width={20} icon="fluent-color:home-16" />
              Home
            </Link>
          </li>
        )}

        {paths.map((path, index) => {
          const href = '/' + paths.slice(0, index + 1).join('/');
          const label = path.charAt(0).toUpperCase() + path.slice(1); 

          if (label.toLowerCase() === 'dashboard') {
            return null; 
          }

          return (
            <li key={index} className="inline-flex items-center">
              {index > -1 && (
                <svg
                  className="w-3 h-3 text-white mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 9L5 5 1 1"
                  />
                </svg>
              )}
              <Link to={href} className="text-sm font-medium dark:text-white hover:text-blue-600">
                {label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
