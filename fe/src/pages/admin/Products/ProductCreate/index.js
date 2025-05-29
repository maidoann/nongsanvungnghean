import {
  Button,
  Col,
  Form,
  Input,
  Row,
  TreeSelect,
  Upload,
  Radio,
  Select,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { getCateTree } from "../../../../services/admin/categoryService";
import { createProduct } from "../../../../services/admin/productService";
import { useNavigate } from "react-router-dom";
import { convertToTreeData } from "../../../../utils/treeData";
const { TextArea } = Input;
const { RangePicker } = DatePicker;
function ProdcutCreate() {
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
  
  const [form] = Form.useForm(); // Khai báo form instance
  const handleSubmit = async (values) => {
    form.setFields(
    form.getFieldsError().map(({ name }) => ({
      name,
      errors: [],
    }))
  );
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("category", values.category);

    formData.append("description", values.description);
    formData.append("origin", values.origin);
    formData.append("parent_id", values.parent_id);
    formData.append("sale_unit_type", values.sale_unit_type);
    formData.append("sale_unit_name", values.sale_unit_name);
    formData.append("sale_unit_price", values.sale_unit_price);
    formData.append("inventory_unit_type", values.sale_unit_type);
    formData.append("inventory_unit_name", values.sale_unit_name);

    formData.append("inventory_total_units", values.inventory_total_units);

    if (values.ratePicker && values.ratePicker.length === 2) {
      formData.append("harvest_date", values.ratePicker[0].toISOString());
      formData.append("expiration_date", values.ratePicker[1].toISOString());
    }else{
      formData.append("harvest_date", "undefined");
      formData.append("expiration_date", "undefined");
    }

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    console.log("dattaa sau khi chuyền vô form", formData);

    try {
      const res = await createProduct(formData);
      console.log(res);
      if (res.success) {
        navigate("/admin/products");
      } else {
        if (res.errors) {
          const fieldErrorArray = res.errors.map((value) => {
            return {
              name: value.field,
              errors: [value.message],
            };
          });
          console.log(fieldErrorArray);

          form.setFields(fieldErrorArray);
          //   form.setFields([
          //   {
          //     name: "name",
          //     errors: [res.message],
          //   },
          // ]);
        }
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };
  const options = [
    { label: "Khối lượng", value: "weight" },
    { label: "Thể tích", value: "volume" },
    { label: "Số lượng", value: "unit" },
  ];
  const [unitOptions, setUnitOptions] = useState([]);
  const handleChangeUnit = (values) => {
    let units = [];
    const value = values.target.value;

    if (value === "weight") {
      units = [
        {
          value: "kg",
          label: "kilogram",
        },
        {
          value: "g",
          label: "gram",
        },
      ];
    } else if (value === "volume") {
      units = [
        {
          value: "l",
          label: "Lít",
        },
        {
          value: "ml",
          label: "Milits",
        },
      ];
    } else if (value === "unit") {
      units = [
        {
          value: "Cái",
          label: "Số lượng",
        },
      ];
    }
    setUnitOptions(units);
  };
  const [fileList, setFileList] = useState([]);
  return (
    <>
      <h2>Thêm sản phẩm mới</h2>

      {/* <Row style={{ width: "100%" }}> */}
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={24}>
          {/* Nhóm bên trái */}
          <Col span={14}>
            <Form.Item name="name" label="Tên sản phẩm">
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
            <Form.Item name="category" label="Danh mục">
              <TreeSelect treeData={treeCate} />
            </Form.Item>

            <Form.Item name="origin" label="Nguồn gốc">
              <Input placeholder="Nhập nguồn gốc" />
            </Form.Item>

            <Form.Item name="sale_unit_type" label="Loại đơn vị">
              <Radio.Group
                block
                options={options}
                optionType="button"
                buttonStyle="solid"
                onChange={handleChangeUnit}
              />
            </Form.Item>
            <Form.Item name="sale_unit_name" label="Chọn đơn vị bán">
              <Select
                showSearch
                placeholder="Chọn đơn vị bán"
                optionFilterProp="label"
                // onSearch={onSearch}
                options={unitOptions}
              />
            </Form.Item>
            <Form.Item name="sale_unit_price" label="Giá sản phẩm">
              <Input placeholder="Nhập giá sản phẩm" />
            </Form.Item>
            <Form.Item
              name="inventory_total_units"
              label="Số lượng sản phẩm trong kho ( Cùng đơn vị với đơn vị bán )"
            >
              <Input placeholder="Nhập số lượng sản phẩm trong kho" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Col>

          {/* Nhóm bên phải */}
          <Col span={10}>
            <Form.Item name="description" label="Mô tả">
              <TextArea
                showCount
                maxLength={255}
                placeholder="Nhập mô tả sản phẩm"
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item
              name="ratePicker"
              label="Thời gian thu hoạch -> Hạn sử dụng"
            >
              <RangePicker placeholder={["Ngày thu hoạch", "Hạn sử dụng"]} />
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm">
              <Upload
                listType="picture-card"
                beforeUpload={() => false} // Không upload ngay, chờ submit
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                {fileList.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* </Row> */}
    </>
  );
}

export default ProdcutCreate;
