const getDb=require('../utils/database').getDb;
const mongodb=require('mongodb');

const signup=(username,password)=>{
    const db=getDb();
    return db.collection('users').insertOne({
        username:username,
        password:password,
        cart:{
            items:[]
        }
    });
}

const addTocart=(prodid,username,password)=>{
    const db=getDb();
    let newQuantity=1;
    return db.collection('users').find({username:username,password:password}).next()
    .then(result=>{
        console.log(result);

        const cartProductIndex=result.cart.items.findIndex(cp=>{
            return cp.prodid.toString()===prodid.toString()
        });
        const cartitems=[...result.cart.items];
        if(cartProductIndex>=0){
            newQuantity=result.cart.items[cartProductIndex].quantity+1;
            cartitems[cartProductIndex].quantity=newQuantity;
             db.collection('users').updateOne({username:username,password:password},{$set:{
                cart:{
                    items:cartitems
                }
            }});
        }
        else{
            cartitems.push({
                prodid:new mongodb.ObjectId(prodid),
                quantity:newQuantity
            })
             db.collection('users').updateOne({username:username,password:password},{$set:{
                cart:{
                    items:cartitems
                }
            }
            });
        }
        return cartitems;

    })
    .catch(err=>{
        console.log(err);
    });
    
    
}

const deleteFromCart=(prodid,username,password)=>{
    const db=getDb();
    return db.collection('users').find({username:username,password:password}).next()
    .then(result=>{
        const cartitems=[...result.cart.items];
        const updatedcartitems=cartitems.filter(item=>{
            return item.prodid.toString()!==prodid.toString();
        });

         db.collection('users').updateOne({username:username,password:password},{$set:{
            cart:{
                items:updatedcartitems
            }
        }
        });
        return updatedcartitems;
    })
    .catch(err=>{
        console.log(err);
    });
}

const updatecartproductQuantity=(prodid,username,password)=>{
    const db=getDb();
    return db.collection('users').find({username:username,password:password}).next()
    .then(result=>{

        const cartProductIndex=result.cart.items.findIndex(cp=>{
            return cp.prodid.toString()===prodid.toString()
        });

        const cartitems=[...result.cart.items];

        if(cartProductIndex>=0){
            if(cartitems[cartProductIndex].quantity>1){
                let newQuantity=cartitems[cartProductIndex].quantity-1;
                cartitems[cartProductIndex].quantity=newQuantity;
                 db.collection('users').updateOne({username:username,password:password},{$set:{
                    cart:{
                        items:cartitems
                    }
                }});
                return cartitems;
            }
            else{
                return deleteFromCart(prodid,username,password);
                //.then(result=>{
                  //  return result;
                //})
                //.catch(err=>{
                  //  console.log(err);
                //});
            }
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.signup=signup;
exports.addTocart=addTocart;
exports.deleteFromCart=deleteFromCart;
exports.updatecartproductQuantity=updatecartproductQuantity;