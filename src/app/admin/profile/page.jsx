"use client";

import { SearchOutlined } from "@ant-design/icons";
import {
  useTable,
} from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Col, Input, Menu, Row, Space, Table } from "antd";
import { Avatar, Typography, Dropdown, Button } from "antd";
import "../../../styles/globals.css"
import { useState } from "react";
import CreateUser from "../../components/components/CreateUser";
import Card from "../../components/components/Card";
export default function Department() {

  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  

  const paginationConfig = {
    // current: 1, 
    // pageSize: 10, 
    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    // position: ["bottomRight"],
    pageSizeOptions: ['10', '20', '50'],
    onChange: (page, pageSize) => {
      tableProps.pagination?.onChange(page, pageSize);
    },
  };
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  // create
  const handleCreateClick = () => {
    setIsCreateVisible(true);
  };
  const closeCreate = () => {
    setIsCreateVisible(false);
  };

  // search
  const handleSearch = (value) => {
    setSearchText(value);
    // Set filters based on search text
    setFilters([
      {
        field: "id",
        operator: "contains",
        value,
      },
    ]);
  };



  const totalItems = tableProps?.pagination?.total;

  return (
    <section className={"mx-[20px] mt-[15px]"}>
      {/* Profile Section */}
      <div className="bg-white w-full h-full p-10 rounded-xl ">
        <div className="flex justify-between mb-10">
          <Input
            placeholder="Search categories"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 350, margin:0 }}
            className="!bg-[#F8FAFC] mx-5 !h-10"
          />
          <Button onClick={handleCreateClick} className="!bg-[#4B68FF] !text-white !font-semibold w-36 !h-10">
            Create New
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0005 0.968754C5.11904 0.968754 0.345703 5.74742 0.345703 11.6354C0.345703 17.5234 5.11904 22.3021 11.0005 22.3021C16.8819 22.3021 21.6552 17.5234 21.6552 11.6354C21.6552 5.74742 16.8819 0.968754 11.0005 0.968754ZM16.3278 12.7021H12.0659V16.9688H9.93499V12.7021H5.67308V10.5688H9.93499V6.30209H12.0659V10.5688H16.3278V12.7021Z" fill="white" />
            </svg>

          </Button>
        </div>
        <Card/>
      </div>
      {isCreateVisible && <CreateUser onClose={closeCreate} />}
    </section>
  );
}
