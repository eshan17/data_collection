/*
15-237 Homework 2 Part 2
Carnegie Mellon University

Only the functions that say "TODO" need implementing
*/

// Gets the reference to our form and saves it in a variable
var alienForm = document.getElementById('alien-form');

// Attaching the submit event to the form.
// Different browsers do it differently so we include both ways below (grr IE)
if (alienForm.attachEvent) {
	alienForm.attachEvent("submit", processForm);
} else {
	alienForm.addEventListener("submit", processForm);
}

/*
This function is the form processor. It will take in the form
values and save them to an object. We then call the validation
function and (if valid) the updateTable function.

You should not have to edit this function.
*/
function processForm(e) {
	// By default, the HTML form will submit by POSTing to another page. We prevent this default behavior.
	// e is the event argument passed into the function
    if (e.preventDefault) e.preventDefault();

	// Get form data by accessing the DOM and store it in the formData object
	var formData = new Object();
	formData['alien-name'] = document.getElementById('alien-name').value;
	formData['alien-age'] = document.getElementById('alien-age').value;
	formData['alien-height'] = document.getElementById('alien-height').value;
	formData['alien-weight'] = document.getElementById('alien-weight').value;
	formData['alien-type'] = document.getElementById('alien-type').value;
	formData['alien-color'] = document.getElementById('alien-color').value;

	// Perform validation
	if (validateForm(formData)) {
		console.log('Validation passed');
		updateTable(formData);
		clearForm();
	} else {
		console.log('Validation failed');
	}
	
    // You must return false to prevent the default form submit behavior
    return false;
}


/*
TODO:
Return true if the form is valid, and false otherwise

All fields are required. Age, Height and Weight must be numeric.
Your validation has to check these criteria.

BONUS:
As a bonus, try to make the fields turn red if they are invalid!
This will require accessing the DOM from here
*/
function validateForm(formData) {

	var name = formData['alien-name'];
	var age = formData['alien-age'];
	var height = formData['alien-height'];
	var weight = formData['alien-weight'];
	var type = formData['alien-type'];
	var color = formData['alien-color'];

	if(typeof(name) == 'undefined' || typeof(age) == 'undefined' || typeof(height) == 'undefined' || typeof(weight) == 'undefined'
		|| typeof(type) == 'undefined' || typeof(color) == 'undefined')
	{
		return false;
	}

	if(isNaN(parseInt(age)) === true || isNaN(parseFloat(height)) === true || isNaN(parseFloat(weight)) === true)
		return false;

	return true;
}

/*
TODO:
This function uses the data inside formData to populate the table
with a new row.

You can create HTML elements dynamically using document.createElement.
For example, I might have var para = document.createElement('p');

Then, I can use document.getElementById('myDiv').appendChild(para); to
APPEND my paragraph element as a child at the bottom of myDiv. You can use
these techniques to build columns and rows.

Remember the table you are appending to has id 'alien-table'
*/
function updateTable(formData) {
	// We started for you.
    // Gets the first (and only) tbody tag within the alien-table
    // You will be appending rows to alienTableBody
    var alienTableBody = document.getElementById('alien-table').getElementsByTagName('tbody')[0];

    var row = document.createElement('tr');

    var name = document.createElement('td');
    var dataName = document.createTextNode(formData['alien-name']);
    name.appendChild(dataName);

    var age = document.createElement('td');
    var dataAge = document.createTextNode(formData['alien-age']);
    age.appendChild(dataAge);

    var height = document.createElement('td');
    var dataHeight = document.createTextNode(formData['alien-height']);
    height.appendChild(dataHeight);

    var weight = document.createElement('td');
    var dataWeight = document.createTextNode(formData['alien-weight']);
    weight.appendChild(dataWeight);

    var type = document.createElement('td');
    var dataType = document.createTextNode(formData['alien-type']);
    type.appendChild(dataType);

    var color = document.createElement('td');
    var dataColor = document.createTextNode(formData['alien-color']);
    color.appendChild(dataColor);

    row.appendChild(name);
    row.appendChild(age);
    row.appendChild(height);
    row.appendChild(weight);
    row.appendChild(type);
    row.appendChild(color);

    alienTableBody.appendChild(row);
}

/*
Resets the form and sets the focus back to the first field
*/
function clearForm() {
    alienForm.reset();
    document.getElementById('alien-name').focus();
}