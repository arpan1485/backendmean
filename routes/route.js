/* DYNAMIC API*/ 
var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var category=require('../controller/categoryController')
var expense=require('../controller/expenseController')
var user=require('../controller/userController')


router.get('/categories', category.getCategories);
router.post('/category', category.addCategories);
router.get('/category/:id', category.categoryDetails);
router.put('/category/:id', category.updateCategory);
router.delete('/category/:id', category.deleteCategory);



 router.get('/expenses', expense.getExpenses);
 router.post('/expense', expense.addExpenses);
 router.get('/expense/:id', expense.expenseDetails);
 router.put('/expense/:id', expense.updateExpense);
 router.delete('/expense/:id', expense.deleteExpense);

 
router.get('/users', user.getUsers);
router.post('/registerUsers', user.registerUsers);
router.put('/user/:id', user.updateUser);
router.post('/login', user.userLogin);
router.delete('/user/:id', user.deleteUser);




module.exports=router;
