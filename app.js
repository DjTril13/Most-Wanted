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
    // so on and so forth
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;

  }

 

if (filteredPeople.length > 1){
  displayPeople(filteredPeople);
}
else{
  let foundPerson = filteredPeople[0];
  mainMenu(foundPerson, people);
	}
} 
// function displayPeople(people){
//   alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));
//   let searchType = promptFor("Do you see the person your looking for?",yesNo).toLowerCase();
//   switch (searchType)
//   {search}

//   }
// }

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
	
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
//*******************************************************
function findImmediateFamily (person, people){
//return persons immediate family - just full names
// spouse => if then statement
// siblings => match parents arrays with others
// parents => match parents[i] to el.id
//children => el.id to parents' arrays (done?)

let immediateFamily = [];
let children = [];
let siblings = [];
let parents = [];
let spouse;
	if (person.currentSpouse !== null){
		for (let i = 0; i < people.length; i++){
			if (person.currentSpouse == people.id[i]){
				
				break;
			}
		}
	}

	for (let i = 0; i < people.length; i++){
		for (let j = 0; j < people[i].parents.length; j++){
			if (people[i].parents[j] == undefined){
					break;
			} else {
				if (person.id == people[i].parents[j]) {
					children.push(people[i].firstName + " " + people[i].lastName);
					console.log(children);
				}
			}
		}
	}

	
	
displayFamily(children);
}

//need another prompt for display family??
function displayFamily(people){
  alert(people.join("\n"));
}
//***************************************************************


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));

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

  promptFor("Do you see the person your looking for?",yesNo).toLowerCase();


}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
personInfo += "ID: " + person.id + "\n";

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

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
