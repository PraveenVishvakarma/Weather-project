const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.cityName;
    const appkey="d88f036a5c653a3e484294913312446f";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const report=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/" + icon +"@2x.png"
            res.write("<p>The weather is currently"+report+"<p>");
            res.write("<h1>The temprature in "+query+" is " + temp + "  degree Celcius.</h1>");
            res.write("<Image src="+imageURL+">");
            res.send()
        })
    });

});







app.listen(3000,function(){
    console.log("my server is running on port :3000.");
});