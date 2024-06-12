const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadimage");
const { validationMiddleware } = require("../middlewares/validator");
const {authantication,authorization} = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectIdMiddleware");
const {createArticle,updatearticle,GetAllArticles,getarticle,deletearticle} = require("../Controllers/Artcles.Controller");
const {newArticleValidation,updateArticleValidation,} = require("../services/vaildation/Article.validation");

// -------------------------------------- all articles routes ----------------------
router.post(
  "/createArticle",
  authorization,
  upload.single("cover"),
  validationMiddleware(newArticleValidation),
  createArticle,
);
router.get("/getall", GetAllArticles);

router.get("/get-one/:id", validateObjectId, getarticle);

router.patch(
  "/update/:id",
  authorization,
  validationMiddleware(updateArticleValidation),
  updatearticle
);
router.delete(
  "/delete/:id",
  authorization,
deletearticle);

module.exports = router;
