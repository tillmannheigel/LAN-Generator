Meteor.methods({
    getNextMatch: function(){
        var drink = resetAllDrinksAndSelectAnother();
        var player = resetAllPlayersAndSelectAnother();
        var game = resetAllGamesAndSelectAnother();
        CurrentMatch.insert({"game":game, "player":player, "drink":drink, createdAt: new Date()});
    },
    getCurrentTime: function (){
        return Date.parse(new Date());
    },
    voteCurrentMatch: function(browserId, vote){
        var currentMatch = CurrentMatch.findOne({},{sort: {createdAt: -1}});
        var count = Votes.find({matchId: currentMatch._id, browserId: browserId}).count();
        if (count > 0) {
            Votes.remove({matchId: currentMatch._id, browserId: browserId});
        }
        Votes.insert({matchId: currentMatch._id, browserId: browserId, vote: vote});
        }
    });


    var resetAllDrinksAndSelectAnother = function(){
        var drinks = Drinks.find({selected: {$ne: true}}).fetch();
        var drinksIndex = Math.floor( Math.random() * drinks.length );
        return drinks[drinksIndex]._id;
    };

    var resetAllPlayersAndSelectAnother = function(){
        var players = Players.find({selected: {$ne: true}}).fetch();
        var playersIndex = Math.floor( Math.random() * players.length );
        return players[playersIndex]._id;
    };

    var resetAllGamesAndSelectAnother = function(){
        var games = Games.find({selected: {$ne: true}}).fetch();
        var gamesIndex = Math.floor( Math.random() * games.length );
        return games[gamesIndex]._id;
    };
