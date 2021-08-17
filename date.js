
module.exports.getDate = getDate;

function getDate() {
    // Getting the Date
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", options);
}

module.exports.getDay = getDay;
function getDay() {
    // Getting the Day
    let today = new Date();
    let options = {
        weekday: "long"
    }
    return today.toLocaleDateString("en-US", options);


}