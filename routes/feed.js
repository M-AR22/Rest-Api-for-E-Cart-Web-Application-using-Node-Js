const express=require('express');

const router=express.Router();

const feedcontroller=require('../controllers/feed');

router.get('/posts',feedcontroller.getPosts);

router.post('/post',feedcontroller.createPost);

router.post('/addProduct',feedcontroller.addProducts);

router.get('/getProduct',feedcontroller.getProducts);

router.get('/getUniqueProduct/:id',feedcontroller.getUniqueProduct);

router.post('/signup',feedcontroller.signUp);

router.post('/addtocart',feedcontroller.addtocart);

router.post('/deleteFromcart',feedcontroller.deleteFromcart);

router.post('/updatecartProductQuantity',feedcontroller.updatecartProductQuantity);

module.exports=router;