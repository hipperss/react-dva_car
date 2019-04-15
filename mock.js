//引入mockjs
var mock = require("mockjs");
var fs = require("fs");
var _ = require("underscore");
var mongoose = require("mongoose");

//使用Schema
var Car = require("./models/Car");
var Random = mock.Random;

//链接数据库
mongoose.connect("mongodb://localhost/carsystem");

var carbrandsandseries = {
    "奇瑞": {
        "pinyin": "Q",
        "country": "中国",
        "series": [
            {
                "series_name": "艾瑞泽",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKgH1Fg2xzuAU30KAAe38HwP3TA680.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKgFW1br6ZGATUgdAAjKuwGz8MM655.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgFW1bMLYaAXhzgAAZ1Q6TtV80632.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKgH5VlQ0R2ACV94AAi-KsaocXs390.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKjBwFlI5oGALk8pAAnV1TylIYc706.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH0llWGauAPjjRAAgM1h2buv0244.jpg"
                },
                "directory": "AiRuize"
            }
        ]
    },
    "奥迪": {
        "pinyin": "A",
        "country": "德国",
        "series": [
            {
                "series_name": "A3",
                "type": "跑车",
                "seat": 2,
                "colors": {
                    "green": "1024x0_1_q87_autohomecar__wKgFW1kTN5CATWdjAAbf14rrsS4853.jpg",
                    "orange": "1024x0_1_q87_autohomecar__wKgHy1kAA1OAWoJPAAjVdNuUIFg722.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH0lj-w7aAKfuDAAY63i-YfBQ123.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH5FkxLziARXeFAAqDQ2azoi0704.jpg"
                },
                "directory": "Audi_A3"
            }
        ]
    },
    "别克": {
        "pinyin": "B",
        "country": "美国",
        "series": [
            {
                "series_name": "威朗",
                "type": "SUV",
                "seat": 7,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKgH2VaBLE-APqCLAAmyAl5SEQc320.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKjBy1j55sCAMmc3AAh-lJSzVKQ772.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKgH11ZtUJ2AUnB_AAhDClgXmKE827.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFWFf8vAyAY2J0AAsG8fyGdZ0869.jpg"
                },
                "directory": "Buick_verano"
            },
            {
                "series_name": "英朗",
                "type": "SUV",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgFWVh0XOeAR1XKAAevNudrRaU755.jpg",
                    "brown": "1024x0_1_q87_autohomecar__wKjBwFhPoBeAQo5uAAjrQlcVhj8197.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFVVi_tDKAZndNAAg41m8oI_w975.jpg"
                },
                "directory": "excelleGT"
            }
        ]
    },
    "吉利": {
        "pinyin": "J",
        "country": "中国",
        "series": [
            {
                "series_name": "远景",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKjBxlglq2GASkeWAAXldqX4O3Y638.jpg",
                    "red": "1024x0_1_q87_autohomecar__wKgH0lj4SmuAUij5AAw_PmxBg1c240.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBwlgoJqCACGPcAAvqyPoku-U870.jpg"
                },
                "directory": "geely_yuanjing"
            },
            {
                "series_name": "帝豪GL",
                "type": "皮卡",
                "seat": 4,
                "colors": {
                    "gold": "1024x0_1_q87_autohomecar__wKjBwVeEn9-AW9o2AAz-avleNks563.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjBzlfP_EaAeAmLAAfTxiCbp1M465.jpg"
                },
                "directory": "geely_dihaoGL"
            },
            {
                "series_name": "远景SUV",
                "type": "三厢轿车",
                "seat": 5,
                "colors": {
                    "brown": "1024x0_1_q87_autohomecar__wKgFWlfRSviAN-0CAAu42Bl1b0A158 (1).jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgFU1bdvciAWrdWAAfCqlTGrmc071.jpg",
                    "red" : "1024x0_1_q87_autohomecar__wKjBz1cK_TWAaVwQAAdfzGfDQ4A280.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgHzVg7-7uAY9kjAA0piI5VShQ589.jpg"
                },
                "directory": "geely"
            }
        ]
    },
    "宝马": {
        "pinyin": "B",
        "country": "德国",
        "series": [
            {
                "series_name": "3系",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "blue": "800x0_1_q87_autohomecar__wKgH2ljBQpuAVD4JAAWvcYf8IGo616.jpg",
                    "red": "800x0_1_q87_autohomecar__wKgH5VlKIG-AcobjAAdN5KTofLI513.jpg"
                },
                "directory": "bmw_330i"
            }
        ]
    },
    "长安": {
        "pinyin": "C",
        "country": "中国",
        "series": [
            {
                "series_name": "CS35",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgH1VcODhqAKMR9AAhfRiPim1k023.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgH0Ff-jCmAYqYqAAbpZvSeSXY382.jpg"
                },
                "directory": "changan"
            },
            {
                "series_name": "睿骋",
                "type": "皮卡",
                "seat": 2,
                "colors": {
                    "gray": "1024x0_1_q87_autohomecar__wKgHz1lKn86AbgOBAAxvIIkbZ1E584.jpg",
                    "gold": "1024x0_1_q87_autohomecar__wKgH0Ff-jCmAYqYqAAbpZvSeSXY382.jpg"
                },
                "directory": "changan"
            },
            {
                "series_name": "悦翔V3",
                "type": "MPV",
                "seat": 5,
                "colors": {
                    "red": "1024x0_1_q87_autohomecar__wKgHzVhOG3qAewv0AAhT19sW0EU105.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFVVlDrduALLHpAAfCqwXqhes904.jpg"
                },
                "directory": "changan"
            }
        ]
    },
    "丰田": {
        "pinyin": "F",
        "country": "日本",
        "series": [
            {
                "series_name": "卡罗拉",
                "type": "皮卡",
                "seat": 5,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKgH3FZO7U2AMaiUAAI5zksKY2Q524.jpg",
                    "gray": "1024x0_1_q87_autohomecar__wKjBw1gjDE6ABrpTAAdIe36o4nE259.jpg"
                },
                "directory": "Corolla"
            },
            {
                "series_name": "普拉多",
                "type": "两厢轿车",
                "seat": 2,
                "colors": {
                    "red": "1024x0_1_q87_201506180258543445149112.jpg",
                    "silver": "1024x0_1_q87_autohomecar__wKgH4lkUMg-AXLEeAAcM_djliVM583.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgH11kBp7qAImJvAAas8SXbLFU591.jpg"
                },
                "directory": "Corolla"
            }
        ]
    },
    "福特": {
        "pinyin": "F",
        "country": "美国",
        "series": [
            {
                "series_name": "福睿斯",
                "type": "三厢轿车",
                "seat": 4,
                "colors": {
                    "brown": "1024x0_1_q87_2014112613463774926410.jpg",
                    "gray": "1024x0_1_q87_20141129131754925443511.jpg",
                    "silver" : "1024x0_1_q87_20141211145228020443510.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgH0FjLw3OAJSLqAAjSvcUPFUU142.jpg"
                },
                "directory": "Ford_escort"
            },
            {
                "series_name": "福克斯",
                "type": "三厢轿车",
                "seat": 2,
                "colors": {
                    "black": "1024x0_1_q87_201401071414078690.jpg",
                    "blue": "1024x0_1_q87_201305271752269680.jpg",
                    "red" : "1024x0_1_q87_201302181713450884244.jpg"
                },
                "directory": "Ford_focus"
            },
            {
                "series_name": "锐界",
                "type": "三厢轿车",
                "seat": 4,
                "colors": {
                    "silver": "1024x0_1_q87_201307151443344200.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgFV1ffqtiANvwyAAeUWjqOF60958.jpg",
                    "yellow" : "1024x0_1_q87_201306171551246940.jpg"
                },
                "directory": "Ford_focus"
            }
        ]
    },
    "长城": {
        "pinyin": "C",
        "country": "中国",
        "series": [
            {
                "series_name": "C50",
                "type": "两厢轿车",
                "seat": 2,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKjByFlLoNKAXdw_AAWIYiFn7fE826.jpg",
                    "blue": "1024x0_1_q87_autohomecar__wKgH1llHihaAdaGiAAXpPtVoWws258.jpg"
                },
                "directory": "greatWall"
            },
            {
                "series_name": "M2",
                "type": "三厢轿车",
                "seat": 5,
                "colors": {
                    "red": "1024x0_1_q87_autohomecar__wKjBx1kT0MSAJUNHAAc-uHJDhag374.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKgH2Fjoqs-AbOyyAARcXctsLww737.jpg"
                },
                "directory": "greatWall"
            }
        ]
    },
    "本田": {
        "pinyin": "B",
        "country": "日本",
        "series": [
            {
                "series_name": "奥德赛",
                "type": "两厢轿车",
                "seat": 2,
                "colors": {
                    "blue": "1024x0_1_q87_autohomecar__wKjBx1cMYg-APqb8AAX5kO32_mo182.jpg"
                },
                "directory": "Honda"
            },
            {
                "series_name": "思域",
                "type": "三厢轿车",
                "seat": 4,
                "colors": {
                    "orange": "1024x0_1_q87_autohomecar__wKgH11cpyB2ANl7bAAk68oTY2Bk228.jpg",
                    "white": "1024x0_1_q87_autohomecar__wKjByViFqg-AF77aAA0Pn6zSg3Q115.jpg"
                },
                "directory": "Honda"
            }
        ]
    },
    "马自达": {
        "pinyin": "M",
        "country": "日本",
        "series": [
            {
                "series_name": "Axela昂克赛拉",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "red": "1024x0_1_q87_autohomecar__wKgHzFisBxaAHraQAASx9HYI4-w789.jpg",
                    "white" :"1024x0_1_q87_autohomecar__wKjByVh2FPKADat5AAxTm-yL7Ew836.jpg"
                },
                "directory": "Mazda_Axela"
            }
        ]
    },
    "日产": {
        "pinyin": "R",
        "country": "日本",
        "series": [
            {
                "series_name": "轩逸",
                "type": "SUV",
                "seat": 5,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKjBz1hiPMWAYcHeAAYo_MmJN-o069.jpg",
                    "gold" : "1024x0_1_q87_autohomecar__wKgH31hKYNeALVkrAAXFxNWeBvI469.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKjBwVbJmkGATr7qAAYXK9oKLq4477.jpg"
                },
                "directory": "Nissan_xuanyi"
            }
        ]
    },
    "荣威": {
        "pinyin": "R",
        "country": "日本",
        "series": [
            {
                "series_name": "550",
                "type": "三厢轿车",
                "seat": 2,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgH41jt526AO6ZpAAlD5uhAts4868.jpg",
                    "blue" : "1024x0_1_q87_autohomecar__wKgH01eMtWCAGM_QAAehXzUhljQ911.jpg",
                    "brown" : "1024x0_1_q87_autohomecar__wKgHzFfZEi6ADtQhAAXBxaABakg417.jpg"
                },
                "directory": "Roewe"
            },
            {
                "series_name": "RX5",
                "type": "皮卡",
                "seat": 5,
                "colors": {
                    "red": "1024x0_1_q87_autohomecar__wKgH01epoSKAPIcCAA4ymCz-oZg715.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgFW1fQwxuAYjN5AAYEk8egftw132.jpg"
                },
                "directory": "Roewe"
            },
            {
                "series_name": "i6",
                "type": "三厢轿车",
                "seat": 4,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgH0Fj__GaAfxGqAAjteWMJ5xw276.jpg",
                    "green" : "1024x0_1_q87_autohomecar__wKgH4FijtjKAcg34AASBjrVUP-o677.jpg",
                    "red" : "1024x0_1_q87_autohomecar__wKgFV1kkemmAOFs_AAZePoCq85s948.jpg"
                },
                "directory": "Roewei6"
            },
            {
                "series_name": "Ei5",
                "type": "两厢轿车",
                "seat": 4,
                "colors": {
                    "silver": "1024x0_1_q87_autohomecar__wKgH0FihHaeAdfDaAAfuz5nMqXo042.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgH0FkILc2AS24tAAdSHjot1Z8233.jpg"
                },
                "directory": "Roewei6"
            }
        ]
    },
    "大众": {
        "pinyin": "D",
        "country": "德国",
        "series": [
            {
                "series_name": "速腾",
                "type": "三厢轿车",
                "seat": 2,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgH3VgjCvSAIxtJAAaNDE6hF78546.jpg",
                    "red" : "1024x0_1_q87_autohomecar__wKgH3lcoY6yAPL-_AAy8frPXjII527.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgH3lhGTHGAVCR0AAddthhydwo244.jpg"
                },
                "directory": "volkswagen_suteng"
            },
            {
                "series_name": "高尔夫",
                "type": "SUV",
                "seat": 5,
                "colors": {
                    "gold": "1024x0_1_q87_autohomecar__wKgFU1i30dyAOzOuAAd0pjTC36g134.jpg",
                    "red" : "1024x0_1_q87_autohomecar__wKgHzlXn8vOAPMplAAJgrvE9cx0938.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgHzVicPfyABEVwAAk62qpxPug276.jpg"
                },
                "directory": "VolksWagenwerk_golf"
            },
            {
                "series_name": "朗逸",
                "type": "跑车",
                "seat": 2,
                "colors": {
                    "black": "1024x0_1_q87_autohomecar__wKgFWFiud3qAMRmYAAecBBiI65M473.jpg",
                    "blue" : "1024x0_1_q87_201207171911488713765.jpg",
                    "gold" : "1024x0_1_q87_201212171018082150.jpg"
                },
                "directory": "VolksWagenwerk_Lavida"
            },
            {
                "series_name": "迈腾",
                "type": "三厢轿车",
                "seat": 5,
                "colors": {
                    "red": "1024x0_1_q87_autohomecar__wKgH0VkS25iAGicLAAdPw0oHMJ0336.jpg",
                    "silver" : "1024x0_1_q87_20141201184540945488510.jpg",
                    "white" : "1024x0_1_q87_autohomecar__wKgFU1br65CADOXVAAQ3J_xHGx8363.jpg"
                },
                "directory": "VolksWagenwerk_Lavida"
            }
        ]
    }
    
}


