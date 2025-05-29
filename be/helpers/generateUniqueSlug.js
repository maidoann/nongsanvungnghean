const slugify = require("slugify");

async function generateUniqueSlug(model, name) {
    const baseSlug = slugify(name, { lower: true, strict: true });
    let finalSlug = baseSlug;
    let counter = 1;

    while (await model.findOne({ slug: finalSlug })) {
        finalSlug = `${baseSlug}-${counter++}`;
    }

    return finalSlug;
}

module.exports = generateUniqueSlug;