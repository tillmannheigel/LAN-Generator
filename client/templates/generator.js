
Alerts = new Mongo.Collection('alerts');

FIREWORKS_DURATION = 1000; //in ms
COUNTDOWN_LENGHT = 3000; //in ms

Meteor.autosubscribe(function() {
  Alerts.find().observe({
    added: function(item){
      countdown()
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
});

Template.generator.events({
    "click .countdown": function(event, template){
        Meteor.setTimeout(function(){
            Meteor.call('resetAllPlayersAndSelectAnother');
            Meteor.call('resetAllGamesAndSelectAnother');
            Meteor.call('resetAllDrinksAndSelectAnother');
        }, FIREWORKS_DURATION+COUNTDOWN_LENGHT-50);
        countdown(event);
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
