import { useEffect, useState } from "react";
import AdminTable from "../../../../components/admin/AdminTable";
import {
  getCateList,
  softDeleteCate,
} from "../../../../services/admin/categoryService";
import { Popconfirm, Space, Table, Tag } from "antd";
import {
  DeleteOutlined,
  PlusSquareFilled,
  EditFilled,
} from "@ant-design/icons";
function CategoryIndex() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
  });
  const api = async (filter = {}) => {
    try {
      const result = await getCateList(filter);
      const data = result.data.map((item) => {
        return {
          key: item._id,
          name: item.name,
          parent_name: item.parent_id ? item.parent_id.name : null,
        };
      });
      setCategories(data);
      setPagination({
        current: result.pagination.currentPage,
        total: result.pagination.countProduct,
        pageSize: result.pagination.limitItems,
      });
      console.log(result);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  useEffect(() => {
    api();
  }, []);

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục cha",
      dataIndex: "parent_name",
      key: "parent_name",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <PlusSquareFilled
            style={{ color: "#52c41a", cursor: "pointer" }}
            onClick={() => handleAddSub(record)}
          />
          <EditFilled
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xóa"
            cancelText="Huỷ"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAddSub = (record) => {
    console.log("Thêm danh mục con:", record);
  };

  const handleEdit = (record) => {
    console.log("Sửa:", record);
  };

  const handleDelete = async  (key) => {
    const result = await softDeleteCate(key);
        // Nếu trang hiện tại chỉ có 1 item và đó là item đang bị xóa
    const isLastItemOnPage = categories.length === 1;
    const isNotFirstPage = pagination.current > 1;

    const newPage = isLastItemOnPage && isNotFirstPage
      ? pagination.current - 1
      : pagination.current;

    await api({ page: newPage });
    
  };
  const handleTableChange = (pagi) => {
    api({
      page: pagi.current,
    });
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={categories}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
}

export default CategoryIndex;
