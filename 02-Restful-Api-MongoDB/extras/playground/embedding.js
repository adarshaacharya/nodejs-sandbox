
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-games", {
    useUnifiedTopology: true,
    useNewUrlParser: true 
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

// Publisher Schema
const publisherSchema = new mongoose.Schema({
    companyName: String,
    firstParty: Boolean,
    website: String
})
 
// Publisher Model
const Publisher = mongoose.model('Publisher', publisherSchema);
 
// Game Schema
const gameSchema = new mongoose.Schema({
    title: String,
    publisher: publisherSchema
})
 
// Game Model
const Game = mongoose.model('Game', gameSchema);


async function createGame(title, publisherSchema) {
    const game = new Game({
        title :title,
        publisher : publisherSchema
    });
 
    const result = await game.save();
    console.log(result);
}
 
// createGame('Three Foot Ninja', new Publisher({ companyName: 'Ubisoft', firstParty: false, website: 'https://www.ubisoft.com/' }))





// update the publisher which is embedded in games
async function updatePublisher(gameId) {
    const game = await Game.findById(gameId);
    game.publisher.companyName = 'Epic Games';
    game.publisher.website = 'https://epicgames.com/';
    game.save();
    console.log(game)
}


// update publisher subdocument directly
// async function updatePublisher(gameId) {
//     const game = await Game.update({ _id: gameId }, {
//         $set: {
//             'publisher.companyName': 'Leapfrog Gaming Ninja',
//             'publisher.website': 'https://lftech.net/'
//         }
//     });

    
// }

updatePublisher('5da96b1ab4411147f2e146bb') // give id of games and update the publisher


