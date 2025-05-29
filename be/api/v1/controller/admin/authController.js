const {
    User
} = require('../../models/User');


const md5 = require('md5');
const generateToken = require('../../../../helpers/generate');
module.exports.login = async (req, res) => {
    if (req.body) {
        const {
            username,
            password
        } = req.body
        console.log(req.body);
        const user = await User.findOne({
            username: username,
            deleted: false,
        })
        if (!user) {
            return res.json({
                error: "401",
                message: "Tài khoản không tồn tại"
            })
        }
        if (md5(password) != user.password) {
            return res.json({
                error: "401",
                message: "Mật khẩu không chính xác"
            })
        }
        if (!user.is_active) {
            return res.json({
                error: "401",
                message: "Tài khoản đã bị khóa"
            })
        }
        const token = user.token;
        res.cookie("token", token)

        res.json({
            status: "201",
            token: token,
            message: "Đăng nhập thành công"
        });
    }
}

module.exports.register = async (req, res) => {
    try {
        // console.log(req.body);
        if (req.body) {
            let userData = {
                full_name: req.body.full_name,
                username: req.body.username,
                password: md5(req.body.password),
                email: req.body.email,
                token: generateToken()
            }
            const usernameExist = await User.findOne({username: userData.username})
            if(usernameExist){
                return res.json({
                    code: "404",
                    message: "Tên đăng nhập đã tồn tại"
                })
            }

            const emailExist = await User.findOne({email: userData.email})
            if(emailExist){
                return res.json({
                    code: "404",
                    message: "Email đã tồn tại"
                })
            }

            let newUser = new User(userData)
            console.log("New user" + newUser);

            const savedUser = await newUser.save()

            const token = savedUser.token;
            res.cookie("token", token)
            res.status(201).json({
                message: "Tạo tài khoản thành công",
                token: token,
            })
        }



    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}

module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.json({
        code: "200",
        message: "Đăng xuất thành công"
    })
}