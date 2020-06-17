const nodemailer = require("nodemailer");
const cm = require("../models/component_model.js");

var chosenDevices;
var components;

function pushComponent(component) {
  var acExist = components.find(item => item.model == component.ac.name);
  if (acExist) {
    acExist.amount = acExist.amount + component.amount;
  } else {
    var ac = {
      model: component.ac.name,
      amount: component.amount,
      link: component.ac.link
    };
    components.push(ac);
  }
}

function roundUpAmounts() {
  for (var i = 0; i < components.length; i++) {
    if (components[i].amount % 1 != 0) {
      components[i].amount = Math.ceil(components[i].amount);
    }
  }
}

function print(devices) {
  var deviceIntro = "You have chosen the following devices for your setup on our website:\n";
  var deviceList = "";
  devices.forEach(item => {
    deviceList = deviceList + item.name + ": " + item.type + "\n";
  });
  var componentIntro = "\nTo set up these devices succesfully, you will need the following components:\n";
  var componentList = "";
  components.forEach(item => {
    componentList = componentList + item.amount + "x " + item.model + "\n";
  });
  var finalMessage =
    "\nOnce you have required the necessary components, head back to our website for installationsguides.\n\nBest regards, NWA.";
  return deviceIntro + deviceList + componentIntro + componentList + finalMessage;
}

exports.componentDetails = function(req, res, next) {
  components = [];
  if (req.body.hasOwnProperty("devices")) {
    req.body.devices.forEach(device => {
      for (var i = 0; i < cm.devices.length; i++) {
        if (device.type == cm.devices[i].name) {
          cm.devices[i].type.forEach(component => {
            pushComponent(component);
          });
          cm.devices[i].components.forEach(component => {
            pushComponent(component);
          });
          break;
        } else if (i == cm.devices.length - 1) {
          //REACHED IF NO DEVICE MATCHES NAME
          return res.status(400).send({
            error: "Type does not exist: " + device.type
          });
        }
      }
    });
    roundUpAmounts();
    if (req.body.hasOwnProperty("email")) {
      var emailText = print(req.body.devices);
      mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "NWA: Componentlist for personal setup",
        text: emailText
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    res.send({ components: components });
  } else {
    return res.status(400).send({
      error: "Wrong format"
    });
  }
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
