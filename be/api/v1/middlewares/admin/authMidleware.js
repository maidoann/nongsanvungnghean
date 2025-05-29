const { User } = require('../../models/User');

module.exports.requireAuth = async (req,res,next)=>{
    if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1];
        let user = await User.findOne({
            deleted: false,
            token: token
        })
        if(!user){
            return res.json({
                code: "401",
                message: "Vui lòng đăng nhập trước khi thực hiện"
            })
        }
        if(!user.is_active){
            return res.json({
                code: "401",
                message: "Tài khoản của bạn đã bị khóa"
            })
        }
        if(user.role !="admin"){
            return res.json({
                code: "401",
                message: "Vui lòng đăng nhập bằng tài khoản admin"
            })
        }
        req.user = user;
        next();
    }
    else{
        res.json({
            code: "401",
            message: "token không hợp lệ"
        })
    }

    
}