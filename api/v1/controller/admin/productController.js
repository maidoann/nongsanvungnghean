const Product = require('../../models/Products');
const paginationHelper = require('../../../../helpers/paginationHelper');
const searchHelper = require('../../../../helpers/searchHelper')

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    //search keyword
    if(req.query.keyword){
        regex = searchHelper(req.query);
        console.log("regex" + regex);
        
        find.product_name = regex;
    }
    //end search keyword

    //sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    //end sort


    //pagination
    const countProducts = await Product.countDocuments(find);
    let pagination = {
        currentPage : 1,
        limitItems: 1
    }
    pagination = paginationHelper(pagination, req.query, countProducts)
    //pagination

    const products = await Product.find(find)
    .limit(pagination.limitItems)
    .skip(pagination.skipItems)
    .sort(sort);
    res.json(products)
}
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id ;
        console.log(id);
        
        let findOne = {
        _id: id,
        deleted: false
    };
    const product = await Product.findOne(findOne)
    if(product)
        res.json(product);
    else
        res.json({
            error:"Không tìm thấy sản phẩm nào"
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
        console.log( req.body);
        
        res.json({
            haha:"ne"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })
        
    }

}