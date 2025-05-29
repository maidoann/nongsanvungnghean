import { Layout, Avatar, Input } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import logo from '../../../images/logo.png';
import "./AdminHeader.css"
const { Header } = Layout;
function AdminHeader() {
  return (
    <>
      <Header className='admin-header'>
      <div className='header-logo'>
        <img src={logo} alt='logo' />
      </div>

      <div className='header-center'>
        <Input
          className='search-input'
          placeholder='Tìm kiếm...'
          prefix={<SearchOutlined />}
          allowClear
        />
      </div>

      <div className='header-user'>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </Header>
    </>
  );
}

export default AdminHeader;
