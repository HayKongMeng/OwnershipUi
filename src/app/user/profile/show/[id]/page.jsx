"use client";

import { useShow } from "@refinedev/core";
import { Avatar, Button, Card, Spin, Typography } from "antd";
import ChangePassword from "../../../../components/components/ChangePassword";
import { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import Image from "next/image";
import Gender from "../../../../components/app-icon/gender.svg"
import DateOfBirth from "../../../../components/app-icon/date-of-birth.svg"
import PhoneNumber from "../../../../components/app-icon/phone-number.svg"
import DepartmentProfile from "../../../../components/app-icon/department-profile.svg"
import { useParams, useRouter } from "next/navigation";
import { getOwnProfile, getUserById } from "../../../../components/action/UserAction";
import { useSession } from "next-auth/react";
import formatDate from "../../../../utils/formatDate";

const { Title } = Typography;

export default function User() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { id } = useParams();
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();
  // create
  const handlePopupClick = () => {
    setIsPopupVisible(true);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  
  const handleEdit = (id) => {
    console.log("edit profile", id)
    router.push(`/user/profile/edit/${id}`);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
        setLoading(true); 
        try {
          const userDetails = await getOwnProfile(token);
          setUser(userDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false); 
        }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading user details..." />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>User not found</h2>
      </div>
    );
  }


  return (
      <section className={"mx-[20px] mt-[15px]"}>
        <div className="container mx-auto p-6 bg-white shadow rounded-lg">
          {/* Profile Avatar and Name */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar
                  size={84}
                  src={user.profileImg || "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"}
              />
              <div>
                <h1 className="text-lg font-semibold">{user.fullName || "N/A"}</h1>
              </div>
            </div>
            {/* Change Password Button */}
            <div>
              <Button onClick={() => handleEdit(user.userId)} type="primary" className="!px-7 !py-5 !bg-[#14AE5C] mr-5">
                Update profile
              </Button>
              <Button onClick={handlePopupClick} type="primary" className="!px-5 !py-5 !bg-[#4B68FF]">
                Change Password
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <Card>
            <Row gutter={16}>
              <Col span={6}>
                <Card>
                  <div className="flex items-center gap-4">
                    <Image src={Gender}/>
                    <div>
                      <span className="block text-gray-600">Gender</span>
                      <strong>{user.gender ? user.gender : "N/A"}</strong>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <div className="flex items-center gap-4">
                    <Image src={DateOfBirth}/>
                    <div>
                      <span className="block text-gray-600">Date of Birth</span>
                      <strong>{formatDate(user.dob) ? formatDate(user.dob) : "N/A"}</strong>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <div className="flex items-center gap-4">
                    <Image src={PhoneNumber}/>
                    <div>
                      <span className="block text-gray-600">Phone Number</span>
                      <strong>{user.phoneNumber ? user.phoneNumber : "N/A"}</strong>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <div className="flex items-center gap-4">
                    <Image src={DepartmentProfile}/>
                    <div>
                      <span className="block text-gray-600">Department</span>
                      <strong>{user.department ? user.department.dep_name : "N/A"}</strong>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>

          {/* Other Information Form */}
          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">Other Information</h3>
            <hr className="mb-10"/>
            <div className="flex flex-col gap-10 ml-10">
              <div className="flex">
                <h1 className="w-32 text-[#5B636D]">Email</h1>
                <Input value={user.email ? user.email : "N/A"} disabled/>
              </div>
              <div className="flex">
                <h1 className="w-32 text-[#5B636D]">Place of Birth</h1>
                <Input value={user.placeOfBirth ? user.placeOfBirth : "N/A"} disabled/>
              </div>
              <div className="flex">
                <h1 className="w-32 text-[#5B636D]">Address</h1>
                <Input.TextArea value={user.address ? user.address : "N/A"}
                                disabled/>
              </div>
              <div className="flex">
                <h1 className="w-32 text-[#5B636D]">Description</h1>
                <Input.TextArea value={user.description ? user.description : "N/A"}
                                disabled/>
              </div>
            </div>
          </div>
          {isPopupVisible && <ChangePassword onClose={closePopup}/>}
        </div>
      </section>
  );
}
