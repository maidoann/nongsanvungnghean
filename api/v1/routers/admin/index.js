const productRoutes = require('./productRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const categoryRoutes = require('./categoryRoutes');

module.exports = (app) => {
    const version = "/api/v1";
    app.use(version + '/admin/',dashboardRoutes);

    app.use(version + '/admin/products',productRoutes);

    app.use(version + '/admin/category',categoryRoutes);

}