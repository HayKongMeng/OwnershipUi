"use client";

import { UploadOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Typography, Modal } from "antd";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getAsset } from "../../../../components/service/asset.service";
import { formatDateBC } from "../../../../utils/formatDate";
import { getUserById } from "../../../../components/action/UserAction";
import Loading from "../../../../components/components/Loading";

const { Title } = Typography;


export default function CategoryShow() {
    const { formProps, form } = useForm();
    const { id } = useParams();
    const { data: session } = useSession();
    const token = session?.accessToken;
    const [loading, setLoading] = useState(false)
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [asset, setAsset] = useState(null)

    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const getUser = await getAsset(token, id);
                setAsset(getUser);
    
                form.setFieldsValue({
                    assetName: getUser.asset_name || "",
                    quantity: getUser.qty || 0,
                    unit: getUser.unit || "",
                    
                    condition: getUser.condition || "",
                    assignedDate: formatDateBC(getUser.created_at) || "",
                    attachment: getUser.attachment || "null",
                });
    
                if (getUser.assign_to) {
                    const fetchedUser = await getUserById(token, getUser.assign_to);
                    form.setFieldsValue({
                        assignTo: fetchedUser.fullName || "Unassigned",
                    })
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }   finally {
                setLoading(false)
              }
        };
    
        fetchData();
    }, [token, id]);


    const handlePreview = () => {
        setPreviewImage(asset?.attachment);
        setPreviewVisible(true);
    };

    return (
        <section className={"mx-[20px]"}>
            {loading ? (
          <Loading />
        ) : (
            <Form {...formProps} form={form} layout="vertical">
                <Create title={""}>
                    <div className="leading-loose">
                        <Title level={2} className="text-[18px] text-[#151D48] font-semibold">View Asset</Title>
                        <p className="text-[#6F6C90]">View detailed asset information</p>
                    </div>
                    <hr className="border-[#3D7EDF] opacity-[30%]" />
                    <div className="flex gap-10 mt-5">
                        <div className="flex-1">
                            <Form.Item label={<span style={{ color: "#344054" }}>Asset Name</span>} name="assetName">
                                <Input readOnly style={{ color: "#273240" }} />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: "#344054" }}>Qty</span>} name="quantity">
                                <Input readOnly type="number" style={{ color: "#273240" }} />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: "#344054" }}>Unit</span>} name="unit">
                                <Input readOnly style={{ color: "#273240" }} />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: "#344054" }}>Assign To</span>} name="assignTo">
                                <Input readOnly style={{ color: "#273240" }} />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: "#344054" }}>Condition</span>} name="condition">
                                <Input readOnly style={{ color: "#273240" }} />
                            </Form.Item>

                            <Form.Item label={<span style={{ color: "#344054" }}>Assigned Date</span>} name="assignedDate">
                                <Input readOnly style={{ color: "#273240" }} />
                            </Form.Item>
                        </div>

                        <div className="flex-1">
                            {/* <Form.Item label={<span style={{ color: "#344054" }}>Description</span>} name="description">
                                <Input.TextArea readOnly rows={5} style={{ color: "#273240" }} />
                            </Form.Item> */}

                            <Form.Item label={<span style={{ color: "#344054" }}>Attachment</span>} name="attachment">
                                {asset?.attachment ? (
                                    <div
                                        onClick={handlePreview}
                                        style={{
                                            cursor: "pointer",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={asset.attachment}
                                            alt="Attachment"
                                            style={{ maxWidth: "100%", maxHeight: "200px" }}
                                        />
                                    </div>
                                ) : (
                                    <div className="ant-upload-drag-icon">
                                        <UploadOutlined />
                                        <p>No attachment available</p>
                                    </div>
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </Create>

                <Modal
                    open={previewVisible}
                    title="Image Preview"
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                    width={900}
                >
                    <img alt="Preview" style={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "auto",
                        margin: "0 auto",
                        display: "block",
                        objectFit: "contain"
                    }} src={previewImage} />
                </Modal>
            </Form>
        )}
        </section>
    );
}
