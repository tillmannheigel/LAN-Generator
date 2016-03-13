
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
                var startTime = new Date().getTime();
                var backgroundInterval =  Meteor.setInterval(function () {
                    if(new Date().getTime() - startTime > 3000){
                        clearInterval(backgroundInterval);
                        $('html, body').css({
                            "background-color": "#333",
                        });
                    } else {
                        var color = '#'+Math.floor(Math.random()*16777215).toString(16);
                        $('html, body').css({
                            "background-color": color,
                        });
                    }
                }, 10);
                //New Player, new Game, new Drink <-- here!
            }else {
                $(event.target).text(currentTime);
            }
        }, 1000);

    }
});
