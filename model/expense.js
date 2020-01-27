const mongoose = require('mongoose');
const ExpenseSchema = mongoose.Schema(

    {
        categoryId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true

        },
        expenseId:
        {
            type: String,
        
            required: true

        },
        expenseName:
        {
            type: String,
            required: true

        },
        amount:
        {
            type: Number,
            required: true

        },
        created_At:
        {
            type: Date,
  
           required:true

        },
        updated_At:
        {
            type: Date,
            default: Date.now

        }

    }
);

const expense = mongoose.model('expense', ExpenseSchema);

module.exports = expense;
