console.log('js');

$(document).ready(handleReady);

let employees = []; 

function handleReady() {
     console.log('jquery');
    // 
     $('#submitButton').on('click', addEmployee);
 }

 function addEmployee() {
    console.log('addEmployee');
    // create new employee object from inputs
    const employee = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        idNum: Number($('#idNum').val()),
        title: $('#title').val(),
        salary: $('#salary').val()
    }
    // add employee to employee array
    employees.push(employee);
    // empty input fields
    $('#firstName').val('');
    $('#lastName').val('');
    $('#idNum').val('');
    $('#title').val('');
    $('#salary').val('');

    updateDOM()
 }

 function updateDOM() {
    console.log('updateDOM')

    $('#tableBody').empty()

    for (let employee of employees) {
        $('#tableBody').append(`<tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.idNum}</td>
            <td>${employee.title}</td>
            <td>${employee.salary}</td>
        </tr>`)
    }
 }