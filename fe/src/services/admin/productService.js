import { get ,postFormData } from '../../utils/request';
const url = 'api/v1/admin/'
export const getProductList = async () => {
  const result = await get(url+'products');
  return result;
};

export const createProduct = async (formData) => {
  const result = await postFormData((url+'products/create'), formData);
  return result;
};