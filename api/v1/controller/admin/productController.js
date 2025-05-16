const Product = require('../../models/Products');
const paginationHelper = require('../../../../helpers/paginationHelper');
const searchHelper = require('../../../../helpers/searchHelper');
const Category = require('../../models/Category');
const generateUniqueSlugHelper = require('../../../../helpers/generateUniqueSlug');
const createTree = require('../../../../helpers/createTree')

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    //search keyword
    if (req.query.keyword) {
        regex = searchHelper(req.query);
        console.log("regex" + regex);

        find.product_name = regex;
    }
    //end search keyword

    //sort
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    //end sort


    //pagination
    const countProducts = await Product.countDocuments(find);
    let pagination = {
        currentPage: 1,
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
        const id = req.params.id;
        console.log(id);

        let findOne = {
            _id: id,
            deleted: false
        };
        const product = await Product.findOne(findOne)
        if (product)
            res.json(product);
        else
            res.json({
                error: "Không tìm thấy sản phẩm nào"
            })

    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}
module.exports.createpost = async (req, res) => {
    try {
        // console.log(req.body);
        if (req.body) {
            let productData = {
                description: req.body.description,
                origin: req.body.origin,
                category: req.body.category,
                harvest_date: req.body.harvest_date,
                expiration_date: req.body.expiration_date,
                deleted: req.body.deleted
            }

            if (req.body.images) {
                console.log(req.body.images);
                var images = req.body.images;
                var newimages = images.map((item) => ({
                    link: item
                }))
                productData.images = newimages;
            }
            if (req.body.name) {
                productData.name = req.body.name;
                productData.slug = await generateUniqueSlugHelper(Product, req.body.name)
                console.log();

            }
            const sale_unit = [{
                unit_type: req.body.sale_unit_type,
                unit_name: req.body.sale_unit_name,
                price_per_unit: req.body.sale_unit_price
            }]
            productData.sale_unit = sale_unit
            const inventory = [{
                total_unit: req.body.inventory_total_units,
                unit_type: req.body.inventory_unit_type,
                unit_name: req.body.inventory_unit_name
            }]

            productData.inventory = inventory

            let newProduct = new Product(productData)
            // console.log("New product"+newProduct);

            const savedproduct = await newProduct.save()
            res.status(201).json({
                message: "Thêm sản phẩm thành công",
                data: savedproduct
            })
        }



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

module.exports.edit = async (req, res) => {
    try {

        const categories = await Category.find({
            deleted: false
        });
        const tree = createTree.tree(categories); // build dạng cây
        const id = req.params.id;
        if (id) {
            var find = {
                _id: id,
                delete: false
            }
        }
        const product = await Product.findOne(find)

        if (product)
            res.status(201).json({
                product: product,
                data: tree
            });

        else
            res.json({
                error: "Không tìm thấy sản phẩm nào"
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
        // console.log(req.body);
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({
                message: "Thiếu ID sản phẩm"
            });
        }
        if (req.body) {
            let productData = {
                description: req.body.description,
                origin: req.body.origin,
                category: req.body.category,
                harvest_date: req.body.harvest_date,
                expiration_date: req.body.expiration_date,
                deleted: req.body.deleted
            }

            let imagesList = [];
            let oldImages = req.body.oldImages || [];
            console.log(oldImages);
            
            if (!Array.isArray(oldImages)) {
                oldImages = [oldImages];
            }
            const oldImagesObject = oldImages.map(item => ({
                link: item
            }));
            imagesList.push(...oldImagesObject)

            if (req.body.images) {
                console.log(req.body.images);
                var images = req.body.images;
                var newimages = images.map((item) => ({
                    link: item
                }))
                imagesList.push(...newimages);
            }
            productData.images = imagesList;
            if (req.body.name) {
                productData.name = req.body.name;
                productData.slug = await generateUniqueSlugHelper(Product, req.body.name)
                console.log();

            }
            const sale_unit = [{
                unit_type: req.body.sale_unit_type,
                unit_name: req.body.sale_unit_name,
                price_per_unit: req.body.sale_unit_price
            }]
            productData.sale_unit = sale_unit
            const inventory = [{
                total_unit: req.body.inventory_total_units,
                unit_type: req.body.inventory_unit_type,
                unit_name: req.body.inventory_unit_name
            }]

            productData.inventory = inventory

            console.log(productData);
            
            // let updateProduct = new Product(productData)

            // const updatedproduct = await updateProduct.updateOne({_id:id})

            // Hoặc là cách này
            const updatedProduct = await Product.updateOne({
                _id: id
            }, productData)
            res.status(201).json({
                message: "Sửa sản phẩm thành công",
                data: updatedProduct
            })
        }



    } catch (error) {
        console.log(error);
        res.json({
            error: "404"
        })

    }

}