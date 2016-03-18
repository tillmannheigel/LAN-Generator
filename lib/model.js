Players = new Mongo.Collection('players');
Games = new Mongo.Collection('games');
Drinks = new Mongo.Collection('drinks');
CurrentMatch = new Mongo.Collection('currentSelection');
Votes = new Mongo.Collection('vote');

//used as bus replacement
Alerts = new Mongo.Collection('alerts');

//workaround: need at least one match
if(CurrentMatch.find().count() === 0){
    CurrentMatch.insert({game: "asd", player:"asd", drink:"asd"});
}
