
Template.header.helpers({
    create: function(){
        Session.set("myTemplate", 'generator');

    },
    rendered: function(){

    },
    destroyed: function(){

    },
});

Template.header.events({
    "click #zufall": function(event, template){
        console.log("clicked zufall");
        Session.set("myTemplate", 'generator');
        

    },
    "click #games": function(event, template){
        console.log("clicked games");
        Session.set("myTemplate", 'gamesTable');

    },
    "click #player": function(event, template){
        console.log("clicked player");
        Session.set("myTemplate", 'playersTable');

    }
});
