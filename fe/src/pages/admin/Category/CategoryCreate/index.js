import { Button, Col, Form, Input, Row, TreeSelect } from "antd";
import { useEffect, useState } from "react";
import {
  getCateTree,
  createCate,
} from "../../../../services/admin/categoryService";
import { useNavigate } from "react-router-dom";
import { convertToTreeData } from "../../../../utils/treeData";

function CategoryCreate() {
  const [treeCate, setTreeCate] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getCateTree();

        const treeCateData = convertToTreeData(result.data);
        setTreeCate(treeCateData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await createCate(values);
      console.log("Tạo danh mục thành công:", response);
      navigate('/admin/categories');
    } catch (error) {
      console.error("Lỗi khi tạo danh mục:", error);
    }
  };
  return (
    <>
      <h2>Thêm danh mục mới</h2>

      <Row style={{ width: "100%" }}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          style={{ width: "90%" }}
          name="create-category"
          onFinish={handleSubmit}
        >
          <Form.Item name="name" label="Tên danh mục">
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>

          <Form.Item name="parent_id" label="Danh mục cha">
            <TreeSelect treeData={treeCate} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

export default CategoryCreate;
