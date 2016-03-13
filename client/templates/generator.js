
Template.generator.helpers({
    create: function(){

    },
    rendered: function(){

    },
    destroyed: function(){

    },
});

Template.generator.events({
    "click .countdown": function(event, template){
        console.log("countdown clicked");
        var currentTime = 3
        $(event.target).text(currentTime);
        var myInterval =  Meteor.setInterval(function () {
            currentTime = currentTime-1
            if (currentTime < 0){
                Meteor.clearInterval(myInterval)
                $(event.target).text("Nochmal!");
                //New Player, new Game, new Drink <-- here!
            }else {
                $(event.target).text(currentTime);
            }
        }, 1000);

    }
});
