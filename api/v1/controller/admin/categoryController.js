const Category = require('../../models/Category');
const paginationHelper = require('../../../../helpers/paginationHelper');
const searchHelper = require('../../../../helpers/searchHelper')
const createTree = require('../../../../helpers/createTree')
const generateUniqueSlugHelper = require('../../../../helpers/generateUniqueSlug');


module.exports.index = async (req, res) => {
    try {
        let find = {
            deleted: false
        };

        //search keyword
        if (req.query.keyword) {
            regex = searchHelper(req.query);
            console.log("regex" + regex);

            find.name = regex;
        }
        //end search keyword

        //sort
        let sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue
        }
        //end sort


        //pagination
        const countCategory = await Category.countDocuments(find);
        let pagination = {
            currentPage: 1,
            limitItems: 2
        }
        pagination = paginationHelper(pagination, req.query, countCategory)
        //pagination

        const categories = await Category.find(find)
            .limit(pagination.limitItems)
            .skip(pagination.skipItems)
            .sort(sort);
        res.status(201).json({
            message: "Lấy danh sách thể loại thành công",
            data: categories
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }
}

module.exports.create = async (req, res) => {
    try {

        const categories = await Category.find({
            deleted: false
        });
        const tree = createTree.tree(categories); // build dạng cây


        res.status(200).json({
            success: true,
            data: tree
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}
module.exports.createpost = async (req, res) => {
    try {

        const {
            name,
            parent_id,
            deleted
        } = req.body;
        if (req.user) {
            createdBy = req.user._id
        }else{
            return  res.status(401).json({
                    message: "Chưa xác thực người dùng"
            });
        }
        const newCategory = new Category({
            name,
            parent_id: parent_id || null,
            deleted,
            createdBy: createdBy
        })
        console.log(newCategory);

        const savedCategory = await newCategory.save();
        res.status(201).json({
            message: "Thêm thể loại thành công",
            data: savedCategory
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const categories = await Category.find({
            deleted: false
        });
        const tree = createTree.tree(categories); // build dạng cây

        const category = await Category.findOne({
            _id: id
        })

        res.status(201).json({
            message: "Load dữ liệu thành công",
            tree: tree,
            category: category

        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}

module.exports.editput = async (req, res) => {
    try {
        if (req.user) {
            updatedBy = req.user._id
        }else{
            return  res.status(401).json({
                    message: "Chưa xác thực người dùng"
            });
        }
        const {
            _id,
            name,
            parent_id,
            deleted
        } = req.body;
        let updateData = {
            parent_id,
            deleted,
            updatedBy: updatedBy
        }
        if (name) {
            updateData.name = name
            updateData.slug = await generateUniqueSlugHelper(Category, name)

        }
        const categoryUpdate = await Category.updateOne({
            _id: _id
        }, updateData)
        res.status(201).json({
            message: "Chỉnh sửa thể loại thành công",
            data: categoryUpdate
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}

module.exports.delete = async (req, res) => {
    try {
        if (req.user) {
            updatedBy = req.user._id
        }else{
            return  res.status(401).json({
                    message: "Chưa xác thực người dùng"
            });
        }
        const id = req.params.id;
        console.log(id);

        const category = await Category.updateOne({
            _id: id
        }, {
            deleted: true,
            updatedBy: updatedBy
        })

        res.status(201).json({
            message: "Xóa thể loại thành công thành công",
            category: category
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}

module.exports.deletehard = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const category = await Category.deleteOne({
            _id: id
        })

        res.status(201).json({
            message: "Xóa thể loại thành công thành công",
            category: category
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}