
FIREWORKS_DURATION = 1500; //in ms
COUNTDOWN_LENGHT = 3000; //in ms

var secondRun = false;

Template.generator.onRendered(function () {
    secondRun = false;

    this.autorun(function () {
        var drink = Drinks.findOne({selected: true});
        Session.set("animate", "animate");
    });

    this.autorun(function(c){
        var alert = Alerts.findOne({},{reactive: false});
        if(c.firstRun){
            //idiotic workaround
            //because iron:router
            //triggers loading twice
            if (secondRun){
                countdown();
            } else {
                secondRun = true;
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
            $('html, body').css({
                "background-color": "#333",
            });
            $(".btn.countdown").text("Nochmal!");

        } else {
            var color = '#'+Math.floor(Math.random()*16777215).toString(16);
            $('html, body').css({
                "background-color": color,
            });
        }
    }, 10);
}

var countdown = function(){
    Session.set("animate", "");
    var currentCountdownValue = COUNTDOWN_LENGHT/1000
    $(".btn.countdown").text(currentCountdownValue);
    var countdownInterval =  Meteor.setInterval(function () {
        currentCountdownValue = currentCountdownValue-1
        if (currentCountdownValue < 1){
            $(".btn.countdown").text("");
            Meteor.clearInterval(countdownInterval)
            fireworks();
        }else {
            $(".btn.countdown").text(currentCountdownValue);
        }
    }, 1000);
}
