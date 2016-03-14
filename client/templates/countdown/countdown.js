Meteor.startup(function () {
    var endtime = 'April 1 2016 16:00:00 UTC+0100';
    timeinterval = setInterval(function () {
        Meteor.call("getCurrentTime", function (error, result) {
            Session.set("time", result);
            var t = getTimeRemaining(endtime);
            Session.set("t", t);
        });
    }, 1000);
});


Template.countdown.helpers({
    t: function () {
        return Session.get("t");
    },
    ended:function () {
        console.log(Session.get("t").total <= 0);
        return Session.get("t").total <= 0;
    }
});

Template.countdown.events({
    "click #foo": function(event, template){

    }
});

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Session.get('time');
    var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
    var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);
    var hours = ("0" + Math.floor( (t/(1000*60*60)) % 24 )).slice(-2);
    var days = Math.floor( t/(1000*60*60*24) );

    //console.log(t)
    if(t <= 0)
    clearInterval(timeinterval);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };

}
