var mongoose = require("mongoose");

var schema = new mongoose.Schema({ 
	"id": Number,
	"brand": String,
	"series_name": String,
	"type": String,
	"seat": Number,
	"color": String,
	"colorChinese": String,
	"image": String,
	"directory": String,
	"engine": String,
	"paifang": String,
	"biansuxiang": String,
	"price": Number,
	"km": Number,
	"goumaidate": String,
	"saler": String,
    "detail": String,
    "ranliao": String
});

module.exports = mongoose.model("Car", schema);