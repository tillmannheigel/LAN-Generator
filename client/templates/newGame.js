
Template.newGame.helpers({
    create: function(){

    },
    rendered: function(){

    },
    destroyed: function(){

    },
});

Template.newGame.events({
    "submit #gamesForm": function(event, template){
        event.preventDefault();
        var form =  $('#gamesForm').serializeArray();
        console.log("newGame", form[0]["value"], form[1]["value"]);
        var game = form[0]["value"];
        var genre = form[1]["value"];
        Games.insert({"game":game, "genre":genre});
        $('#gamesForm')[0].reset();
        $('.modal.in').modal('hide');
    }
});
