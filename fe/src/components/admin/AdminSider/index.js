import { Layout, Menu ,theme} from "antd";
import {
  UserOutlined,
  UnorderedListOutlined,
  ApartmentOutlined,CarryOutOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to = "/admin/users">Người dùng</Link>,
  },
  {
    key: "2",
    icon: <CarryOutOutlined />,
    label: <Link to = "/admin/orders">Đơn hàng</Link>,
  },
  {
    key: "3",
    icon: < ApartmentOutlined/>,
    label: <Link to = "/admin/products">Sản phẩm</Link>,
  },
  {
    key: "4",
    icon: < UnorderedListOutlined/>,
    label: <Link to = "/admin/categories">Danh mục</Link>,
  },
];
function AdminSider() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={menuItems}
        />
      </Sider>
    </>
  );
}

export default AdminSider;
