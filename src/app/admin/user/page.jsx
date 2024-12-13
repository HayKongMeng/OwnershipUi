"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import "../../../styles/globals.css";
import { useEffect, useState } from "react";
import CreateUser from "../../components/components/CreateUser";
import Card from "../../components/components/Card";
import userMockData from "../../utils/userMockData.json";
import { getAllUser } from "../../components/service/user.service";
import { useSession } from "next-auth/react";

export default function User() {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const handleCreateClick = () => {
    setIsCreateVisible(true);
  };

  const closeCreate = () => {
    setIsCreateVisible(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = users.filter((user) =>
      user.fullName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };


  const handleViewClick = (userId) => {
    console.log("userid", userId)
    router.push(`/admin/user/${userId}`);
  };

  const fetchUser = async () => {
    const allUser = await getAllUser(token)
    console.log("allUser", allUser)
    setUsers(allUser)
    setFilteredUsers(allUser)
  }

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <section className={"mx-[20px] mt-[15px]"}>
      <div className="bg-white w-full h-full p-10 rounded-xl">
        <div className="flex justify-between mb-10">
          <Input
            placeholder="Search categories"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 350, margin: 0 }}
            className="!bg-[#F8FAFC] mx-5 !h-10"
          />
          <Button onClick={handleCreateClick} className="!bg-[#4B68FF] !text-white !font-semibold w-36 !h-10">
            Create New
            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0005 0.968754C5.11904 0.968754 0.345703 5.74742 0.345703 11.6354C0.345703 17.5234 5.11904 22.3021 11.0005 22.3021C16.8819 22.3021 21.6552 17.5234 21.6552 11.6354C21.6552 5.74742 16.8819 0.968754 11.0005 0.968754ZM16.3278 12.7021H12.0659V16.9688H9.93499V12.7021H5.67308V10.5688H9.93499V6.30209H12.0659V10.5688H16.3278V12.7021Z" fill="white" />
            </svg>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              onClick={() => handleViewClick(user.userId)}
              id={user.userId}
              profileImg={user.profileImg}
              fullName={user.fullName}
              department={user.department ? user.department.dep_name : "N/A"}
            // record={selectedRecord}
            />
          ))}
        </div>
      </div>
      {isCreateVisible && <CreateUser onClose={closeCreate} />}
    </section>
  );
}
