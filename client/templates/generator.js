
FIREWORKS_DURATION = 1500; //in ms
COUNTDOWN_LENGHT = 3000; //in ms

var firstRun = true;

Template.generator.onCreated(function () {
    firstRun = true;
});

Template.generator.onCreated(function () {
    Session.set("animate", "animate");

    this.autorun(function(c){
        var alert = Alerts.find().fetch().length;
        if (alert > 0){
            if(!firstRun){
                console.log("secondRun", alert);
                countdown();
            } else {
                console.log("firstRun", alert);
                firstRun = false;
            }
        }
    });
});

Template.generator.helpers({
    currentDrink: function(){
        return Drinks.findOne({selected: true})
    },
    currentPlayer: function(){
        return Players.findOne({selected: true})
    },
    currentGame: function(){
        return Games.findOne({selected: true})
    },
    animate: function(){
        return Session.get('animate');
    }
});

Template.generator.events({
    "click .countdown": function(event, template){
        Meteor.setTimeout(function(){
            Meteor.call('resetAllPlayersAndSelectAnother');
            Meteor.call('resetAllGamesAndSelectAnother');
            Meteor.call('resetAllDrinksAndSelectAnother');
        }, FIREWORKS_DURATION+COUNTDOWN_LENGHT-50);
        countdown();
        Alerts.insert({"event":"countdown"});
    }
});


var fireworks = function(event){
    var startTime = new Date().getTime();
    var backgroundInterval =  Meteor.setInterval(function () {
        if(new Date().getTime() - startTime > FIREWORKS_DURATION){
            clearInterval(backgroundInterval);
            setBackgroundColorOrRandom("#333");
            setGeneratorButtonText("Nochmal!");
            Session.set("animate", "animate");
        } else {
            setBackgroundColorOrRandom();
        }
    }, 10);
}

var setBackgroundColorOrRandom = function(hexColor){
    if(!hexColor) {hexColor = '#'+Math.floor(Math.random()*16777215).toString(16);}
    $('html, body').css({
        "background-color": hexColor,
    });
};

var setGeneratorButtonText = function(text){
    $(".btn.countdown").text(text);
};

var countdown = function(){
    Session.set("animate", "");
    var currentCountdownValue = COUNTDOWN_LENGHT/1000
    $(".btn.countdown").text(currentCountdownValue);
    var countdownInterval =  Meteor.setInterval(function () {
        currentCountdownValue = currentCountdownValue-1
        if (currentCountdownValue < 1){
            setGeneratorButtonText();
            Meteor.clearInterval(countdownInterval);
            fireworks();
        }else {
            setGeneratorButtonText(currentCountdownValue);
        }
    }, 1000);
}
