/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import { useEffect, useState } from "react";
import axios from "axios";

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
];



function Tables() {

  const [userdata , setuserdata] = useState([])
  const [usertypedata , setusertypedata] = useState([])

  const totaluserdata = async () => {
    const token = localStorage.getItem("token");
    axios.get(process.env.REACT_APP_API_BASE_PATH + "get/user" , {
      headers : {
        Authorization : token
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
    console.log(e.target.value , "value of usertype")
    const newdata = userdata && userdata.filter((ele) => {
      if (e.target.value === "all") {
        console.log("All the thinf")
         return ele
       }
       if (ele.userType === e.target.value){
          return ele
       }
    })

    setusertypedata(newdata)
  }

  useEffect(() => {
    totaluserdata()
  } , [])
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            {/* <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">ONLINE</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card> */}

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Projects Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="all">
                    <Radio.Button value="all">All</Radio.Button>
                    <Radio.Button value="agent">Agent</Radio.Button>
                    <Radio.Button value="consumer">Consumer</Radio.Button>
                    <Radio.Button value="businessOwner">Bussiness Owner</Radio.Button>
                    <Radio.Button value="admin">Admin</Radio.Button>
                    <Radio.Button value="subAdmin">SubAdmin</Radio.Button>
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
              {/* <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps}>
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