var arr = [];


//放入5000条
for (var i = 0; i < 5000; i++) {
    let brand = _.sample(Object.keys(carbrandsandseries), 1)[0];
    let serie = _.sample(carbrandsandseries[brand].series, 1)[0];
    let color = _.sample(Object.keys(serie.colors), 1)[0];
    let colorChineseEnglish = {
        "white": "白色",
        "orange": "橙色",
        "yellow": "黄色",
        "black": "黑色",
        "red": "红色",
        "silver": "银色",
        "green": "绿色",
        "blue": "蓝色",
        "brown": "棕色",
        "gold": "金色",
        "gray" : "灰色"
    };

    arr.push({
        "id": 100000 + i,
        "brand": brand,
        "series_name": serie.series_name,
        "type": serie.type,
        "seat": serie.seat,
        "colorChinese": colorChineseEnglish[color] || "其他颜色",
        "color": color,
        "image": serie.colors[color],
        "directory": serie.directory,
        "engine": _.sample([ "1.2", "1.4","1.7","1.9","2.1","2.3", "2.5", "2.7", "3.4", "3.6", "3.9", "4.2", "5.5"], 1)[0],
        "paifang": _.sample(["国一", "国二", "国三", "国四", "国五"], 1)[0],
        "biansuxiang": _.sample(["手动", "自动"], 1)[0],
        "price": _.random(0.2, 200),
        "km": (_.random(0, 100))/10,
        "goumaidate": new Date(_.random(2012, 2017), _.random(0, 11), _.random(1, 30)),
        "ranliao": _.sample(["汽油", "柴油", "纯电动", "油电混合"], 1)[0],
        "saler": Random.cname()
    })
}



Car.remove({}, function (err, data) {
    console.log("【删除了" + data.n + "条数据】");
    Car.insertMany(arr, function (err, data) {
        console.log("【添加了" + data.length + "条数据】");
    })
});










