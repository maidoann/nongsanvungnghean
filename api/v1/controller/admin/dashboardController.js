const Product = require('../../models/Products');

module.exports.index = async (req, res) => {
    let find = {
        product_origin: 'Nghệ An'
    };

    const products = await Product.find(find);
    res.json(products)
}