const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema(

    {
        categoryId:
        {
            type: String,
            required: true

        },
        categoryName:
        {
            type: String,
            required: true

        },
        created_At:
        {
            type: Date,
            default: Date.now

        },
        updated_At:
        {
            type: Date,
            default: Date.now

        }

    }
);

const category=mongoose.model('category',CategorySchema);
module.exports=category;
