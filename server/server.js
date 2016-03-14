Meteor.methods({
    resetAllDrinksAndSelectAnother:function(){
        var drinks = Drinks.find({selected: {$ne: true}}).fetch();
        var drinksIndex = Math.floor( Math.random() * drinks.length );
        Drinks.update({}, {
            $set: {selected: false}
        }, {multi: true});
        Drinks.update(drinks[drinksIndex]._id, {
            $set: {selected: true}
        });
    },
    resetAllPlayersAndSelectAnother:function(){
        var players = Players.find({selected: {$ne: true}}).fetch();
        var playersIndex = Math.floor( Math.random() * players.length );
        Players.update({}, {
            $set: {selected: false}
        }, {multi: true});
        Players.update(players[playersIndex]._id, {
            $set: {selected: true}
        });
    },
    resetAllGamesAndSelectAnother:function(){
        var games = Games.find({selected: {$ne: true}}).fetch();
        var gamesIndex = Math.floor( Math.random() * games.length );
        Games.update({}, {
            $set: {selected: false}
        }, {multi: true});
        Games.update(games[gamesIndex]._id, {
            $set: {selected: true}
        });
    },
    getCurrentTime: function (){
      return Date.parse(new Date());
    }
});
