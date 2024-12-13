import React from "react";
import { AppIcon } from "../app-icon/"; // Adjust path as needed

const CustomHeader = () => (
  <div className="flex items-center p-4 bg-white shadow">
    <AppIcon />
    <h1 className="ml-2 text-gray-700 font-semibold text-lg">
      Owner<span className="text-red-500">ship</span>
    </h1>
  </div>
);

export default CustomHeader;
