console.log('js');

$(document).ready(handleReady);

let employees = [{firstName: 'Maggie', lastName:'Jenkins', idNum: '163829', title: 'me', salary: '65000'},
                 {firstName: 'louie', lastName:'jenkins', idNum: '4509 ', title: 'dog', salary: '1'}, 
                 {firstName: 'Francis', lastName:'Jenkins', idNum: '4509', title: 'cat', salary: '100000'},
                 {firstName: 'megan', lastName:'Kirschner', idNum: '6188', title: 'bae', salary: '45000'},
                 {firstName: 'Chloe', lastName:'Barim', idNum: '10', title: 'kid', salary: '20'},
                 {firstName: 'Sasha', lastName:'barim', idNum: '8', title: 'kid', salary: '20'}];

function handleReady() {
     console.log('jquery');

     $('#submitButton').on('click', addEmployee);
     
     $('#tableBody').on('click', '.delete', deleteEmployee);

     //update DOM with preloaded employee array for testing
     render()
 }

 // creates new employee object from input fields, adds it to employees array,
 // calls sort to sort employees alphabetically by last name; calls render to 
 // update DOM
 function addEmployee() {
    console.log('addEmployee func');
    // create new employee object from inputs
    const newEmployee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        idNum: ($('#idNumInput').val()),
        title: $('#titleInput').val(),
        salary: Number($('#salaryInput').val())
    }
    console.log('add:', newEmployee);
    // add employee to employee array
    employees.push(newEmployee);
    // empty input fields
    $('#firstNameInput').val('');
    $('#lastNameInput').val('');
    $('#idNumInput').val('');
    $('#titleInput').val('');
    $('#salaryInput').val('');

    sort();
    render();
 }

 // iterates through employees array and creates a row with appropriate data
 // fields and delete button for each employee; calls updateTotalMonthly to
 // handle update for total monthly
 function render() {
    console.log('render func');

    $('#tableBody').empty();
    // fill in table with employees from employee array and add delete button with id corresponding to employee idNum
    for (let employee of employees) {
        $('#tableBody').append(`<tr>
            <td class="firstNamCol">${employee.firstName}</td>
            <td class="lastNameCol">${employee.lastName}</td>
            <td class="idCol">${employee.idNum}</td>
            <td class="titleCol">${employee.title}</td>
            <td class="salaryCol">$${employee.salary.toLocaleString("en-US")}</td>
            <td id="${employee.idNum}" class="delete button"><button>DELETE</button></td>
        </tr>`)
    }   
    // call function to update total monthly cost
    updateTotalMonthly();
 }

 // calculates sum of annual employee salaries, converts annual total to
 // monthly, adds highlight class if total exceeds 20000, and updates DOM with
 // new total monthly
 function updateTotalMonthly() {
    console.log('updateTotalMonthly func')
    let annualTotal = 0;
    // sum employee salaries
    for (let employee of employees) {
        annualTotal += Number(employee.salary); // only need Number temporarily while working with test array
    }
    // convert annual to total monthly cost
    totalMonthly = (annualTotal/12)
    // add highligh class if total monthly exceeds 20000
    if (totalMonthly > 20000) {
        $('#displayTotal').addClass("highlight");
    }
    // remove highlight if total is no longer above $20,000
    else {
        $('#displayTotal').removeClass("highlight")
    }
    
    $('#totalMonthly').empty();
    // update DOM with new total formatted with commas and two decimal places
    $('#totalMonthly').append(totalMonthly.toLocaleString("en-US", {style: 'currency', currency: 'USD'}));
 }

 // targets employee based on delete button clicked, removes employee from
 // employees array; calls render to update DOM and total monthly
 function deleteEmployee() {
    console.log('deleteEmployee func'); 
    // find idNum for targeted employee using delete button's id
    thisID = $(this).attr('id');
    // remove selected employee from employees array
    for (let i=0; i < employees.length; i++) {
        if (employees[i].idNum == thisID) {
            console.log('remove:', employees[i]);
            employees.splice(i, 1);
        }
    }
    // update DOM
    render()
 }

 // sorts table alphabetically by last name
 // -----> want to improve by adding switch statement depending on which heading tab is clicked
 function sort() {
    console.log('sort func');
    employees.sort( function(emp1, emp2) {
        //converts all letters to lowercase before comparing
        emp1 = emp1.lastName.toLowerCase();
        emp2 = emp2.lastName.toLowerCase();
        if (emp1 > emp2) 
            return 1;
        else if (emp1 < emp2) 
            return -1;
        else return 0;
        }
    )
 }


 /* TO-DO :
 * add switch statement to sort based on which heading is clicked
 * add click events for table headings
 * add alert if duplicate ids are entered*/
