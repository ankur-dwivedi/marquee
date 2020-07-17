//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/company", {
  useUnifiedTopology: true,
  useNewUrlParser: true

});
const companySchema = {
  cin: String,
  name: String
};
const Company = mongoose.model("company", companySchema);


////////////////////////Request  Targeting all articlas
app.route("/data")
  .get(function(req, res) {
    Company.find({}, function(err, foundData) {
      if (!err) {
        res.send(foundData);
      } else {
        res.send(err);
      }
    });
  })
  .post(function(req, res) {
    const newData = new Company({
      cin: req.body.cin,
      name: req.body.name
    });
    newData.save(function(err) {
      if (!err) {
        res.send("Sucessfully added a new article");
      } else {
        res.send(err);
      }
    });

  })
  




app.listen(3001, function() {
  console.log("Server started on port 3001");
});
