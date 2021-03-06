"use strict";


let formatTitleCard = Accounts => {
    let elements = [];
    Accounts.forEach(Account =>
        elements.push({
            title: Account.get("Name"),
            subtitle: Account.get("Description"),
            "image_url": Account.get("Picture_URL__c"),
            "buttons": [
                {
                    "type":"postback",
                    "title":"Hit Me",
                    "payload": "Show_Branches," + Account.getId() + "," + Account.get("Name")
                    
                }]
        })
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};


let formatQuickReplies = Accounts => {    
  let elements = [];
    Accounts.forEach(Account =>          
        elements.push({
             "content_type":"text",
             "title":Account.get("Name"),
             "payload":"Show_Branches,"         
         })
    );
    return {
        "text": "Please choose your location:",
         "quick_replies": elements
    };  
};

let formatOpenBranches= Accounts => {
    let elements = [];
    Accounts.forEach(Account =>
        elements.push({            
	     "title": "hi", 	///Account.get("Name"),
            "image_url": "http://dailyolivian.com/wp-content/uploads/2016/10/topfive.jpg", 	//Account.get("Picture_URL__c"),
	    "subtitle": "hello",  //Account.get("Description"),
	    "default_action": {
                        "type": "web_url",
                        "url": "http://dailyolivian.com/wp-content/uploads/2016/10/topfive.jpg",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": "http://dailyolivian.com/wp-content/uploads/2016/10/topfive.jpg/"
            },
            "buttons": [
                {
	            "title": "View", 		 
                    "type":"web_url",
		     "url": "http://dailyolivian.com/wp-content/uploads/2016/10/topfive.jpg",
		     "messenger_extensions": true,
		     "webview_height_ratio": "tall",
		     "fallback_url": "http://dailyolivian.com/wp-content/uploads/2016/10/topfive.jpg/"                    
                }
	    ]				      
        })
		     
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",  
                //"elements": elements,
	        "elements": [
			{
			    "title": "Classic White T-Shirt",
			    "image_url": "https://peterssendreceiveapp.ngrok.io/img/white-t-shirt.png",
			    "subtitle": "100% Cotton, 200% Comfortable",
			    "default_action": {
				"type": "web_url",
				"url": "https://peterssendreceiveapp.ngrok.io/view?item=100",
				"messenger_extensions": true,
				"webview_height_ratio": "tall",
				"fallback_url": "https://peterssendreceiveapp.ngrok.io/"
			    },
			    "buttons": [
				{
				    "title": "Buy",
				    "type": "web_url",
				    "url": "https://peterssendreceiveapp.ngrok.io/shop?item=100",
				    "messenger_extensions": true,
				    "webview_height_ratio": "tall",
				    "fallback_url": "https://peterssendreceiveapp.ngrok.io/"                        
				}
			    ]                
			}         
		    ],    
		    
	    	"buttons": [
			 {
			    "title": "View More",
			    "type": "postback",
			    "payload": "payload"                        
			 }
             	]     
            }
        }
    };
	
	
};

/*let formatMainMenus= MainMenus => {
  let elements = [];
    MainMenus.forEach(Menu__c =>
        elements.push({
            "title": Menu__c.get("Name"),
            //"subtitle": Menu.get("Name"),
            "image_url": "https://farm8.staticflickr.com/7060/13265139384_9f686fb476_o.jpg",
            "buttons": [
                {
                    "type":"postback",
                    "title":"View Me",
                    "payload": "Sub_Menu,"
                    
                }]
        })
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};*/



let formatMainMenus= MainMenus => {
  let elements = [];
    MainMenus.forEach(Menu__c =>
        elements.push({
            "title": Menu__c.get("Product__r").Name,
            "subtitle": Menu__c.get("Product__r").Description,
            "image_url": Menu__c.get("Product__r").PICURL__c,
            "buttons": [
                {
                    "type":"postback",
                    "title":"SHOW ITEMS",
                    "payload": "Sub_Menu,"  +  Menu__c.get("Account__c") + "," + Menu__c.get("Product__c")
                    
                }]
        })
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};

let formatSubMenus= SubMenus => {
  let elements = [];
    SubMenus.forEach(Menu__c =>
        elements.push({
            "title": Menu__c.get("Product__r").Name,
            "subtitle": Menu__c.get("Product__r").Description,
            "image_url": Menu__c.get("Product__r").PICURL__c,
            "buttons": [
                {
                    "type":"postback",
                    "title":"ADD TO CART - ₹" + Menu__c.get("Price__c"),
                    "payload": "Quantity,"  +  Menu__c.get("Id") 
                    
                }]
        })
    );
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
        }
    };
};
/* Hitendar */
let formatQuantity= SelectedMenu => {
    let elements = [];
    
    //Stringify the data that you want to pass as a payload	
   
    //var obj = { 'PrevMenuSelection': SelectedMenu[0].get("Product__c") + "," + SelectedMenu[0].get("Price__c") };
    
    var obj = { 'PrevMenuSelection': SelectedMenu[0].get("Product__c") ,  'Price':  SelectedMenu[0].get("Price__c") };
	
    var shouldSend = JSON.stringify(obj);
    console.log( 'After Stringify**' +  shouldSend );
    
  /* //And then parse JSON string when you recieve the payload.
   var jsonContent  = JSON.parse(shouldSend);   
   console.log( 'Immediate After Parsing**' + jsonContent );	
   console.log( 'After Parsed Values**' + jsonContent.PrevMenuSelection );		
   console.log( 'Incoming Product**' + jsonContent[0]);	*/	
	
	
    for (var i = 1; i <= SelectedMenu[0].get("Quantity__c"); i++) {
		elements.push({
			"content_type":"text",
			"title":i,
			//"payload":"Save_Order," + SelectedMenu[0].get("Product__c") + "," + SelectedMenu[0].get("Quantity__c") + "," + SelectedMenu[0].get("Price__c")		
			"payload":shouldSend 		
		});
	    	console.log('jus verification count loopthrough**' + shouldSend);
	}
    return {

	"text": "How many items of" + '<-->' + SelectedMenu[0].get("Product__r").Name + '<-->' + "do you need?",    
         "quick_replies": elements
    };  
	
};
/* Hitendar */


exports.formatTitleCard = formatTitleCard;
exports.formatQuickReplies = formatQuickReplies;
exports.formatOpenBranches = formatOpenBranches;
exports.formatMainMenus = formatMainMenus;
exports.formatSubMenus = formatSubMenus;
exports.formatQuantity = formatQuantity;
