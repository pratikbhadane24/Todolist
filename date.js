
exports.getDate = function () {
    // Getting the Date
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString("en-US", options);
}

exports.getDay = function () {
    // Getting the Day  
    const today = new Date();
    const options = {
        weekday: "long"
    }
    return today.toLocaleDateString("en-US", options);


}