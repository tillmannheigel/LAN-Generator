
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
    },
    "click #games": function(event, template){
        console.log("clicked games");
    },
    "click #player": function(event, template){
        console.log("clicked player");
    }
});
