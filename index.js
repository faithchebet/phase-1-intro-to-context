// Your code here

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}


function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord);
}


function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10),
    });
    return employee;
}


function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employee.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10),
    });
    return employee;
}


function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}


function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}


function allWagesFor(employee) {
    return employee.timeInEvents.reduce((totalWages, timeInEvent) => {
        const date = timeInEvent.date;
        return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
}


function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor(employee);
    }, 0);
}

const lokiData = ["Loki", "Odinson", "Manager", 30];
const natashaData = ["Natalia", "Romanov", "Agent", 25];

const employeesData = [lokiData, natashaData];
const employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2018-01-01 0800");
createTimeOutEvent(employees[0], "2018-01-01 1000");

createTimeInEvent(employees[1], "2018-01-01 0900");
createTimeOutEvent(employees[1], "2018-01-01 1700");

console.log(hoursWorkedOnDate(employees[0], "2018-01-01")); 
console.log(wagesEarnedOnDate(employees[0], "2018-01-01")); 
console.log(allWagesFor(employees[0])); 

console.log(calculatePayroll(employees)); 
