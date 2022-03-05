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
        idNum: Number($('#idNum').val()),
        title: $('#title').val(),
        salary: Number($('#salary').val())
    }
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
    // 
    thisID = $(this).attr('id');
 }