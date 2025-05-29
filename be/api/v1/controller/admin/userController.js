const {
    User
} = require('../../models/User');
const paginationHelper = require('../../../../helpers/paginationHelper');
const searchHelper = require('../../../../helpers/searchHelper');
const md5 = require('md5');

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    //search keyword
    if (req.query.keyword) {
        regex = searchHelper(req.query);
        console.log("regex" + regex);

        find.username = regex;
    }
    //end search keyword

    //sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //end sort


    //pagination
    const countUser = await User.countDocuments(find);
    let pagination = {
        currentPage: 1,
        limitItems: 3
    }
    pagination = paginationHelper(pagination, req.query, countUser)
    //pagination

    const users = await User.find(find)
        .limit(pagination.limitItems)
        .skip(pagination.skipItems)
        .sort(sort);
    res.status(201).json({
        message: "Lấy dữ liệu thành công",
        data: users
    })
}
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        let findOne = {
            _id: id,
            deleted: false
        };
        const user = await User.findOne(findOne)
        if (user)
            res.json(user);
        else
            res.json({
                error: "Không tìm thấy người dùng nào"
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
        // console.log(req.body);
        if (req.user) {
            createdBy = req.user._id
        }else{
            return  res.status(401).json({
                    message: "Chưa xác thực người dùng"
            });
        }
        if (req.body) {
            let userData = {
                full_name: req.body.full_name,
                username: req.body.username,

                phone_number: req.body.phone_number,
                email: req.body.email,
                address: req.body.address,
                deleted: req.body.deleted,
                is_active: req.body.is_active,
                role: req.body.role,
                createdBy: createdBy
            }
            if (req.body.password) {
                const password = md5(req.body.password);
                userData.password = password;
            }

            if (req.body.images) {
                console.log(req.body.images);
                let images = req.body.images;
                userData.avatar = images[0];
            }
            console.log(userData);


            let newUser = new User(userData)
            console.log("New user" + newUser);

            const savedUser = await newUser.save()
            res.status(201).json({
                message: "Thêm tài khoản thành công",
                data: savedUser
            })
        }



    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}


module.exports.edit = async (req, res) => {
    try {

        // console.log(req.body);
        if (req.user) {
            updatedBy = req.user._id
        }else{
            return  res.status(401).json({
                    message: "Chưa xác thực người dùng"
            });
        }
        if (req.body) {
            const id = req.body.id;

            let userData = {
                full_name: req.body.full_name,
                username: req.body.username,
                phone_number: req.body.phone_number,
                email: req.body.email,
                address: req.body.address,
                deleted: req.body.deleted,
                is_active: req.body.is_active,
                role: req.body.role,
                updatedBy: updatedBy
            }
            if (req.body.password) {
                const password = md5(req.body.password);
                userData.password = password;
            }
            if (req.body.images) {
                console.log(req.body.images);
                let images = req.body.images;
                userData.avatar = images[0];
            }
            console.log(userData);


            // console.log("New user"+newUser);

            const updatedUser = await User.updateOne({
                _id: id
            }, userData)
            res.status(201).json({
                message: "Chỉnh sửa tài khoản thành công",
                data: updatedUser
            })
        }
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

        const user = await User.updateOne({
            _id: id
        }, {
            deleted: true,
            updatedBy: updatedBy
        })

        res.status(201).json({
            message: "Xóa Người dùng thành công",
            data: user
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

        const user = await User.deleteOne({
            _id: id
        })

        res.status(201).json({
            message: "Xóa sản phẩm thành công",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}