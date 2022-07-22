import React from 'react'

import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    Modal,
    Space,
} from "antd";

import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Menu } from 'antd';

import { EditOutlined, EyeOutlined } from '@ant-design/icons';

const { Title } = Typography;

const formProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



function KycTable() {
    const [userdata, setuserdata] = useState([])
    const [usertypedata, setusertypedata] = useState([])
    const [modaldata, setmodaldata] = useState([]);
    const project = [
        {
            title: "Email",
            dataIndex: "email",
            width: "32%",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "UserType",
            dataIndex: "userType",
        },
        {
            title: "Actions",
            dataIndex: "action",
            render: (text, record, index) => {
                return (
                    <>
                        <EyeOutlined
                            onClick={(e) => {
                                console.log(text, record, index)
                                showModal(record)
                            }}
                        />
                    </>
                );
            },
        },
    ];

    // drop dwon
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            True
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            False
                        </a>
                    ),
                },
            ]}
        />
    )


    const totaluserdata = async () => {
        const token = localStorage.getItem("token");
        axios.get(process.env.REACT_APP_API_BASE_PATH + "get/user", {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log(res.data)
            setuserdata(res.data.data)
            setusertypedata(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onChange = (e) => {
        console.log(e.target.value, "value of usertype")
        const newdata = userdata && userdata.filter((ele) => {
            if (e.target.value === "all") {
                // console.log("All the thinf")
                return ele
            }
            if (ele.userType === e.target.value) {
                return ele
            }
        })

        setusertypedata(newdata)
    }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (record) => {
        console.log(record);
        setmodaldata(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        totaluserdata()
    }, [])

    return (
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Projects Table"
                        extra={
                            <>
                                <Radio.Group onChange={onChange} defaultValue="agent">
                                    {/* <Radio.Button value="all">All</Radio.Button> */}
                                    <Radio.Button value="agent">Agent</Radio.Button>
                                    <Radio.Button value="businessOwner">Bussiness Owner</Radio.Button>
                                </Radio.Group>
                            </>
                        }
                    >
                        <div className="table-responsive">
                            <Table
                                columns={project}
                                dataSource={usertypedata}
                                pagination={true}
                                className="ant-border-space"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Kyc Agent"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Name: {modaldata.name}</p>
                <p>Email: {modaldata.email}</p>
                <p>Phone: {modaldata.phone}</p>
                <p>kyc:  {modaldata.isBlocked === true ? "True" : "False"}</p>
                <p>userType: {modaldata.userType}</p>

                {/* <Dropdown overlay={menu} placement="boot" arrow>
                    <Button>bottomLeft</Button>
                </Dropdown> */}
                <p>Account Creations: {modaldata.createdAt}</p>


                <Space
                    size="small"
                >
                    <Button type="primary" size="">
                        verify
                    </Button>

                    <Button type="dashed" danger>
                        Reject
                    </Button>

                </Space>


            </Modal>
        </div>
    )
}

export default KycTable