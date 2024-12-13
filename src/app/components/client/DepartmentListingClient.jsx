"use client";

import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useTable } from "@refinedev/antd";
import { Input, Space, Table, Button} from "antd";
import Image from "next/image";
import "../../../styles/globals.css";
import UpdateDepartment from "../../components/components/UpdateDepartment";
import CreateDepartment from "../../components/components/CreateDapartment";
import DeleteDepartmentPopup from "../../components/components/DeleteDepartmentPopup";
import DeletePop from "../../components/app-icon/trash-pop.svg";
import EditIcon from "../../components/app-icon/edit-icon.svg";
import { getAllDepartment } from "../service/department.service";
import { useSession } from "next-auth/react";
import formatDate from "../../utils/formatDate";
import { getDepartmentById } from "../action/DepartmentAction";

const DepartmentClient = () => {

    const { data: session } = useSession();
    const token = session?.accessToken;

    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [department, setDepartments] = useState([])
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); 
    const [filteredDepartment, setFilteredDepartment] = useState([]);

    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1); 
    };

    const { tableProps } = useTable({
        resource: "department",
        syncWithLocation: true,
        onSearch: searchText
            ? [
                {
                    field: "dep_name",
                    operator: "contains",
                    value: searchText,
                },
            ]
            : [],
        pagination: {
            pageSize: 10,
        },
    });



    const paginationConfig = {
        pageSize: 10,
        current: page,
        total: totalItems,
        onChange: (newPage) => setPage(newPage),
        showTotal: (total, range) => (
            <span>
                <span className="text-[#cecece]">show:</span> {range[1]} of {total}
            </span>
        ),
        position: ["bottomLeft"],
        className: "custom-pagination",
    };

    const handleCreateClick = () => setIsCreateVisible(true);
    const closeCreate = () => setIsCreateVisible(false);

    const handleAddDepartment = (newDepartment, rollbackId = null) => {
        if (rollbackId) {
            setDepartments((prev) => prev.filter((dept) => dept.id !== rollbackId));
            setFilteredDepartment((prev) => prev.filter((dept) => dept.id !== rollbackId));
        } else {
            setDepartments((prev) => [...prev ,newDepartment]);
            setFilteredDepartment((prev) => [...prev ,newDepartment]);
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        const filteredData = department.filter((dep) =>
          dep.dep_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDepartment(filteredData); 
      };


    const fetchDepartments = async () => {
        try {
            if (token) {
                const allDepartment = await getAllDepartment(token, page);
    
                const formattedDepartments = allDepartment.map((dept, index) => ({
                    ...dept,
                    id: (page - 1) * 10 + index + 1,
                    created_at: formatDate(dept.created_at),
                    updated_at: formatDate(dept.updated_at),
                }));
    
                setDepartments(formattedDepartments);
                setFilteredDepartment(formattedDepartments);
    
                if (allDepartment.length < 10) {
                    setTotalItems((page - 1) * 10 + allDepartment.length);
                } else {
                    setTotalItems((prevTotal) => Math.max(prevTotal, page * 10 + 10));
                }
            } else {
                console.warn("No token found");
            }
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };
    
    

    useEffect(() => {
        fetchDepartments();
    }, [token, page,refreshTrigger]);

    const handleEditClick = async (dep_id) => {
        const departmentId = await getDepartmentById(token, dep_id);
        setSelectedDepartment(departmentId);
        setIsUpdateVisible(true);
    };

    const handleDeleteClick = async (dep_id) => {
        console.log("dep",dep_id)
        const originalDepartments = [...department];
        setSelectedDepartment(dep_id)
        console.log("work",selectedDepartment)
        
    
        try {
            await getDepartmentById(token, dep_id);
            setIsDeleteVisible(true);
        } catch (error) {
            console.error("Error deleting department:", error);
            setDepartments(originalDepartments);
            setFilteredDepartment(originalDepartments);
        }
    };
    
    
    const closeDelete = () => {
        setIsDeleteVisible(false);
        handleRefresh(); 
    };

    const closeUpdate = () => {
        setIsUpdateVisible(false);
        handleRefresh(); 
    };

    

    return (
        <section className={"mx-[20px] mt-[15px]"}>
            <div className="bg-white w-full h-full p-10 rounded-xl ">
                <div className="flex justify-between mb-10">
                    <Input
                        placeholder="Search categories"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 350, margin: 0 }}
                        className="!bg-[#F8FAFC] mx-5 !h-10"
                    />
                    <Button
                        onClick={handleCreateClick}
                        className="!bg-[#4B68FF] !text-white !font-semibold w-36 !h-10"
                    >
                        Create New
                        <svg
                            width="22"
                            height="23"
                            viewBox="0 0 22 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.0005 0.968754C5.11904 0.968754 0.345703 5.74742 0.345703 11.6354C0.345703 17.5234 5.11904 22.3021 11.0005 22.3021C16.8819 22.3021 21.6552 17.5234 21.6552 11.6354C21.6552 5.74742 16.8819 0.968754 11.0005 0.968754ZM16.3278 12.7021H12.0659V16.9688H9.93499V12.7021H5.67308V10.5688H9.93499V6.30209H12.0659V10.5688H16.3278V12.7021Z"
                                fill="white"
                            />
                        </svg>
                    </Button>
                </div>
                <Table
                    dataSource={filteredDepartment}
                    rowKey="dep_id"
                    pagination={paginationConfig}
                >
                    <Table.Column dataIndex="id" title={"No"} width={"15%"} />
                    <Table.Column dataIndex="dep_name" title={"Department Name"} width={"22.25%"} />
                    <Table.Column dataIndex="description" title={"Description"} width={"22.25%"} />
                    <Table.Column dataIndex="created_at" title={"Create At"} width={"22.25%"} />
                    <Table.Column dataIndex="updated_at" title={"Last Update"} width={"25.25%"} />
                    <Table.Column
                        width={"100px"}
                        title={"Actions"}
                        dataIndex="actions"
                        render={(_, record) => (
                            <Space>
                                <button
                                    onClick={() => handleEditClick(record.dep_id)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                >
                                    <Image src={EditIcon} alt={"edit-icon"} />
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(record.dep_id)}
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                >
                                    <Image src={DeletePop} alt={"delete-icon"} />
                                </button>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            {isCreateVisible && <CreateDepartment onClose={closeCreate} onAddDepartment={handleAddDepartment} departments={department}/>}
            {isDeleteVisible && <DeleteDepartmentPopup onClose={closeDelete} dep_id={selectedDepartment} onUpdate={handleDeleteClick}/>}
            {isUpdateVisible && <UpdateDepartment onClose={closeUpdate} dep_id={selectedDepartment?.dep_id} onUpdate={handleRefresh} />}
        </section>
    );
}

export default DepartmentClient;