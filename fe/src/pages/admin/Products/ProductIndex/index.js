import { useEffect, useState } from "react";
import { getProductList } from "../../../../services/admin/productService";

function ProductIndex() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getProductList();

        console.log("Dữ liệu trả về:", result);
        setProducts(result.products);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    getData();
  }, []);
  return(
    <>
    
    </>

  );
}

export default ProductIndex;
