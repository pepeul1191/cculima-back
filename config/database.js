var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost:27017/cculima');
var mongo = require('mongodb');

exports.db = db;
exports.Schema = Schema;
exports.mongoose = mongoose;
exports.generate_id = function(){
  var ObjectID = mongo.ObjectID;
  return new ObjectID();
}
