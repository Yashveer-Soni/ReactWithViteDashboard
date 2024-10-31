import React, { useState } from "react";
import OverviewComponent from "../Inventory/OverviewComponent";
import PurchasesComponent from "../Inventory/PurchasesComponent";
import AdjustmentsComponent from "../Inventory/AdjustmentsComponent";
import HistoryComponent from "../Inventory/HistoryComponent";

const Tab = ({productInfo,product_images}) => {
  const [open, setOpen] = useState("Overview");

  const handleTabOpen = (tabCategory) => {
    setOpen(tabCategory);
  };

  return (
    <>
      <section className="py-10 rounded-lg dark:bg-boxdark">
        <div className="">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mb-14 w-full">
                <div className="flex flex-col flex-wrap gap-2 px-4 py-3 dark:border-dark-3 sm:flex-row">
                  <a
                    onClick={() => handleTabOpen("Overview")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "Overview"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Overview
                  </a>
                  <a
                    onClick={() => handleTabOpen("Purchases")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "Purchases"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Purchases
                  </a>
                  <a
                    onClick={() => handleTabOpen("Adjustments")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "Adjustments"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    Adjustments
                  </a>
                  <a
                    onClick={() => handleTabOpen("History")}
                    className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                      open === "History"
                        ? "bg-primary text-white"
                        : "text-body-color hover:bg-primary hover:text-white dark:text-dark-6 dark:hover:text-white"
                    }`}
                  >
                    History
                  </a>
                </div>
                <TabContent tabCategory="Overview" open={open}>
                  <OverviewComponent productInfo={productInfo} product_images={product_images} />
                </TabContent>
                <TabContent tabCategory="Purchases" open={open}>
                  <PurchasesComponent />
                </TabContent>
                <TabContent tabCategory="Adjustments" open={open}>
                  <AdjustmentsComponent />
                </TabContent>
                <TabContent tabCategory="History" open={open}>
                  <HistoryComponent />
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tab;

const TabContent = ({ open, tabCategory, children }) => {
  return (
    <div>
      <div
        className={`p-6 text-base leading-relaxed text-body-color dark:text-dark-6 ${
          open === tabCategory ? "block" : "hidden"
        } `}
      >
        {children}
      </div>
    </div>
  );
};

