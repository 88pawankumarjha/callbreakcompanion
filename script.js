// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Set the year in the footer
    document.getElementById("current-year").textContent = currentYear;

    // Store references to card buttons
    const cardButtons = document.querySelectorAll(".card-button");

    cardButtons.forEach(button => {
        button.addEventListener("click", function() {
            const cardName = this.getAttribute("data-card");
            // Disable the clicked card button
            button.classList.add("disabled");
            // Prevent further clicks on the disabled card button
            button.disabled = true;
        });
    });

    // New Round Button Functionality
    const newRoundButton = document.getElementById("new-round");
    newRoundButton.addEventListener("click", function() {
        // Re-enable previously disabled cards
        cardButtons.forEach(button => {
            button.classList.remove("disabled");
            button.disabled = false;
        });

        // Perform any other actions for starting a new round here
    });

    // Your existing code for other functionalities (if any)
});
