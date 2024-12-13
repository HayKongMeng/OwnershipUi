"use client";

import { Avatar, Card, Typography, Spin } from "antd";
import { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import Image from "next/image";
import Gender from "../../../../components/app-icon/gender.svg";
import DateOfBirth from "../../../../components/app-icon/date-of-birth.svg";
import PhoneNumber from "../../../../components/app-icon/phone-number.svg";
import DepartmentProfile from "../../../../components/app-icon/department-profile.svg";
import { useParams } from "next/navigation";
import { getUserById } from "../../../../components/action/UserAction";
import { useSession } from "next-auth/react";
import formatDate from "../../../../utils/formatDate";

const { Title } = Typography;

export default function User() {
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        setLoading(true);
        try {
          const userDetails = await getUserById(token, id);
          setUser(userDetails);
          console.log("User Details:", userDetails);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
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
    <div className="container mx-auto p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar
            size={84}
            src={
              user.profileImg ||
              "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
          />
          <div>
            <h1 className="text-lg font-semibold">{user.fullName || "N/A"}</h1>
          </div>
        </div>
      </div>


      <Card>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <div className="flex items-center gap-4">
                <Image src={Gender} alt="Gender Icon" />
                <div>
                  <span className="block text-gray-600">Gender</span>
                  <strong>{user.gender || "N/A"}</strong>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className="flex items-center gap-4">
                <Image src={DateOfBirth} alt="DOB Icon" />
                <div>
                  <span className="block text-gray-600">Date of Birth</span>
                  <strong>{user.dob ? formatDate(user.dob) : "N/A"}</strong>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className="flex items-center gap-4">
                <Image src={PhoneNumber} alt="Phone Icon" />
                <div>
                  <span className="block text-gray-600">Phone Number</span>
                  <strong>{user.phoneNumber || "N/A"}</strong>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className="flex items-center gap-4">
                <Image src={DepartmentProfile} alt="Department Icon" />
                <div>
                  <span className="block text-gray-600">Department</span>
                  <strong>{user.department?.dep_name || "N/A"}</strong>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      <div className="mt-6">
        <h3 className="mb-4 text-lg font-semibold">Other Information</h3>
        <hr className="mb-10" />
        <div className="flex flex-col gap-10 ml-10">
          <div className="flex">
            <h1 className="w-32 text-[#5B636D] text-sm font-normal">Email</h1>
            <Input
              value={user.email || "N/A"}
              className="text-[#273240] bg-[#F8FAFC]"
              readOnly
            />
          </div>
          <div className="flex">
            <h1 className="w-32 text-[#5B636D] text-sm font-normal">Place of Birth</h1>
            <Input
              value={user.placeOfBirth || "N/A"}
              className="text-[#273240] bg-[#F8FAFC]"
              readOnly
            />
          </div>
          <div className="flex">
            <h1 className="w-32 text-[#5B636D] text-sm font-normal">Address</h1>
            <Input.TextArea
              value={user.address || "N/A"}
              className="text-[#273240] bg-[#F8FAFC]"
              readOnly
            />
          </div>
          <div className="flex">
            <h1 className="w-32 text-[#5B636D] text-sm font-normal">Description</h1>
            <Input.TextArea
              value={user.description || "N/A"}
              className="text-[#273240] bg-[#F8FAFC]"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
