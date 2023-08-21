import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { Panel } from "./Panel";
import { HomeMajor, OrdersMajor } from "@shopify/polaris-icons";
import { Home } from "./Home";
import { ContextWraper } from "../staticData/MyContext";
import { Papers } from "./Papers";
import { CreatePaper } from "./CreatePaper";
import AllComp from "./AllComp";
const Routers = () => {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Home />,
    // },
    {
      path: "/*",
      element: <Panel />,
      children: panelChildren.map((item) => {
        return { path: item.path, element: item.element };
      }),
    },
  ]);
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: "Sort by",
            defaultItemSingular: "item",
            defaultItemPlural: "items",
            showing: "Showing {itemsCount} {resource}",
            Item: {
              viewItem: "View details for {itemName}",
            },
          },
          Common: {
            checkbox: "checkbox",
          },
        },
      }}
    >
      <ContextWraper>
        <RouterProvider router={router} />
      </ContextWraper>
    </AppProvider>
  );
};

export default Routers;

export const panelChildren = [
  {
    path: "exams",
    element: <Home />,
    icon: HomeMajor,
    inNav: true,
  },
  {
    path: "papers",
    element: <Papers />,
    icon: HomeMajor,
    inNav: true,
  },
  {
    path: "create_paper",
    element: <CreatePaper />,
    icon: OrdersMajor,
    inNav: true,
  },
  {
    path: "all_components",
    element: <AllComp />,
    icon: OrdersMajor,
    inNav: true,
  },
  {
    path: "*",
    element: <Home />,
    inNav: false,
  },
];
