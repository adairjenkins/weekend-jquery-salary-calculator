console.log('js');

$(document).ready(handleReady);

let employees = []; 

function handleReady() {
     console.log('jquery');

     $('#submitButton').on('click', addEmployee);
     
     $('#tableBody').on('click', '.delete', deleteEmployee);

 }

 // creates new employee object from input fields, adds it to employees array,
 // calls render to update DOM
 function addEmployee() {
    console.log('addEmployee func');
    // create new employee object from inputs
    const newEmployee = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNum: ($('#idNum').val()),
        title: $('#title').val(),
        salary: Number($('#salary').val())
    }
    console.log('add:', newEmployee);
    // add employee to employee array
    employees.push(newEmployee);
    // empty input fields
    $('#firstName').val('');
    $('#lastName').val('');
    $('#idNum').val('');
    $('#title').val('');
    $('#salary').val('');

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
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.idNum}</td>
            <td>${employee.title}</td>
            <td>${employee.salary}</td>
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
        annualTotal += employee.salary;
    }
    // convert annual to total monthly cost rounded to two decimal places
    totalMonthly = (annualTotal/12).toFixed(2);
    // add highligh class if total monthly exceeds 20000
    if (totalMonthly > 20000) {
        $('#displayTotal').addClass("highlight");
    }
    // update DOM with new total
    $('#totalMonthly').empty();
    $('#totalMonthly').append(totalMonthly);
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