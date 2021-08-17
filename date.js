
module.exports = getDate;

function getDate() {
    // Getting the Date
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options);

    return day;

}