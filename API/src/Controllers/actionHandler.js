const asynchandler = require("express-async-handler");
const ApiFeatures = require("../utils/Apifeatures")
const ApiError = require("../utils/apiError");
const { Model } = require("mongoose");

exports.deleteone=(Model)=>asynchandler(
    async (req, res, next) => {
        const { id } = req.params
        const document =await Model.findByIdAndDelete(id)
        if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
        }
        document.remove();
        res.status(204).send()
    }
)
exports.updateone = (Model) => asynchandler(async (req, res, next) => {
            const { id } = req.params;
        document = await Model.findByIdAndUpdate(id, req.body,{new:true});
   if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
        }
        document.save()
        res.status(200).json({data:document})
        
    }
    
    )

exports.createone = (Model) => 
    asynchandler(async (req, res, next) => {
        const newdoc = await Model.create(req.body)
        res.status(201).json({data:newdoc})
    })

exports.getone = (Model, populationOpt) => 
    asynchandler(async (req, res, next) => {
        const { id } = req.params
        let query = Model.findById(id)
        if (populationOpt) {
            query=query.populate(populationOpt)
        }
        const document = await query
        if (!document) {
                  return next(
                    new ApiError(`No document for this id ${id}`, 404)
                  );

        }
        res.status(200).json({Data:document})

})
exports.getall = (Model, modelname = '') => 
    asynchandler(async (req, res) => {
        let filter = {}
        if (req.filterobj) {
            filter = req.filterobj
        }
        const countdocs = await Model.countDocuments();
        const apifeatures = new ApiFeatures(Model.find(filter), req.query)
            .paginate(countdocs)
            .filter()
            .sort()
            .search(modelname)
            .limitfields()
            
        const { mongoooseQuery,paginationresult } = apifeatures
        const document = await mongoooseQuery
        
        res
          .status(200)
          .json({
            results: document.length,
            paginationresult,
            data: document,
          });
        
    })
