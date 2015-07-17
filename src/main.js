//@program
    var THEME = require("themes/flat/theme");
 //   var THEME = require("themes/sample/theme");
	var CONTROL = require("mobile/control");
	var DIALOG = require("mobile/dialog");
	var KEYBOARD = require("mobile/keyboard");
	var SCROLLER = require("mobile/scroller");
	var MODEL = require("mobile/model");
//	var LOREM = require("./lorem");
    var BUTTONS = require("controls/buttons");
    
    deviceURL = "";
    var marksTexture = new Texture("./assets/marks.png");
	var marksSkin = new Skin({ texture: marksTexture,  x:0, y:0, width:30, height:30, states:30 });
	var sliderBarSkin = new Skin({ texture: marksTexture, x:30, y:0, width:40, height:30, states:30, 
	tiles:{ left:10, right:10 }
	});
	var sliderThumbSkin = new Skin({ texture: marksTexture, x:70, y:0, width:20, height:30, states:30 });
    
    var whiteSkin = new Skin( { fill:"white" } );
    var labelStyle = new Style( { font: "bold 30px", color:"black" } );
    var sliderLabelStyle = new Style({ font:"bold", size:14, horizontal:"left", color:["white","white","#acd473"] });
	var sliderValueStyle = new Style({ font:"bold", size:14, horizontal:"right", color:["white","white","#acd473"] });
    var temp = 25;
    var humidity = 70;
    var luminance = 30.67;
    Handler.bind("/discover", Behavior({
        onInvoke: function(handler, message){
              trace("Found the device.\n");	
              temp = 30 ;
    //        deviceURL = JSON.parse(message.requestText).url;
        }
    }));
    
    Handler.bind("/forget", Behavior({
        onInvoke: function(handler, message){
            deviceURL = "";
        }
    }));
    var luminanceLabel = new Label({left:0, right:0, height:40, string:"Luminance: "+luminance+" lx", style: labelStyle});
    var humidityLabel = new Label({left:0, right:0, height:40, string:"Humidity: "+humidity+" %", style: labelStyle});
    var tempLabel = new Label({left:0, right:0, height:40, string:"Temperature: "+temp+" °C", style: labelStyle});
    
    var adj_hum_Label = new Label({left:0, right:0, height:60, string:"50 %", style: labelStyle});
    var adj_lum_Label = new Label({left:0, right:0, height:60, string:"200 lx", style: labelStyle});
        var waterButton = BUTTONS.Button.template(function($){ return{
        left: 0, right: 10, top: 0, bottom: 0,
        contents: [
            new Label({left:0, right:0, height:40, string:"water", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "water"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
        var lightButton = BUTTONS.Button.template(function($){ return{
        left: 10, right: 0, top: 0, bottom: 0,
        contents: [
            new Label({left:0, right:0, height:40, string:"light", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "reset"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
        var actionLine = new Line({
        left: 10, right: 10, top: 0, bottom: 10, active: true, skin: whiteSkin,
        contents: [
            new waterButton(),
            new lightButton()  
        ]
    });
    var ahButton = BUTTONS.Button.template(function($){ return{
        width:60 , height:60,
        contents: [
            new Label({left:0, right:0, height:40, string:"+", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "reset"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
        var mhButton = BUTTONS.Button.template(function($){ return{
        width:60 , height:60,
        contents: [
            new Label({left:0, right:0, height:40, string:"-", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "reset"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
        var alButton = BUTTONS.Button.template(function($){ return{
        width:60 , height:60,
        contents: [
            new Label({left:0, right:0, height:40, string:"+", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "reset"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
        var mlButton = BUTTONS.Button.template(function($){ return{
        width:60 , height:60,
        contents: [
            new Label({left:0, right:0, height:40, string:"-", style: labelStyle})
        ],
        behavior: Object.create(BUTTONS.ButtonBehavior.prototype, {
            onTap: { value: function(content){
                content.invoke(new Message(deviceURL + "reset"), Message.JSON);
            }},
            onComplete: { value: function(content, message, json){
                counterLabel.string = json.count;
            }}
        })
    }});
    var adj_humidiLine = new Line({
        left: 10, right: 10, height:70, active: true, skin: whiteSkin,
        contents: [
            new mhButton(),
            adj_hum_Label,
            new ahButton()  
        ]
    });
    var adj_lumLine = new Line({
        left: 10, right: 10, height:70, active: true, skin: whiteSkin,
        contents: [
            new mlButton(),
            adj_lum_Label,
            new alButton()  
        ]
    });
    var mainColumn = new Column({
        left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
        contents: [
            tempLabel,
            humidityLabel,
            luminanceLabel,
            new Label({left:0, right:0, height:40, string:"Set Humidity", style: labelStyle}),
            adj_humidiLine,
            new Label({left:0, right:0, height:40, string:"Set Luminance", style: labelStyle}),
            adj_lumLine,
            new Label({left:0, right:0, height:40, string:"Actions", style: labelStyle}),
            actionLine
        ],
        behavior: Behavior({
            onTouchEnded: function(content){
                if (deviceURL != "") content.invoke(new Message(deviceURL + "getCount"), Message.JSON);
            },
            onComplete: function(content, message, json){
                counterLabel.string = json.count;
            }	
        })
    });
    
    var ApplicationBehavior = Behavior.template({
        onDisplayed: function(application) {
            application.discover("marvellCreate");
        },
        onQuit: function(application) {
            application.forget("marvellCreate");
        },
    })
    
    application.behavior = new ApplicationBehavior();
    application.add(mainColumn);