require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});


const Person = mongoose.model("Person", personSchema);


//let Person;

const createAndSavePerson = (done) => {
  const personDoc = new Person({name: "Naren", age: 26, favoriteFoods: ["Biriyani", "Pasta", "Shawarma"]});
  personDoc.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  
};

var arrayOfPeople = [{name: "Vijay", age: 27, favoriteFoods: ["Pulao", "Chaat"]}, {name: "ShriHari", age: 26, favoriteFoods: ["Biriyani", "Shawarma"]}, 
               {name: "Sanjay", age: 26, favoriteFoods: ["Biriyani"]}];

const createManyPeople = (arrayOfPeople, done) => {
  //done(null /*, data*/);
  Person.create(arrayOfPeople, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  });
};

//var personName = {name: "Naren"};

const findPeopleByName = (personName, done) => {
  //done(null /*, data*/);
  Person.find({name: personName}, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  });
};


const findOneByFood = (food, done) => {
  //done(null /*, data*/);
  Person.findOne({favoriteFoods: [food]}, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  //done(null /*, data*/);
  Person.findById({_id: personId}, function(err, data){
    if(err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  
  Person.findOneAndUpdate(personName, {age: ageToSet}, { new: true }, function(err, updatedDoc){
    if(err) return console.log(err);
    done(null, updatedDoc)
  });
  
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove({_id: personId}, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  //done(null /*, data*/);
  
  Person.remove({name: nameToRemove}, (err, removeAllDocsMatching) => {
    if(err) return console.log(err);
    done(null, removeAllDocsMatching);
  });
};

const queryChain = (done) => {
  
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
           .sort({name:1})
           .limit(2)
           .select({age:0})
           .exec(function(err,data){
    if(err) return console.log(err)
    done(null, data)
  });
  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
