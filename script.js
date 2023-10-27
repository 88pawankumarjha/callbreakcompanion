document.addEventListener("DOMContentLoaded", function() {
    // Get the current year
    const currentYear = new Date().getFullYear();
    // Set the year in the footer
    document.getElementById("current-year").textContent = currentYear;

    // Store references to card buttons
    const cardButtons = document.querySelectorAll(".card-button");
    const newRoundButton = document.getElementById("new-round");
    const undoButton = document.getElementById("undo-button");
    const visibilityStack = [];

    // Initialize card counts and visibilityStack
    const columns = document.querySelectorAll(".compact-card");
    columns.forEach(column => {
        const countElement = column.querySelector(".card-count");
        countElement.textContent = column.querySelectorAll(".card-button").length;
    });

    cardButtons.forEach(button => {
        button.addEventListener("click", function() {
            const cardName = this.getAttribute("data-card");
            const isHidden = this.classList.contains("hidden");
            const column = this.closest(".compact-card");

            // Toggle the card's visibility
            if (isHidden) {
                this.classList.remove("hidden");
                updateCardCount(column, 1);
            } else {
                this.classList.add("hidden");
                updateCardCount(column, -1);
            }

            visibilityStack.push({ button: this, isHidden });
            this.disabled = true;

        });
    });

    // Function to update the card count
    function updateCardCount(column, change) {
        const countElement = column.querySelector(".card-count");
        const currentCount = parseInt(countElement.textContent);
        change == 13 ? countElement.textContent = 13 : countElement.textContent = currentCount + change;
        
    }

    undoButton.addEventListener("click", function() {
        // Check if there are actions to undo in the stack
        if (visibilityStack.length > 0) {
            const { button, isHidden } = visibilityStack.pop();
            const column = button.closest(".compact-card");

            if (!isHidden) {
                button.classList.remove("hidden");
                updateCardCount(column, 1);
            } else {
                button.classList.add("hidden");
                updateCardCount(column, -1);
            }

            button.disabled = false;
        }
    });

    newRoundButton.addEventListener("click", function() {
        // Re-enable and show previously hidden cards
        cardButtons.forEach(button => {
            const column = button.closest(".compact-card");
            if (button.classList.contains("hidden")) {
                button.classList.remove("hidden");
                button.disabled = false;
            }
            updateCardCount(column, 13);
        });

        // Clear the undo stack
        visibilityStack.length = 0;
    });

    

    // Your existing code for other functionalities (if any)
});
