
Template.newDrink.helpers({
    create: function(){

    },
    rendered: function(){

    },
    destroyed: function(){

    },
});

Template.newDrink.events({
    "submit #drinkForm": function(event, template){
        event.preventDefault();
        var form =  $('#drinkForm').serializeArray();
        console.log("newDrink", form[0]["value"]);
        var drink = form[0]["value"];
        Drinks.insert({"drink":drink});
        $('#drinkForm')[0].reset();
        $('.modal.in').modal('hide');
    }
    
});
