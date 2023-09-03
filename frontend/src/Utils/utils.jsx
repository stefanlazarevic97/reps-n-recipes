import moment from "moment";

const titleize = (str) => str.replace(/(^|\s)\w/g, letter => letter.toUpperCase());

const getDayWithSuffix = (date) => {
    const day = moment(date).date();

    let suffix = "th";

    if (day === 1 || day === 21 || day === 31) {
        suffix = "st";
    } else if (day === 2 || day === 22) {
        suffix = "nd";
    } else if (day === 3 || day === 23) {
        suffix = "rd";
    }

    return `${day}${suffix}`;
};

// const selectedDate = "2023-09-02";
// const formattedDate = moment(selectedDate).format("dddd, MMMM");
// const dayWithSuffix = getDayWithSuffix(selectedDate);

export default titleize;