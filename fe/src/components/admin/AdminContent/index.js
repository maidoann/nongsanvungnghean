import { Layout,Breadcrumb,theme  } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
const {Content} = Layout;

function AdminContent() {
  const breadcrumbMap = {
  admin: 'Trang quản trị',
  products: 'Sản phẩm',
  categories: 'Danh mục',
  users: 'Người dùng',
  create: 'Tạo mới',
  update: 'Cập nhật',
};

    const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);;
    // console.log(pathSegments);
    const bread = pathSegments.map((item, index) => ({
    title: breadcrumbMap[item] || item, // fallback nếu không có trong map
    
  }))
    // console.log(bread);
      
  return (
    <>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb
          items={bread}
          style={{ margin: "16px 0" }}
        />
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 1100,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </>
  );
}

export default AdminContent;
