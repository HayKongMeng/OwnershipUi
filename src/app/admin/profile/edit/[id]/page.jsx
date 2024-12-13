"use client";

import { Avatar, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUserById, updateOwnProfile } from "../../../../components/action/UserAction";
import dayjs from "dayjs";
import { uploadImages } from "../../../../components/service/file.service";

export default function CategoryEdit() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const token = session?.accessToken;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleProfileUpdate = async (formData) => {
    try {
      let attachmentUrl = user?.profileImg;
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        const res = await uploadImages(imageFormData);
        attachmentUrl = res.payload.fileUrl;
      }

      const updatePayload = {
        full_name: formData.full_name,
        gender: formData.gender,
        phone_number: formData.phone_number,
        address: formData.address,
        dob: formData.dob?.format('YYYY-MM-DD'),
        place_of_birth: formData.place_of_birth,
        description: formData.description,
        profile_img: attachmentUrl
      };

      await updateOwnProfile(token, updatePayload);
      router.push(`/admin/profile/show/${id}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        try {
          const userDetails = await getUserById(token, id);
          setUser(userDetails);
          form.setFieldsValue({
            full_name: userDetails.fullName,
            gender: userDetails.gender,
            phone_number: userDetails.phoneNumber,
            address: userDetails.address,
            place_of_birth: userDetails.placeOfBirth,
            description: userDetails.description,
            dob: userDetails?.dob ? dayjs(userDetails.dob) : null,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [id, form, token]);

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

        <Form 
          form={form} 
          layout="vertical" 
          className="w-full"
          onFinish={handleProfileUpdate}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#344054" }}>Full Name</span>}
                name="full_name"
                rules={[
                  { required: true, message: "Full name is required" },
                  {
                    validator: (_, value) =>
                      value && !/^\s/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error("Full name cannot start with a space")),
                  },
                  {
                    max: 20,
                    message: "Full name cannot exceed 20 characters",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your full name"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Gender</span>}
                name="gender"
                rules={[{ required: true, message: "Gender is required" }]}
              >
                <Select
                  placeholder="Select your gender"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                >
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Phone Number</span>}
                name="phone_number"
                rules={[
                  { required: true, message: "Phone number is required" },
                  {
                    validator: (_, value) => {
                      if (value && /^\s/.test(value)) {
                        return Promise.reject(new Error("Phone number cannot start with a space"));
                      }
                      if (value && !/^[0-9]+$/.test(value)) {
                        return Promise.reject(new Error("Phone number must contain only numbers"));
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    max: 11,
                    message: "Phone number cannot exceed 11 digits",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your phone number"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Address</span>}
                name="address"
                rules={[
                  { required: true, message: "Address is required" },
                  {
                    validator: (_, value) =>
                      value && !/^\s/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error("Address cannot start with a space")),
                  },
                  {
                    max: 150,
                    message: "Address cannot exceed 150 characters",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your address"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#344054" }}>Date of Birth</span>}
                name="dob"
                rules={[
                  { required: true, message: "Date of birth is required" },
                  {
                    validator: (_, value) => {
                      const today = new Date();
                      const birthDate = value?.toDate();
                      if (!birthDate) return Promise.resolve();
                      
                      let age = today.getFullYear() - birthDate.getFullYear();
                      const month = today.getMonth() - birthDate.getMonth();

                      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }

                      if (age < 6) {
                        return Promise.reject(new Error("You must be at least 6 years old"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
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
                rules={[
                  { required: true, message: "Place of birth is required" },
                  {
                    validator: (_, value) =>
                      value && !/^\s/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error("Place of birth cannot start with a space")),
                  },
                  {
                    max: 50,
                    message: "Place of birth cannot exceed 50 characters",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your place of birth"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#344054" }}>Description</span>}
                name="description"
                rules={[
                  { required: true, message: "Description is required" },
                  {
                    validator: (_, value) =>
                      value && !/^\s/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error("Description cannot start with a space")),
                  },
                  {
                    max: 150,
                    message: "Description cannot exceed 150 characters",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter your Description"
                  className="bg-[#F8FAFC] text-gray-900 text-sm rounded-lg block w-full p-2.5 placeholder:text-[#B8BCCA] dark:text-white border-none focus:border-none focus:ring-0"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <div className="flex justify-end gap-4">
            <Link
              href={`/admin/profile/show/${id}`}
              className="w-[170px] text-[#344054] focus:outline-none font-semibold border-[1px] rounded-lg hover:text-text-[#344054] text-sm inline-flex items-center px-14 py-2.5 text-center"
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