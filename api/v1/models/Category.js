const mongoose = require("mongoose");
const generateUniqueSlugHelper = require('../../../helpers/generateUniqueSlug');
const categoriesSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        unique: true
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});
// Tự động tạo slug từ name trước khi lưu
categoriesSchema.pre('save', async function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = await generateUniqueSlugHelper(mongoose.models.Category, this.name);
    }
    next();
});
const Category = mongoose.model('Category', categoriesSchema, "categories")

module.exports = Category;