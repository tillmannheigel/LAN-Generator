
FIREWORKS_DURATION = 1500; //in ms
COUNTDOWN_LENGHT = 0; //in ms

var firstRun = true;

Template.generator.onCreated(function () {
    firstRun = true;
});

Template.generator.onCreated(function () {
    Session.set("animate", "animate");
    if (!Session.get("browserId")){
        Session.setPersistent("browserId", Random.id());
    }

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

    this.autorun(function(c){
        var selectedMatch = Helpers.getSelectedMatch();
        if(!c.firstRun){
            countdown();
        }
    });
});

Template.generator.helpers({
    currentMatch: function(){
        return Helpers.getCurrentMatch();
    },
    selectedMatch: function(){
        return Helpers.getSelectedMatch();
    },
    matches: function(){
        return CurrentMatch.find({selected: {$ne: true}, next: {$ne: true}},{sort: {createdAt: -1}});
    },
    animate: function(){
        return Session.get('animate');
    },
    pollNo: function(){
        var currentMatch = Helpers.getCurrentMatch();
        return Session.get(currentMatch._id)==="no";
    },
    pollYo: function(){
        var currentMatch = Helpers.getCurrentMatch();
        return Session.get(currentMatch._id)==="yo";
    },
    countYo:function(){
        return Helpers.countYo();
    },
    countNo: function(){
        return Helpers.countNo();
    },
    nextRound: function(){
        var currentMatch = Helpers.getCurrentMatch();
        if(currentMatch)
        return (Helpers.countNo() >= VOTE_MINIMUM || Helpers.countYo() >= VOTE_MINIMUM);
        else
        return true;
    }
});

Template.generator.events({
    "click .countdown": function(event, template){
        Meteor.setTimeout(function(){
            Meteor.call('getNextMatch');
        }, FIREWORKS_DURATION+COUNTDOWN_LENGHT-50);
        countdown();
        Alerts.insert({"event":"countdown"});
    },
    "click #yo.btn": function(event, template){
        var currentMatch = Helpers.getCurrentMatch();
        var currentVote = Session.get(currentMatch._id);
        var browserId = Session.get("browserId");
        if(currentVote == "yo"){
            Meteor.call("voteCurrentMatch", browserId, false);
            Session.setPersistent(currentMatch._id, false);
        } else {
            Meteor.call("voteCurrentMatch", browserId, "yo");
            Session.setPersistent(currentMatch._id, "yo");
        }
    },
    "click #no.btn": function(event, template){
        var currentMatch = Helpers.getCurrentMatch();
        var currentVote = Session.get(currentMatch._id);
        var browserId = Session.get("browserId");

        if (currentVote === "no"){
            Meteor.call("voteCurrentMatch", browserId, false);
            Session.setPersistent(currentMatch._id, false);
        } else {
            Meteor.call("voteCurrentMatch", browserId, "no");
            Session.setPersistent(currentMatch._id, "no");
        }
    },
});


var fireworks = function(event){
    var startTime = new Date().getTime();
    var backgroundInterval =  Meteor.setInterval(function () {
        if(new Date().getTime() - startTime > FIREWORKS_DURATION){
            clearInterval(backgroundInterval);
            setBackgroundColorOrRandom("#333");
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

var countdown = function(){
    Session.set("animate", "");
    var currentCountdownValue = COUNTDOWN_LENGHT/1000
    //$(".btn.countdown").text(currentCountdownValue);
    var countdownInterval =  Meteor.setInterval(function () {
        currentCountdownValue = currentCountdownValue-1
        if (currentCountdownValue < 1){
            //setGeneratorButtonText();
            Meteor.clearInterval(countdownInterval);
            fireworks();
        }else {
            setGeneratorButtonText(currentCountdownValue);
        }
    }, 1000);
}
