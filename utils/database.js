const mongodb=require('mongodb');
const mongoClient=mongodb.MongoClient;
let _db;

const mongoConnect=callback=>{

    mongoClient.connect('mongodb+srv://Samank:Samank@cluster0-aqma0.mongodb.net/test?retryWrites=true&w=majority')
    .then(client=>{
        console.log('connected');
        _db=client.db();
        callback();
    })
    .catch(err=>{
        console.log(err);
    });
};

const getDb=()=>{
    if(_db){
        return _db
    }
    console.log('No database found');
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;
