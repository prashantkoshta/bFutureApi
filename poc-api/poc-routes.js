var express = require('express');
var router = express.Router();
var fs = require("fs"),
json;
/* GET users listing. */


router.get('/getProducts', function(req, res) {
    var n = Math.floor(Math.random()* 5)+1;
    var obj = {
        "status":"ok",
        "data": null
    }
    var ar =[];
    for(var i=0;i<n;i++){
        ar[i] = {"id":i,"name":"Name_"+i,"desc":"Desc_"+i};
    }
    obj.data = ar;
    res.status(200).send(obj);
});


router.get('/getCustomers', function(req, res) {
    var n = Math.floor(Math.random()* 40)+5;
    var obj = {
        "status":"ok",
        "data": null
    }
    var ar =[];
    for(var i=0;i<n;i++){
        ar[i] = {"customer_id":i,"customer_name":"customer_name"+i,"zipcode":+Math.floor(Math.random()* 5),"avg_proability":Math.floor(Math.random()* 2)};
    }
    obj.data = ar;
    res.status(200).send(obj);
});

router.get('/getCustomersChartData', function(req, res) {
    var x = Math.floor(Math.random()* 40)+5;
    var obj = {
        "status":"ok",
        "data": null
    };
    var xLabels = [];

    for(var j=0;j<x;j++){
        xLabels[j] = "Product_"+j;
    }
    var arBarGrp = [];
    for(var barGroup=0;barGroup<2;barGroup++){
        var o = {
            data:[],
            label: "Probability_"+barGroup
        }
        for(var k=0;k<x;k++){
            o.data[k] = Math.floor(Math.random()* 25)+5;
        }
        arBarGrp[barGroup] = o;
    }
    obj.data = {
        "xLabels" : xLabels,
        "data" : arBarGrp
    };
    res.status(200).send(obj);
});


router.get('/getScatterChartData', function(req, res) {
    var n = Math.floor(Math.random()* 20)+1;
    //var n = 8;
    var obj = {
        "status":"ok",
        "data": null
    }
    var ar =[];
    for(var i=0;i<n;i++){
        var ls = Math.floor(Math.random()* n)+1;
        ar[i] = {"question":"question_"+i,"answer":"answer_"+ls,"value":Math.floor(Math.random()* 100)+1,"value_name":"Value_1"+i,"consequence":+Math.floor(Math.random()* 50)+1,"consequence_name":"consequence_"+i};
    }
    obj.data = ar;
    res.status(200).send(obj);
});


function readJsonFile(req, res,filename){
    fs.readFile('./public/'+filename+'.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.status(200).send(JSON.stringify(obj));
    });
}

router.get("/Customer",function(req, res) {
    readJsonFile(req, res,'Customer');
})

router.get("/Customer/:id",function(req, res) {
    readJsonFile(req, res,'CustomerID');
})

router.get("/Merchant",function(req, res) {
    readJsonFile(req, res,'Merchant');
})

router.get("/Merchant/:id",function(req, res) {
    readJsonFile(req, res,'MerchantID');
})

router.get("/Group",function(req, res) {
    readJsonFile(req, res,'Group');
})

router.get("/Group/:id",function(req, res) {
    readJsonFile(req, res,'GroupID');
})

module.exports = router;