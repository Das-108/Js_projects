const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

const weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Selecting elements
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// Get current date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// Set future date (10 days from now at 11:30 AM)
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

// Extract future date details
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = months[futureDate.getMonth()];
let weekday = weekdays[futureDate.getDay()];
let date = futureDate.getDate();

// Display giveaway end date
giveaway.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes} AM`;

// Get future time in milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime(); // Get current time in milliseconds
    const t = futureTime - today; // Time difference

    // Define time units
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    // If the giveaway has expired
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired!</h4>`;
        return;
    }

    // Calculate remaining time
    let days = Math.floor(t / oneDay);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    // Array of values for countdown display
    const values = [days, hours, minutes, seconds];

    // Format numbers to always be two digits (e.g., 09 instead of 9)
    function format(item) {
        return item < 10 ? `0${item}` : item;
    }

    // Update the countdown timer in the UI
    items.forEach((item, index) => {
        item.innerHTML = format(values[index]);
    });
}

// Run countdown function every second
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
