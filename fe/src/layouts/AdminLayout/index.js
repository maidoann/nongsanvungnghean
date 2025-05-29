import {Layout,  } from 'antd';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminSider from '../../components/admin/AdminSider';
import AdminContent from '../../components/admin/AdminContent';
function AdminLayout (){

    return (
    <Layout>
      <AdminHeader/>
      <Layout>
        <AdminSider/>
        <Layout style={{ padding: '0 24px 24px' }}>
          <AdminContent/>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;