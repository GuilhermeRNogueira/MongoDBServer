var express     =   require('express');
var app         =   express();
var bodyParser  =   require('body-parser');
var router      =   express.Router();
var mongoose    =   require("mongoose");
const port = process.env.PORT || 3000

mongoose.connect('mongodb+srv://admin:admin@fortheplanet-ya50d.mongodb.net/fortheplanetlog?retryWrites=true&w=majority');

var Schema = mongoose.Schema;
var logSchema = new mongoose.Schema({
    currSessionId : String,
    currGameId : String,
    generation : String,
    playerName : String,
    playerType : String,
    playerTookFromCP : String,
    playerGain : String,
    envState : String,
});
var LogItem = mongoose.model('ForThePlanetLog',logSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

/*router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});*/

router.route("/")
    .get(function(req,res){
        res.json({"error" : false,"message" : "Failed For the planet Log"});
    })
    .post(function(req,res){
        var response = {};
        var data = new LogItem({
            currSessionId: req.body.currSessionId,
            currGameId: req.body.currGameId,
            generation: req.body.generation,
            playerName: req.body.playerName,
            playerType: req.body.playerType,
            playerTookFromCP: req.body.playerTookFromCP,
            playerGain: req.body.playerGain,
            envState: req.body.envState,
        });
        console.log("For the planet Log generation body: "+ req.body.generation);
        console.log("For the planet Log playerName body: "+ req.body.playerName);
        data.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

app.use('/',router);

app.listen(port);
console.log("Listening to PORT "+ port );