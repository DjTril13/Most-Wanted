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
    app(people);
    break;}}

function searchByTraits(people) {
  let filteredPeople = people;
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'. Please list, separated by commas, without spaces").split(",");
  //let functionOptions = ["height":searchByHeight(people),"weight":searchByWeight(people),"eye color":searchByEyeColor(people),"gender":searchByGender(people),"age":searchByAge(people),"occupation":searchByOccupation(people)]
  for(let i = 0; i < userSearchChoice.length; i++)
  {filteredPeople = switchTraits(userSearchChoice[i].trim(),filteredPeople)}

 if (filteredPeople.length > 1){
 displayPeople(filteredPeople);}

else {let foundPerson = filteredPeople[0];
      mainMenu(foundPerson, people);}}

function  switchTraits (traitSearch, people){
   let filteredPeople
   switch(traitSearch) {
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
        return filteredPeople}

function displayPeople(people){
  alert(people.map(function(person){return person.firstName + " " + person.lastName;}).join("\n"));
  let searchType = promptFor("Do you see the person your looking for?",yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;}
    return people}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weight?");
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

// function searchByAge(people) {
//   let newArray = []
//   let userInputAge = prompt("What is the person's age?");
//   let arrayOfStringDates = people.map(function(people){return people.dob}); 
//   for (let i = 0; i < arrayOfStringDates.length; i ++)
//     { let dobArray = arrayOfStringDates[i].split("/");
//       let dobMonth = parseInt(dobArray[0])
//       let dobDay = parseInt(dobArray[1])
//       let dobYear = parseInt(dobArray[2])
//       let date = new Date();
//       let todaysYear = date.getFullYear();
//       let todaysMonth = date.getMonth();
//       let todaysDay = date.getDay();
//       let age
//       if (todaysMonth > dobMonth) {age = todaysYear - dobYear}
//         else {if (todaysMonth < dobMonth){age =todaysYear - dobYear - 1}
//           else {if (todaysDay < dobDay){age =todaysYear - dobYear - 1}
//             else {age = todaysYear - dobYear}}};  
//             if (userInputAge == age)
//               {newArray.push(people[i]);}}
//           return newArray;}


function searchByAge(people) {
 let userInputAge = prompt("What is the person's age?");
 let newArray = [];
 for (i = 0; i < people.length; i ++){
 let age = calculateAge(people);
 if (userInputAge == age){
      newArray.push(people[i]);}}
      return newArray;}

function calculateAge(people){
 let arrayOfStringDates = people.map(function(people){return people.dob});
     let dobArray = arrayOfStringDates[i].split("/");
     let dobMonth = parseInt(dobArray[0])
     let dobDay = parseInt(dobArray[1])
     let dobYear = parseInt(dobArray[2])
     let date = new Date();
     let todaysYear = date.getFullYear();
     let todaysMonth = date.getMonth();
     let todaysDay = date.getDay();
     let age;
     if (todaysMonth > dobMonth) {age = todaysYear - dobYear}
       else {if (todaysMonth < dobMonth){age = todaysYear - dobYear - 1}
         else {if (todaysDay < dobDay){age = todaysYear - dobYear - 1}
           else {age = todaysYear - dobYear}}};  
           return age;}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
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
		let descendantsResults = findDescendants(person, people);
		displayFamily(descendantsResults);
		break;
    case "restart":
		app(people);
		break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);}}

function searchByName(people){
var userFirstName = promptFor("What is the person's first name?", chars);
var userLastName = promptFor("What is the person's last name?", chars);
	let newArray = people.filter(function (el){
		if ((el.firstName == userFirstName) && (el.lastName == userLastName)) {
			return true;}});
	mainMenu(newArray[0], people);}

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


function displayFamily(people){alert(people.join("\n"));}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
      personInfo += "Last Name: " + person.lastName + "\n";
      personInfo += "Gender: " + person.gender + "\n";
      personInfo += "Weight: " + person.weight + "\n";
      personInfo += "Age: " + person.dob + "\n";
      personInfo += "Eye Color : " + person.eyeColor + "\n";
      personInfo += "Occupation: " + person.occupation + "\n";
      alert(personInfo);}

function resultsNotFound(people){
	let userError = promptFor("The Criteria you have entered could not be found, Would you like to return to the previous screen?", yesNo).toLowerCase();
	if (userError == "yes"){return;}
	else {app(people);}}

function promptFor(question, valid){
  do {var response = prompt(question).trim();} 
  while(!response || !valid(response));
  return response;}

function yesNo(input){return input.toLowerCase() == "yes" || input.toLowerCase() == "no";}

function chars(input){return true;}
