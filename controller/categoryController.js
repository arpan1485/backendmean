var category = require('../model/category.js');

exports.getCategories = (req, res, next) => {
    category.find(function (err, category) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(category);
        }
    })
};


exports.addCategories = (req, res, next) => {
    let newcategory = new category({
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        created_At: new Date(),
        updated_At: new Date(),

    });
    newcategory.save(function (err, item) {
        console.log(" saved ", newcategory);
        if (err) {
            res.json(err);

        } else {
            res.json({ msg: "category added succesfully" });
        }
    });

};

exports.updateCategory= (req, res, next) => {
   category.findOneAndUpdate({"_id":req.params.id },{$set:{
    
        "categoryName": req.body.categoryName,
       "updated_At": new Date(),

    }}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    ,
    function (err, item) {
        console.log(" saved ", item);
        if (err) {
            res.json(err);

        } else {
            res.json({ msg: "category update succesfully" });
        }
    });

};

exports.categoryDetails = function (req, res) {
    category.findById(req.params.id, function (err, category) {
        if (err) return next(err);
        res.send(category);
    })
};

exports.deleteCategory = (req, res, next) => {
   category.remove({"_id":req.params.id},  
    function (err, item) {
        console.log(" saved ", item);
        if (err) {
            res.json(err);

        } else {
            res.json({ msg: "category remove succesfully" });
        }
    });

};




