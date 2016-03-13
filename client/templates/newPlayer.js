
Template.newPlayer.helpers({
    create: function(){
    },
    rendered: function(){
    },
    destroyed: function(){
    },
});

Template.newPlayer.events({
    "submit #playersForm": function(event, template){
        event.preventDefault();
        var form =  $('#playersForm').serializeArray();
        console.log("newPlayer", form[0]["value"]);
        var name = form[0]["value"];
        Players.insert({"name":name, "keptBar":0});
        $('#playersForm')[0].reset();
        $('.modal.in').modal('hide');
    }
});
