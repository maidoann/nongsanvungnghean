import { get,post,patch} from '../../utils/request';
const url = 'api/v1/admin/category/'
export const getCateTree = async () => {
  const result = await get(url+'create');
  return result;
};
export const getCateList = async (filter = {}) => {
  const queryString = new URLSearchParams(filter).toString(); // build query string
  const fullUrl = queryString ? `${url}?${queryString}` : url;
  console.log(fullUrl);
  
  const result = await get(fullUrl);
  return result;
};

export const createCate = async (data) => {
  const result = await post((url+'createpost'),data);
  return result;
};

export const softDeleteCate = async (id) => {
  const result = await patch(`${url}delete/${id}`);
  return result;
};