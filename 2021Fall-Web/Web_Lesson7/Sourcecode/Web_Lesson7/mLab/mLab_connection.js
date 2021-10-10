/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://Lesson7:Lesson7@lesson7.z3l1i.mongodb.net/Lesson7?retryWrites=true&w=majority'; //mongodb+srv://Lesson7:<password>@lesson7.z3l1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

MongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        console.log("Connected correctly to server");
        db.close();
    }
)
;
