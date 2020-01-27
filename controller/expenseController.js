var expense = require('../model/expense.js');

exports.getExpenses = (req, res, next) => {
    expense.find().populate('categoryId').exec(function (err, expense) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(expense);
        }
    });
};


exports.addExpenses = (req, res, next) => {
    let newexpense = new expense({
        categoryId: req.body.categoryId,
        expenseId: req.body.expenseId,
        expenseName: req.body.expenseName,
        amount: req.body.amount,
        created_At: req.body.created_At,
        updated_At: new Date()

    });
    newexpense.save(function (err, item) {
        console.log(" saved ", newexpense);
        if (err) {
            res.json(err);

        } else {
            res.json({ msg: "expense added succesfully" });
        }
    });

};




exports.updateExpense = (req, res, next) => {
    expense.findOneAndUpdate({ "expenseId": req.params.id }, {
        $set: {
            "categoryId": req.body.categoryId,
            "amount": req.body.amount,
            "expenseName": req.body.expenseName,
            "created_At": req.body.created_At,
            "updated_At": req.body.updated_At,
        }
    },
        function (err, item) {
            console.log(" saved ", item);
            if (err) {
                res.json(err);

            } else {
                res.json({ msg: "expense update succesfully" });
            }
        });

};

exports.expenseDetails = function (req, res) {
    expense.findById(req.params.id, function (err, expense) {
        if (err) return next(err);
        res.send(expense);
    })
};

exports.deleteExpense = (req, res, next) => {
    expense.remove({ "_id": req.params.id },
        function (err, item) {
            console.log(" removed_ ", item, req.params.id);
            if (err) {
                res.json(err);

            } else {
                res.json({ msg: "expense remove succesfully" });
            }
        });

};




