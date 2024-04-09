const asyncHandler = require("express-async-handler");
const Articles = require("../models/Articles.model");
const handler = require("./actionHandler");
const ApiError = require("../utils/apiError");

exports.GetAllArticles = handler.getall(Articles);
exports.getarticle = handler.getone(Articles)
exports.createArticle= asyncHandler(async (req, res) => {
		if (req.file) {
			req.body.cover = `/articles/${req.file.filename}`;
		}

		const newArticle = new Articles({
      ...req.body,
      publish_by: req.user._id,
      isPublished: true,
      publish_date:Date.now()
    });

		if (!newArticle) {
			
			return next(new ApiError(`Something went wrong while create article`, 400));
		}

		const savedArticle = await newArticle.save();
		res.status(201).json({
			success: true,
			data: savedArticle,
			message: 'Article was created successfully',
		});
})
exports.updatearticle = handler.updateone(Articles)
exports.deletearticle =handler.deleteone(Articles)