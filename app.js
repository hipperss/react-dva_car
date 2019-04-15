var express = require("express");
var fs = require("fs");
var url = require("url");
var mongoose = require("mongoose");


var app = express();

//静态化
app.use(express.static("www"));

//数据库
mongoose.connect("mongodb://localhost/carsystem");
var Car = require("./models/Car");


//读取接口
app.get("/api", (req, res) => {
    //得到后面的参数
    var id = url.parse(req.url, true).query.id;
    var brand = url.parse(req.url, true).query.brand;
    var engine = url.parse(req.url, true).query.engine;
    var color = url.parse(req.url, true).query.color;
    var colorChinese = url.parse(req.url, true).query.colorChinese;
    var paifang = url.parse(req.url, true).query.paifang;
    var biansuxiang = url.parse(req.url, true).query.biansuxiang;
    var series_name = url.parse(req.url, true).query.series_name;
    var type = url.parse(req.url, true).query.type;
    var seat = url.parse(req.url, true).query.seat;
    var goumaidate = url.parse(req.url, true).query.goumaidate;
    var km = url.parse(req.url, true).query.km;
    var price = url.parse(req.url, true).query.price;
    var ranliao = url.parse(req.url, true).query.ranliao;
    var page = url.parse(req.url, true).query.page;
    var pagesize = url.parse(req.url, true).query.pagesize;
    var sortby = url.parse(req.url , true).query.sortby || "id";
    var sortDirec = url.parse(req.url, true).query.sortDirec || 1;
    
    
    //创建一个对象，存放这些参数，可以根据这些去查询数据库
    var searchJSON = {};

    //如果这些存在了，就直接添加进去
    if (id){
        searchJSON["id"] = id;
    }

    if(brand){
        searchJSON["brand"] = brand;
    }
    if(paifang){
        searchJSON["paifang"] = paifang;
    }
    if(color){
        searchJSON["color"] = color;
    }
    if(colorChinese){
        searchJSON["colorChinese"] = colorChinese;
    }
    if(engine){
        engine = JSON.parse(engine);
        searchJSON["engine"] = {"$gte" :engine[0],"$lte" :engine[1]}
    }
    if(biansuxiang){
        searchJSON["biansuxiang"] = biansuxiang;
    }
    if(series_name){
        searchJSON["series_name"] = series_name;
    }
    if(type){
       searchJSON["type"] = type;
    }
    if(seat){
        searchJSON["seat"] = seat;
    }
    
    
    if(km){
        km = JSON.parse(km);
        searchJSON["km"] = {"$gte" : km[0] , "$lte" : km[1]};
    }
    if(price){
        price = JSON.parse(price);
        searchJSON["price"] = {"$gte" : price[0] , "$lte" : price[1]};
    }
    if(ranliao){
        searchJSON["ranliao"]= ranliao;
    }
    
    Car.count(searchJSON,function(err,amount){
        Car.find(searchJSON).sort({ [sortby]: sortDirec}).skip(Number((page-1)*pagesize)).limit(Number(pagesize)).exec((err,results)=>{
            res.json({"amount" : amount ,  "results" : results});
        });
    })
    
})

app.get("/carimages/:directory", function (req, res) {
    //结构
    
        var directory = req.params.directory;


    fs.readdir("./www/carimages/" + directory, (err, data) => {
        var data1 = fs.readdirSync("./www/carimages/" + directory );
        var dajson = {};
        //再依次访问数组中的文件夹
        data.forEach((color) => {
            
            dajson[color] = {};
            var data2 = fs.readdirSync("./www/carimages/" + directory + "/" + color);
            data2.forEach((album) => {
                //再依次访问每个文件夹的图片，得到图片信息
                var data3 = fs.readdirSync("./www/carimages/" + directory + "/" + color + "/" + album);
                data3.forEach((item)=>{
                    if(item == "Thumbs.db"){
                        data3.splice((data3.indexOf(item)),1) 
                    }
                    return data3  
                })
                dajson[color][album] = data3
            })
        })
        res.json({"result" : dajson})
    })
});


//监听端口
app.listen(5000);
console.log("5000端口已经监听");