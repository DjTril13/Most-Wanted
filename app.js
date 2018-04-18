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
  return newArray;}

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

function searchByAge(people) {
  let newArray = []
  let userInputAge = prompt("What is the person's age?");
  let arrayOfStringDates = people.map(function(people){return people.dob}); 
  for (i = 0; i < arrayOfStringDates.length; i ++)
    { let dobArray = arrayOfStringDates[i].split("/");
      let dobMonth = parseInt(dobArray[0])
      let dobDay = parseInt(dobArray[1])
      let dobYear = parseInt(dobArray[2])
      let date = new Date();
      let todaysYear = date.getFullYear();
      let todaysMonth = date.getMonth();
      let todaysDay = date.getDay();
      let age
      if (todaysMonth > dobMonth) {age = todaysYear - dobYear}
        else {if (todaysMonth < dobMonth){age =todaysYear - dobYear - 1}
          else {if (todaysDay < dobDay){age =todaysYear - dobYear - 1}
            else {age = todaysYear - dobYear}}};  
            if (userInputAge == age)
              {newArray.push(people[i]);}}
          return newArray;}



// function searchByAge2(people){
//   let userInputAge = prompt("What is the person's age?");


// }
            
      


//  function calculaeDobNumbers(arrayOfStringDates)
//  {
//   let arrayOfStringDates = people.map(function(people){return people.dob}); 
//     for (i = 0; i < arrayOfStringDates.length; i ++)
//     { let dobArray = arrayOfStringDates[i].split("/");
//       let dobMonth = parseInt(dobArray[0])
//       let dobDay = parseInt(dobArray[1])
//       let dobYear = parseInt(dobArray[2])
//     }

// function calculateAge(dobMonth,dobYear,dobDay)
// {
//       let date = new Date();
//       let todaysYear = date.getFullYear();
//       let todaysMonth = date.getMonth();
//       let todaysDay = date.getDay();
//       let age
//       if (todaysMonth > dobMonth) {age = todaysYear - dobYear}
//         else {if (todaysMonth < dobMonth){age =todaysYear - dobYear - 1}
//           else {if (todaysDay < dobDay){age =todaysYear - dobYear - 1}
//             else {age = todaysYear - dobYear}}};  
//             let arrayAge = [age]
//             return arrayAge
// }





// Menu function to call once you find who you are looking for
function mainMenu(person, people){
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){alert("Could not find that individual.");
    return app(people);}

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
		displayPerson(person);
    break;
    case "family":
		findImmediateFamily(person, people);
    break;
    case "descendants":
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }}

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


// // alerts a list of people
// function displayPeople(people){
//   alert(people.map(function(person){
//     return person.firstName + " " + person.lastName;
//   }).join("\n"));
// }

// alerts a list of people


function displayPerson(person){
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
