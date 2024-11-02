import React, { useState } from 'react';
import Header from '../components/Header/header';
import Sidebar from '../components/Sidebar/index';
import UserHeader from '../user/Header/userHeader';
import Breadcrumbs from '../snippets/BreadCrumbs';
const DefaultLayout = ({ children, role, sessionExpired  }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {!sessionExpired ? (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="flex h-screen overflow-hidden">
          {role == "user" ? (
            null
          ) :<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {role == "user" ? (
              <UserHeader />
            ):
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          }
              <main>
                <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Breadcrumbs></Breadcrumbs>
                  {children}
                </div>
              </main>
            </div>
          </div>
        </div>
      ) : 
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </div>
        </main>
      }
    </>
  );
  
};

export default DefaultLayout;
