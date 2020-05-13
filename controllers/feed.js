const Product=require('../models/product');
const signup=require('../models/users').signup;
const addTocart=require('../models/users').addTocart;
const deleteFromCart=require('../models/users').deleteFromCart;
const updatecartproductQuantity=require('../models/users').updatecartproductQuantity;

exports.getPosts=(req,res,next)=>{
    res.status(200).json({
        posts:[{title:'first post',content:'this is first post'}]
    });
};

exports.createPost=(req,res,next)=>{

    const title=req.body.title;
    const content=req.body.content;
    res.status(201).json({
        message:'post creatd successfully',
        post: {id: new Date().toISOString() ,title: title,content: content}
    });    
};

exports.addProducts=(req,res,next)=>{
    const title=req.body.title;
    const price=req.body.price;
    const description=req.body.description;
    const product=new Product(title,price,description);
    product.save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message:'product added',title:title,price:price,desc:description
        });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getProducts=(req,res,next)=>{
    Product.findAll()
    .then(products=>{
        res.json(products);
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getUniqueProduct=(req,res,next)=>{
    const prodid=req.params.id;
    Product.findOne(prodid)
    .then(result=>{
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.signUp=(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;

    signup(username,password)
    .then(result=>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
    });

}

exports.addtocart=(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;
    const prodid=req.body.prodid;

    addTocart(prodid,username,password)
    .then(result=>{
        console.log(result);
        return result;
    })
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.deleteFromcart=(req,res,next)=>{
    const prodid=req.body.prodid;
    const username=req.body.username;
    const password=req.body.password;

    deleteFromCart(prodid,username,password)
    .then(result=>{
        return result;
    })
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.updatecartProductQuantity=(req,res,next)=>{
    const prodid=req.body.prodid;
    const username=req.body.username;
    const password=req.body.password;

    updatecartproductQuantity(prodid,username,password)
    .then(result=>{
        return result;
    })
    .then(result=>{
        console.log(result);
        res.json(result);
    })
    .catch(err=>{
        console.log(err);
    });
}