"use client";

import { Avatar, Col, DatePicker, Form, Input, Row, Spin } from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getOwnProfile, getUserById, updateOwnProfile } from "../../../../components/action/UserAction";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { uploadImages } from '../../../../components/service/file.service';

export default function CategoryEdit() {
  const { formProps, saveButtonProps } = useForm({});
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const { reset, register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleProfileUpdate = async (data) => {

    try {
      let attachmentUrl = user?.profileImg;
      if (file) {

        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadImages(formData);

        attachmentUrl = res.payload.fileUrl;

      }
      const updatePayload = {
        full_name: data.full_name,
        gender: data.gender,
        phone_number: data.phone_number,
        address: data.address,
        dob: data.dob?.format('YYYY-MM-DD'),
        place_of_birth: data.place_of_birth,
        description: data.description,
        profile_img: attachmentUrl
      };
      await updateOwnProfile(token, updatePayload);
      router.push(`/user/profile/show/${id}`)
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        try {
          const userDetails = await getOwnProfile(token);
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
  }, id);

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
      <Row gutter={24}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <label htmlFor="profile-image-upload" className="cursor-pointer">
              <Avatar
                size={84}
                src={
                  previewImage ||
                  user.profileImg ||
                  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                }
              />
            </label>
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <Form form={form} layout="vertical" className="w-full"
          initialValues={{
            full_name: user.fullName,
            gender: user.gender,
            phone_number: user.phoneNumber,
            address: user.address,
            place_of_birth: user.placeOfBirth,
            description: user.description,
            dob: user?.dob ? dayjs(user.dob) : null,
          }}
          onFinish={handleProfileUpdate}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#344054" }}>Full Name</span>}
                name="full_name"
              >
                <Input
                  {...register('full_name')}
                  placeholder="Enter your full name"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Gender</span>}
                name="gender"
              >
                <Input
                  {...register('gender')}
                  placeholder="Enter your gender"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Phone Number</span>}
                name="phone_number"
              >
                <Input
                  {...register('phone_number')}
                  placeholder="Enter your phone number"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Address</span>}
                name="address"
              >
                <Input
                  {...register('address')}
                  placeholder="Enter your address"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>
            </Col>

            {/* Right Grid */}
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#344054" }}>Date of Birth</span>}
                name="dob"
              >
                <DatePicker
                  placeholder="Select date"
                  style={{ width: "100%", backgroundColor: "#F8FAFC" }}
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Place of Birth</span>}
                name="place_of_birth"
              >
                <Input
                  {...register('place_of_birth')}
                  placeholder="Enter your place of birth"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Description</span>}
                name="description"
              >
                <Input.TextArea
                  {...register('description')}
                  placeholder="Enter your Description"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-4">
            <Link to="/admin/user"
              type="button"
              className="w-[170px] text-[#344054] focus:outline-none font-semibold border-[1px] rounded-lg hover:text-text-[#344054] text-sm inline-flex items-center px-14 py-2.5 text-center"
              href={`/user/profile/show/${id}`}
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-[170px] bg-[#14AE5C] text-white font-semibold rounded-lg hover:text-white text-sm inline-flex items-center px-8 py-2.5 text-center"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </Row>
    </div>
  );
}