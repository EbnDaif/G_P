class ApiFeatures {
  constructor(mongoooseQuery, querystring) {
    this.querystring = querystring;
    this.mongoooseQuery = mongoooseQuery;
  }
  filter() {
    const querystrringObj = { ...this.querystring };
    const execludefields = ["page", "limit", "sort", "fields"];
    execludefields.forEach((field) => delete querystrringObj[field]);
    let querystr = JSON.stringify(querystrringObj);
    querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/, (match) => `$${match}`);
    this.mongoooseQuery = this.mongoooseQuery.find(JSON.parse(querystr));
    return this;
  }
  sort() {
    if (this.querystring.sort) {
      const sortby = this.querystring.split(",").join(" ");
      this.mongoooseQuery = this.mongoooseQuery.sort(sortby);
    } else {
      this.mongoooseQuery = this.mongoooseQuery.sort("-createAt");
    }
    return this;
  }
  limitfields() {
    if (this.querystring.fields) {
      const fields = this.querystring.fields.split(",").join(" ");
      this.mongoooseQuery = this.mongoooseQuery.select(fields);
    } else {
      this.mongoooseQuery = this.mongoooseQuery.select("");
    }
    return this;
  }
  search(modelname) {
    if (this.querystring.keyword) {
      let query = {};
      if (modelname === "Articles") {
        query.$or = [
          {
            title: { $regex: this.querystring.keyword, $options: "i" },
          },
          {
            content: {
              $regex: this.querystring.queryString.keyword,
              $options: "i",
            },
          },
        ];
      } else {
        query = {
          name: { $regex: this.querystring.keyword, $options: "i" },
        };
      }
      this.mongoooseQuery = this.mongoooseQuery.find(query);
    }
    return this;
  }
  paginate(countdoc) {
    const page = this.querystring.page * 1 || 1;
    const limit = this.querystring.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endindex = page * limit;

    ///////////////////////////////////////////
    const pagination = {};
    pagination.currentpage = page;
    pagination.limit = limit;
    pagination.numberofpages = Math.ceil(countdoc / limit);

    ///////////////////////////////////////////
    if (endindex < countdoc) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongoooseQuery = this.mongoooseQuery.skip(skip).limit(limit);
    this.paginationresult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
