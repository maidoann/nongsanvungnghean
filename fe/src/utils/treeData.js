export const convertToTreeData = (data)=>{
    return data.map(item => ({
    title: item.name,
    value: item.id,
    children: item.children ? convertToTreeData(item.children) : []
  }));
}