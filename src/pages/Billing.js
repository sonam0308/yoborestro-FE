import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Input,
  Select,
} from "antd";
import { useState } from "react";
import axios from "axios";

const { Option } = Select;
function Billing() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isBlocked, setIsBlocked] = useState(true);
  const [isRemoved, setIsRemoved] = useState(true);
  const [profileImage, setProfileImage] = useState();
  const [userType, setUsertype] = useState(['admin', 'bussinesOwner', 'agent', 'consumer', 'subAdmin']);
  const [onClickAdd, setOnClickAdd] = useState(false);
  const [selected, setSelected] = useState(userType[0]);
  const [data, setData] = useState([])

  const adminRegister = async() => {
    let body = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      userType: selected,
      Dob: '03/08/1998'
    }
    console.log(process.env.REACT_APP_API_BASE_PATH);
    const response = await axios.post(process.env.REACT_APP_API_BASE_PATH + 'register/user', body)
    setData(response.data)
    console.log(response.data.data);
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} className="mb-24">
              <Card
                className="header-solid h-full ant-card-p-0"
                title={
                  <>
                    <Row
                      gutter={[24, 0]}
                      className="ant-row-flex ant-row-flex-middle"
                    >
                      {/* <Col xs={24} md={12} className="d-flex"> */}
                      <Col xs={24} md={12} >
                        <Button type="primary" onClick={(e) => { setOnClickAdd(true) }}>ADD ADMIN / SUBADMIN</Button>
                      </Col>
                    </Row>
                  </>
                }
              >
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      {
        onClickAdd === true ? (
          <>
            <Form
              onSubmitCapture={adminRegister}
            >
              <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}>
                <Col span={8} className="gutter-row" >
                  <Form.Item
                    className="username"
                    label="Name"
                    name="name"
                  >
                    <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="Email"
                    name="email"
                  >
                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                  >
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="Is Removed"
                    name="isRemoved"
                  >
                    <Select
                      showSearch
                      style={{
                        width: 320,
                      }}
                      placeholder="Search to Select"
                      onChange={(e) => setIsRemoved(e)}
                    >
                      <Option value={true}>True</Option>
                      <Option value={false}>False</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="Phone"
                    name="phone"
                  >
                    <Input placeholder="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="Is Blocked"
                    name="isBlocked"
                  >
                    <Select
                      showSearch
                      style={{
                        width: 320,
                      }}
                      placeholder="Search to Select"
                      onChange={(e) => setIsBlocked(e)}
                    >
                      <Option value={true}>True</Option>
                      <Option value={false}>False</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="ProfileImage"
                    name="profileImage"
                  >
                    <Input placeholder="ProfileImage" type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={8} className="gutter-row">
                  <Form.Item
                    className="username"
                    label="User Type"
                    name="selected"
                  >
                    <Select
                      showSearch
                      style={{
                        width: 320,
                      }}
                      placeholder="Search to Select"
                      value={selected}
                      onChange={(e) => setSelected(e)}
                    >
                      {
                        userType && userType.map(type => (
                          <>
                            <Option value={type}>{type}</Option>
                          </>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Button type="primary" onClick={adminRegister}>SUBMIT</Button>
          </>
        ) : ('')
      }
    </>
  );
}

export default Billing;
