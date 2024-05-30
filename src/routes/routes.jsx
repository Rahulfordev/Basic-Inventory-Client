import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import AllProducts from "../pages/AllProducts/AllProducts";
import ProductReport from "../pages/ProductReport/ProductReport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/allusers",
        element: <ProductReport />,
        // children: [
        //   {
        //     path: "hello",
        //     element: <AllProducts />,
        //   },
        // ],
      },
    ],
  },
]);

export default router;
