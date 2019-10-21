const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-games", {
    useUnifiedTopology: true,
    useNewUrlParser: true 
  })
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));


const publisherSchema = new mongoose.Schema({
  companyName: String,
  firstParty: Boolean,
  website: String
});
const Publisher = mongoose.model("Publisher", publisherSchema);



const gameSchema = new mongoose.Schema({
    title: String,
    publisher : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Publisher'
    }
})
const Game = mongoose.model("Game", gameSchema);



async function createPublisher(name, firstParty, site) {
  const publisher = new Publisher({
    companyName : name,
    firstParty : firstParty,
    website : site
  });

  const result = await publisher.save();
  console.log(result);
}


async function createGame(title, publisherId) {
  const game = new Game({
    title : title,
    publisher : publisherId
  });

  const result = await game.save();
  console.log(result);
}




async function listGames() {
  const games = await Game.find()
                      .populate('publisher', 'companyName-_id') // returns only companyName from publisher
                     


  console.log(games);
}



// createPublisher("Leapfrog Games", true, "https://www.leapfrog.com/");

// createGame('GTA Vicity', '5da9578fa638013747d4a3cb')

listGames()