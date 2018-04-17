/*
Build all of your functions for displaying and gathering information below (GUI).
*/




//calculate age from DOB

// app is the function called to start the entire application

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
		searchByName(people);
		break;
    case 'no':
		searchByTraits(people);
		break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

 // if (peopleWithTraits is not equal to undefined run this function again with subbing people of with traits instead of people ).   ++++++This is how i want to loop through a second time

  switch(userSearchChoice) {
    case "height":
		filteredPeople = searchByHeight(people);
		break;
    case "weight":
		filteredPeople = searchByWeight(people);
		break;
	case "eye color":
		filteredPeople = searchByEyeColor(people);
		break;
	case "gender":
		filteredPeople = searchByGender(people);
		break;
	case "age":
		filteredPeople = searchByAge(people);
		break;
	case "occupation":
		filteredPeople = searchByOccupation(people);
		break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;}

 if (filteredPeople.length > 1){
 displayPeople(filteredPeople);}

else{
  let foundPerson = filteredPeople[0];
  mainMenu(foundPerson, people);}}


function displayPeople(people){
  alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));
 let searchType = promptFor("Do you see the person your looking for?",yesNo).toLowerCase();
 switch(searchType){
    case 'yes':
    searchByName(people)
    break;
    case 'no':
    searchByTraits(people);
    break;
    // default:
    // alert("Wrong! Please try again, following the instructions dummy. :)");         !!! THIS DOESNT WORK
    // app(people); // restart app
    // break;
  }
  return people
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weight?");         // I am using this function for testing how to list multiple results
  let newArray = people.filter(function (el){if(el.weight == userInputWeight) {return true}});
  return newArray;
  }

function searchByHeight(people) {
  let userInputHeight = prompt("What is the person's height?");
  let newArray = people.filter(function (el) {if(el.height == userInputHeight){return true}});
  return newArray;}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's occupation?");
  let newArray = people.filter(function (el){if(el.occupation == userInputOccupation){return true}});
  return newArray;}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the person's eye color?");                            // SHOULD all these functions be combined into one since they all do nearly the same thing. 
  let newArray = people.filter(function (el){if(el.eyeColor == userInputEyeColor){return true}});
  return newArray;}

function searchByGender(people) {
  let userInputGender = prompt("What is the person's gender?");
  let newArray = people.filter(function (el) {if(el.gender == userInputGender) {return true;}});
  return newArray;}
    // return true if el.height matches userInputHeight

function searchByAge(people) {
  let userInputAge = prompt("What is the person's age?");
//find dob, split by '/' for array, convert to numbers, subtract years
  let newArray = people.filter(function (el) {if(el.age == userInputAge) {return true;}}); 
  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
		displayPerson(person);
    break;
    case "family":

    // TODO: get person's family
		findImmediateFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
var userFirstName = promptFor("What is the person's first name?", chars);
var userLastName = promptFor("What is the person's last name?", chars);
	let newArray = people.filter(function (el){
		if ((el.firstName == userFirstName) && (el.lastName == userLastName)) {
			return true;
		}
		//could be typed lowercase/no results found
	});
	mainMenu(newArray[0], people);
}

function findImmediateFamily (person, people){
//return persons immediate family - just full names
let immediateFamily = [];
let children = ["Children: "];
let siblings = ["Siblings: "];
let parents = ["Parents: "];
let spouse = ["Spouse: "];
	if (person.currentSpouse !== null){
		for (let i = 0; i < people.length; i++){
			if (person.currentSpouse == people[i].id){
				spouse.push(people[i].firstName + " " + people[i].lastName);
				
				break;
			}
		}
		immediateFamily.push(spouse);
	} else {
		spouse.push("Not Found");
		immediateFamily.push(spouse);
	}
	
	for (let i = 0; i < people.length; i++){
		for (let j = 0; j < people[i].parents.length; j++){
			if (people[i].parents[j] == undefined){
					break;
			} else {
				if (person.id == people[i].parents[j]) {
					children.push(people[i].firstName + " " + people[i].lastName);
				}
			}
		}
	}
	
	if (children.length > 1){
		immediateFamily.push(children);
	} else {
		children.push("Not Found");
		immediateFamily.push(children);
	}
	
	if (person.parents !== undefined){
		for (let i = 0; i < person.parents.length; i++){
			for (let j = 0; j < people[i].parents.length; j++){
				if (person.parents[j] == people[i].id){
					parents.push(people[j].firstName + " " + people[j].lastName);
				}
			}
		}
		immediateFamily.push(parents);
	} else {
		parents.push("Not Found");
		immediateFamily.push(parents);
	}
	
	if (person.parents !== undefined){
		for (let i = 0; i < person.parents.length; i++){
			for (let j = 0; j < people.length; j++){
				if ((person.parents[i] == people[j].parents[i]) && (person.id !== people[j].id) ){
					siblings.push(people[j].firstName + " " + people[j].lastName);
				}
			}
		}
		//this next line is to remove duplicates, as it is currently being looped twice for people with 2 parents listed
		//there should be a better way to solve this
		siblings = siblings.filter(function (x, y){return siblings.indexOf(x) == y;});
		immediateFamily.push(siblings);
	} else {
		siblings.push("Not Found");
		immediateFamily.push(siblings);
	}

displayFamily(immediateFamily);

}


//need another prompt for display family??
function displayFamily(people){
  alert(people.join("\n"));
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));
let searchType = promptFor("Do you see the person your looking for?",yesNo).toLowerCase();
 switch(searchType){
    case 'yes':
    searchByName(people)
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

// // alerts a list of people
// function displayPeople(people){
//   alert(people.map(function(person){
//     return person.firstName + " " + person.lastName;
//   }).join("\n"));
// }

// alerts a list of people


function displayPerson(person){
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
     personInfo += "Last Name: " + person.lastName + "\n";
    personInfo += "Gender: " + person.gender + "\n";
    personInfo += "Weight: " + person.weight + "\n";
    personInfo += "Age: " + person.dob + "\n";
    personInfo += "Eye Color : " + person.eyeColor + "\n";
    personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

function resultsNotFound(people){
	let userError = promptFor("The Criteria you have entered could not be found, Would you like to return to the previous screen?", yesNo).toLowerCase();
	if (userError == "yes"){
		return;
	}
	else{
		app(people);
	}
}
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// // helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
