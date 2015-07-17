//@program
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
    var labelStyle = new Style( { font: "bold 40px", color:"black" } );
    var sliderLabelStyle = new Style({ font:"bold", size:14, horizontal:"left", color:["white","white","#acd473"] });
	var sliderValueStyle = new Style({ font:"bold", size:14, horizontal:"right", color:["white","white","#acd473"] });
    
    Handler.bind("/discover", Behavior({
        onInvoke: function(handler, message){
              trace("Found the device.\n");	
        
    //        deviceURL = JSON.parse(message.requestText).url;
        }
    }));
    
    Handler.bind("/forget", Behavior({
        onInvoke: function(handler, message){
            deviceURL = "";
        }
    }));
    
    var counterLabel = new Label({left:0, right:0, height:40, string:"0", style: labelStyle});
    var ResetButton = BUTTONS.Button.template(function($){ return{
        left: 0, right: 0, height:50,
        contents: [
            new Label({left:0, right:0, height:40, string:"Reset", style: labelStyle})
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
    
    var mainColumn = new Column({
        left: 0, right: 0, top: 0, bottom: 0, active: true, skin: whiteSkin,
        contents: [
            new Label({left:0, right:0, height:40, string:"Counter:", style: labelStyle}),
            counterLabel,
            MenuSlider({ log:false, min:0, max:80, step:1, title:"Indentation",
			getter: function() { 
				return   0; 
			},
			setter: function(value) { 
			},
			}),
            new ResetButton()
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
    
    model = application.behavior = new ApplicationBehavior();
    application.add(mainColumn);