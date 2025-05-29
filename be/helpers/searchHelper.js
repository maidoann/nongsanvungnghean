module.exports = (query) => {
    keyword = query.keyword;
    var regex = new RegExp(keyword, "i");
    return regex;
}