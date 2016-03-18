Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');
Drinks = new Mongo.Collection('drinks');
CurrentMatch = new Mongo.Collection('currentSelection');
Votes = new Mongo.Collection('vote');

//used as bus replacement
Alerts = new Mongo.Collection('alerts');

//workaround: need at least one match
if(CurrentMatch.find().count() === 0){
    Drinks.insert({_id:"DUMMY", drink: "DUMMY"});
    Games.insert({_id:"DUMMY",  game: "DUMMY"});
    Players.insert({_id:"DUMMY",  name: "DUMMY"});
    CurrentMatch.insert({game: "DUMMY", player:"DUMMY", drink:"DUMMY"});
}
