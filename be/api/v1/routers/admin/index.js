const productRoutes = require('./productRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes');
const AuthRoutes = require('./authRoutes');
const requireAuth = require('../../middlewares/admin/authMidleware')

module.exports = (app) => {
    const version = "/api/v1";
    app.use(version + '/admin/',dashboardRoutes);

    app.use(version + '/admin/products',requireAuth.requireAuth,productRoutes);

    app.use(version + '/admin/category',requireAuth.requireAuth,categoryRoutes);

    app.use(version + '/admin/users',requireAuth.requireAuth,userRoutes);

    app.use(version + '/admin/auth',AuthRoutes);



}