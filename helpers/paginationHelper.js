module.exports = (pagination,query, countProduct) => {
    if(query.page){
        pagination.currentPage = parseInt(query.page);
    }
    totalPage = Math.ceil(countProduct/pagination.limitItems);
    skipItems = (pagination.currentPage - 1) * pagination.limitItems;
    pagination.totalPage = totalPage;
    pagination.skipItems = skipItems;
    return pagination;
}