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
    searchByName(people);
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
  let userInputWeight = checkForNumberInput("How much does the person weigh?", chars);         // I am using this function for testing how to list multiple results
  let newArray = people.filter(function (el){if(el.weight == userInputWeight) {return true}});

  return newArray;
  }

function searchByHeight(people) {
  let userInputHeight = checkForNumberInput("What is the person's height?", chars);
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
  let userInputAge = checkForNumberInput("What is the person's age?", chars);
//find dob, split by '/' for array, convert to numbers, subtract years
  let newArray = people.filter(function (el) {if((calcAge(people)) == userInputAge) {return true;}}); 
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
		findImmediateFamily(person, people);
		break;
    case "descendants":
		let descendantsResults = findDescendants(person, people);
		displayFamily(descendantsResults);
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
var userFirstName = promptFor("What is the person's first name?", chars).toLowerCase();
var userLastName = promptFor("What is the person's last name?", chars).toLowerCase();
	let newArray = people.filter(function (el){
		if ((el.firstName.toLowerCase() == userFirstName) && (el.lastName.toLowerCase() == userLastName)) {
			return true;
		}
		//could be typed lowercase/no results found
	});
	mainMenu(newArray[0], people);
}

function findImmediateFamily (person, people){
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
	
	let childrenResults = findChildren(person, people);
	if (childrenResults.length > 0){
		children.push(childrenResults);
		immediateFamily.push(children);
	} else {
		children.push("Not Found");
		immediateFamily.push(children);
	}

	if (person.parents.length > 0){
		let parentResults = findParents(person, people);
		parents.push(parentResults);
		immediateFamily.push(parents);
	} else {
		parents.push("Not Found");
		immediateFamily.push(parents);
	}
	
	if (person.parents.length > 0){
		let siblingsResults = findSiblings(person, people);
			if (siblingsResults.length > 1){
				siblings.push(siblingsResults);
				immediateFamily.push(siblings);
			} else {
				siblings.push("Not Found");
				immediateFamily.push(siblings);
			}
	} else {
		siblings.push("Not Found");
		immediateFamily.push(siblings);
	}

displayFamily(immediateFamily);
}

function findParents(person, people, parents = []){
	for (let i = 0; i < person.parents.length; i++){
		let parentToFind = person.parents[i];
		let foundParents = people.filter(function(el){ return el.id === parentToFind });
		parents.push(foundParents[0].firstName + " " + foundParents[0].lastName);	
	}
	return parents;
}

function findSiblings(person, people, siblings = []){
	for (let i = 0; i < person.parents.length; i++){
		for (let j = 0; j < people.length; j++){
			if ((person.parents[i] == people[j].parents[i]) && (person.id !== people[j].id) ){
				siblings.push(people[j].firstName + " " + people[j].lastName);
			}
		}
	}
	siblings = siblings.filter(function (x, y){return siblings.indexOf(x) == y;});
	return siblings;
}

function findChildren(person, people, children = []){
for (let i = 0; i < people.length; i++){
	for (let j = 0; j < people[i].parents.length; j++){
		if (person.id == people[i].parents[j]){
			children.push(people[i].firstName + " " + people[i].lastName);
		}
		}
	}
	return children;
}

function findDescendants(person, people, descendants = []){

	for (let i = 0; i < people.length; i++){
		for (let j = 0; j < people[i].parents.length; j++){
			if (person.id == people[i].parents[j]){
				findDescendants(people[i], people, descendants);
				descendants.push(people[i].firstName + " " + people[i].lastName);		
			}
		}
	}
	return descendants;
}

function displayFamily(people){
  alert(people.join("\n"));
}

// alerts a list of people
// function displayPeople(people){
  // alert(people.map(function(person){
    // return person.firstName + " " + person.lastName;
  // }).join("\n"));
// }


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

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function checkForNumberInput(question, valid){
  do{
    var response = prompt(question).trim();
	if (isNaN(Number(response))){
		alert("Please enter a valid number for this criteria");
		response = false;
	}else {response = response;}
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
