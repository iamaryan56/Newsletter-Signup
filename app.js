const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: 
                    {
                        FNAME: firstName,
                        LNAME: lastName
                    }
                
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url= "https://us20clea.api.mailchimp.com/3.0/lists/913d026190"

    const options= {
       method: "POST",
       auth: "aryan:399fe57ec26489f34d03721df40d03b0-us20"
    }

    const request =https.request(url,options,function(response){
        if (response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})









app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// 399fe57ec26489f34d03721df40d03b0-us20 API id
// 913d026190  List id