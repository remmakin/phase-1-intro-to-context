// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0], 
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: []
    }

}
function createEmployeeRecords(array) {
    return array.map(function(row){
        return createEmployeeRecord(row)
    })
}
function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10), 
        date,
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour, 10), 
        date,
    })
    return employee
}
function hoursWorkedOnDate(employee, soughtDate) {
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
function wagesEarnedOnDate(employee, dateSouth) {
    let rawWage =hoursWorkedOnDate(employee, dateSouth)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}
function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return payable
}
function calculatePayroll(array) {
    return array.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}