"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useTable } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Input, Space, Table, Button, Tooltip, Modal } from "antd";
import "../../../styles/globals.css";
import Filter from "../../components/components/Filter";
import React, { useEffect, useState } from "react";
import assetData from "../../utils/asset.json";
import ViewReportIssue from "../../components/components/ViewReportIssue";
import { getAllReport } from "../../components/service/report.service";
import { useSession } from "next-auth/react";
import { formatDateBC } from "../../utils/formatDate";
import Loading from "../../components/components/Loading";

export default function ReportIssue() {
    const [searchText, setSearchText] = useState("");
    const [isFilterVisible, setIsfilterVisible] = useState(false);
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { data: session } = useSession();
    const token = session?.accessToken;
    const [report, setReport] = useState([])
    const [filteredReport, setFilteredReport] = useState([]);
    const [loading, setLoading] = useState(false)


    const [filterCriteria, setFilterCriteria] = useState({
        date: "",
        condition: "",
        userId: null
      });

    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const handleSearch = (value) => {
        setSearchText(value);
        applyFilters(report, value, filterCriteria);
    };

    const handleFilterSave = (filterData) => {
        setFilterCriteria({
          date: filterData.selectedDate,
          condition: filterData.selectedCondition,
          userId: filterData.selectedUserId
        });
        setIsfilterVisible(false);
      };

    const paginationConfig = {
        pageSizeOptions: ["10", "20", "50"],
        showTotal: (total, range) => (
            <span>
                <span className="text-[#cecece]">show:</span> {range[1]} of {total}
            </span>
        ),
        onChange: (page, pageSize) => {
            if (tableProps.pagination?.onChange) {
                tableProps.pagination.onChange(page, pageSize);
            }
        },
        position: ["bottomLeft"],
        className: "custom-pagination",
    };

    const handleViewClick = (record) => {
        setSelectedRecord(record);
        setIsViewVisible(true);
    };

    const closeView = () => {
        setIsViewVisible(false);
        setSelectedRecord(null);
    };

    //filter
    const handleFilterClick = () => {
        setIsfilterVisible(true);
    };

    const closeFilter = () => {
        setIsfilterVisible(false);
    };

    const fetchReport = async () => {
        setLoading(true)
        try {
            const allReport = await getAllReport(token)
            console.log("allreport", allReport)
            const formattedReport = allReport.map((report, id) => ({
                ...report,
                id: id + 1,
                assetName: report.assetName,
                problem: report.problem,
                attachment: report.attachment,
                assignDate: formatDateBC(report.assignDate),
            }));
            setReport(formattedReport)
            applyFilters(formattedReport, searchText, filterCriteria);
        } catch (error) {
            console.error("Failed to fetch report:", error);
        } finally {
            setLoading(false);
        }
    }

    const applyFilters = (requests, searchValue, criteria) => {
        let filtered = [...requests];
    
        // Apply search filter
        if (searchValue) {
            filtered = filtered.filter((item) =>
                item.assetName?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
    
        // Apply user filter
        if (criteria.userId) {
            filtered = filtered.filter(request => {
                console.log("Filtering by userId:", {
                    requestUserId: request.userId, 
                    criteriaUserId: criteria.userId
                });
                return String(request.userId) === String(criteria.userId);
            });
        }
    
        // Apply date filter
        if (criteria.date) {
            filtered = filtered.filter(request => {
                const requestDate = new Date(request.assignDate).toLocaleDateString('en-CA'); // Local time zone date
                const filterDate = new Date(criteria.date).toLocaleDateString('en-CA');
                
                console.log("Date Filtering:", {
                    requestDate, 
                    filterDate, 
                    matches: requestDate === filterDate
                });
        
                return requestDate === filterDate;
            });
        }
        
    
        // Apply condition filter
        if (criteria.condition && criteria.condition !== "Select your condition") {
            filtered = filtered.filter(request =>
                request.condition?.toLowerCase() === criteria.condition.toLowerCase()
            );
        }
    
        console.log("Filtered Results:", filtered);
        setFilteredReport(filtered);
    };
    

    useEffect(() => {
        fetchReport()
    }, [token])

    useEffect(() => {
        applyFilters(report, searchText, filterCriteria);
      }, [filterCriteria, report]);

    const totalItems = tableProps?.pagination?.total;

    return (
        <section className={"mx-[20px] mt-[15px]"}>
            {loading ? (
                <Loading />
            ) : (
                <div className="bg-white w-full h-full p-10 rounded-xl">
                    <div className="mb-9 flex justify-between items-end">
                        <div className="flex items-center">
                            <Button
                                onClick={handleFilterClick}
                                className="!bg-[#F8FAFC] max-w-32 w-24 !h-10"
                            >
                                <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 19 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.38975 0.635418C0.52285 0.635418 -0.412097 2.98516 0.908001 4.3594L6.14678 9.81305L6.14678 14.2695C6.14678 14.9562 6.45732 15.6027 6.98498 16.0147L9.91869 18.3052C10.9548 19.1142 12.4333 18.3446 12.4333 16.9964L12.4333 9.81305L17.6721 4.3594C18.9922 2.98516 18.0572 0.635418 16.1903 0.635418H2.38975Z"
                                        fill="#737791"
                                    />
                                </svg>
                                Filter
                            </Button>
                            <Input
                                placeholder="Search categories"
                                prefix={<SearchOutlined />}
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.value)}
                                style={{ width: 350 }}
                                className="!bg-[#F8FAFC] mx-5 !h-10"
                            />
                        </div>
                    </div>
                    <Table
                        dataSource={filteredReport}
                        rowKey="id"
                        pagination={{
                            ...paginationConfig,
                            total: totalItems,
                        }}
                    >
                        <Table.Column dataIndex="id" title={"No"} width={"10px"} />
                        <Table.Column
                            dataIndex="assetName"
                            title={"Asset Name"}
                            render={(_, record) => (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img
                                        src={record.attachment}
                                        alt={record.assetName}
                                        className="w-[40px] h-[40px] rounded-xl mr-2"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-[#273240] text-[16px]">
                                            {record.assetName}
                                        </span>
                                        <span className="text-xs text-[#BCBCBC] text-[12px]">Sheee
                                            {/* {record.type} */}
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                        <Table.Column
                            dataIndex="problem"
                            title={"Problem"}
                            render={(problem) => (
                                <Tooltip title={problem}>
                                    <span
                                        className="inline-claim-1"
                                        style={{
                                            display: "inline-block",
                                            maxWidth: "250px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {problem}
                                    </span>
                                </Tooltip>
                            )}
                        />
                        <Table.Column dataIndex="assignDate" title={"Request Date"} />
                        <Table.Column
                            width={"100px"}
                            align="center"
                            title={"Action"}
                            dataIndex="action"
                            render={(_, record) => (
                                <Space>
                                    <button
                                        onClick={() => handleViewClick(record)} // Pass entire record
                                        style={{
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M2.9095 13.7126C2.56793 12.9695 2.56793 12.1122 2.9095 11.3691C4.4906 7.92927 7.96659 5.54085 12.0004 5.54085C16.0343 5.54085 19.5102 7.92928 21.0913 11.3691C21.4329 12.1122 21.4329 12.9695 21.0913 13.7126C19.5102 17.1524 16.0343 19.5408 12.0004 19.5408C7.96659 19.5408 4.4906 17.1524 2.9095 13.7126Z"
                                                stroke="#5B636D"
                                                stroke-width="2"
                                            />
                                            <path
                                                d="M15.0004 12.5408C15.0004 14.1977 13.6573 15.5408 12.0004 15.5408C10.3436 15.5408 9.00042 14.1977 9.00042 12.5408C9.00042 10.884 10.3436 9.54085 12.0004 9.54085C13.6573 9.54085 15.0004 10.884 15.0004 12.5408Z"
                                                stroke="#5B636D"
                                                stroke-width="2"
                                            />
                                        </svg>
                                    </button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            )}
            {isViewVisible && <ViewReportIssue onClose={closeView} record={selectedRecord} />}
            {isFilterVisible && <Filter onClose={closeFilter} onSave={handleFilterSave}
      initialFilters={filterCriteria}/>}
        </section>
    );
}
