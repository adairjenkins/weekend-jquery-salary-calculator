console.log('js');

$(document).ready(handleReady);

let employees = []; 

function handleReady() {
     console.log('jquery');
    // 
     $('#submitButton').on('click', addEmployee);
     //
     $('#tableBody').on('click', '.delete', deleteEmployee);

 }

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

 function render() {
    console.log('render func');

    $('#tableBody').empty();
    // fill in table with employees from employee array and add delete button with employee idNum id
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

 function updateTotalMonthly() {
    console.log('updateTotalMonthly func')
    let annualTotal = 0;
    // sum employee salaries
    for (let employee of employees) {
        annualTotal += employee.salary;
    }
    // convert annual to total monthly cost
    totalMonthly = annualTotal/12;
    // add highligh class if total monthly exceeds 20000
    if (totalMonthly > 20000) {
        $('#displayTotal').addClass("highlight");
    }
    // update DOM with new total
    $('#totalMonthly').empty();
    $('#totalMonthly').append(totalMonthly);
 }

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