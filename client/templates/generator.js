
FIREWORKS_DURATION = 1500; //in ms
COUNTDOWN_LENGHT = 3000; //in ms

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
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        if (currentMatch) {
            var currentVote = Session.get(currentMatch._id);
            var browserId = Session.get("browserId");
            Meteor.call("voteCurrentMatch", browserId, currentVote)
        }
    });

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
    currentMatch: function(){
        return CurrentMatch.findOne({},{sort: {createdAt: -1}});
    },
    matches: function(){
        return CurrentMatch.find({"accepted":true},{sort: {createdAt: -1}});
    },
    animate: function(){
        return Session.get('animate');
    },
    pollNo: function(){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        return Session.get(currentMatch._id)==="no";
    },
    pollYo: function(){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        return Session.get(currentMatch._id)==="yo";
    },
    pro:function(){
        return Helpers.countPro();
    },
    contra: function(){
        return Helpers.countNo();
    },
    nextRound: function(){
        return (Helpers.countPro() > 3 || Helpers.countNo() > 3);
    }
});

Template.generator.events({
    "click .countdown": function(event, template){
        console.log("pro: ",Helpers.countPro());
        console.log("contra: ",Helpers.countNo());
        Meteor.setTimeout(function(){
            Meteor.call('getNextMatch');
        }, FIREWORKS_DURATION+COUNTDOWN_LENGHT-50);
        countdown();
        Alerts.insert({"event":"countdown"});
    },
    "click #yo.btn": function(event, template){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        console.log("clicked yo", currentMatch._id, "browser:", Session.get("browserId"));
        Session.setPersistent(currentMatch._id, "yo");
    },
    "click #no.btn": function(event, template){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        console.log("clicked no", currentMatch._id, "browser:", Session.get("browserId"));
        Session.setPersistent(currentMatch._id, "no");

    },
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
