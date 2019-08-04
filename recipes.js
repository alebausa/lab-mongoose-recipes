const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

Recipe.create({
  title: "Fromagge Omelette",
  level: "Easy Peasy",
  ingredients: ["eggs", "ham", "cheese"],
  cuisine: "French",
  dishType: "Breakfast",
  duration: 10,
  creator: "Mr.Fromage"
})
  .then(recipe => {
    console.log("Recipe saved: ", recipe.title);
  })
  .catch(err => {
    console.log("Error ", err);
  });

Recipe.insertMany(data)
  .then(() => {
    console.log("Many new recipes saved!");
  })
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
    console.log("Recipe updated!");
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe deleted");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error ", err);
    mongoose.connection.close();
  });

// L'he fet servir per borrar tot i tornar a fer proves refactoritzat
// Recipe.deleteMany({})
//   .then(() => {
//     console.log("All deleted!");
//   })
//   .catch(err => {
//     console.log("Error ", err);
//     mongoose.connection.close();
//   });
