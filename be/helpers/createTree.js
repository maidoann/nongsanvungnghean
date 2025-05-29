let count = 0;

const createTree = (arr, parentId = null) => {
    const tree = [];

    arr.forEach((item) => {
        const itemParentId = item.parent_id ? item.parent_id.toString() : null;
        const currentParentId = parentId ? parentId.toString() : null;

        if (itemParentId === currentParentId) {
            count++;
            const newItem = { ...item._doc }; // Lấy dữ liệu gốc từ mongoose doc
            newItem.index = count;
            newItem.id = item._id.toString(); // đảm bảo có id dạng chuỗi
            const children = createTree(arr, item._id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });

    return tree;
};

module.exports.tree = (arr, parentId = "") => {
    count = 0;
    const tree = createTree(arr, parentId = "");
    return tree;
};
