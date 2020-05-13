const getDb=require('../utils/database').getDb;
const mongodb=require('mongodb');

class product{
    constructor(title,price,description){
        this.title=title;
        this.price=price;
        this.description=description;
    }

    save(){
        const db=getDb();
        return db.collection('products')
        .insertOne(this);
        //.then(result=>{
          //  console.log(result);
        //})
        //.catch(err=>{
          //  console.log(err);
        //});
    }

    static findAll(){
        const db=getDb();
        return db.collection('products').find().toArray()
        .then(products=>{
            console.log(products);
            return products;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static findOne(prodid){
        const db=getDb();
        return db.collection('products').find({_id:new mongodb.ObjectId(prodid)}).next()
        .then(result=>{
            console.log(result);
         return result;
        })
        .catch(err=>{
            console.log(err);
        });
    }
}

module.exports=product;