// Gian Aceves CSC102_JulyHybrid2026 

// Contains all JavaScript logic for game.html.
// Two features: a Dice Duel game and a Palindrome Checker.

// All outout is written to the page using innerHTML (no alerts).
// All user actions are triggered through <form onsubmit> handlers (no addEventListener).

/**
 * playDiceGame()
 * Called when the Dice Duel form is submitted.
 * Generates two random dice values (1-6), calculates their sum,
 * and uses if / else if / else logic to decide the outcome.
 * Writes the result to the page with innerHTML.
 * Returns false so the form does not reload the page.
 */
function playDiceGame() {
    // Math.random() gives a decimal 0-1; multiply by 6 and floor it,
    // then add 1 so the result is a whole number between 1 and 6
    const die1 = Math.floor(Math.random() * 6) + 1;

    // Same formula generates the second die independently
    const die2 = Math.floor(Math.random() * 6) + 1;

    // Add the two dice together to get the round's sum
    const sum = die1 + die2;

    // Grab the div where the dice results will be displayed
    const outputDiv = document.getElementById("diceOutput");

    // Build the beginning of the output message showing both rolls and the sum
    let resultMessage = "<p>Die 1: " + die1 + " &nbsp; | &nbsp; Die 2: " + die2 + "</p>";
    resultMessage += "<p>Sum: " + sum + "</p>";

    // Only sums between 2 and 12 are possible with two six-sided dice;
    // these are the prime numbers within that range
    const primeSums = [2, 3, 5, 7, 11];

    // Check the outcome, from most specific rule to least specific
    if (primeSums.includes(sum)) {
        // The sum is a prime number: biggest win
        resultMessage += "<p><strong>Star Bonus! You win big!</strong></p>";
    } else if (die1 === die2) {
        // Both dice landed on the same number: doubles win
        resultMessage += "<p><strong>Doubles! You win!</strong></p>";
    } else if (sum > 8) {
        // Sum is high but wasn't prime or doubles: counts as a push (tie)
        resultMessage += "<p><strong>High roll! You push (tie).</strong></p>";
    } else {
        // Anything left over is a loss
        resultMessage += "<p><strong>Low roll. You lose.</strong></p>";
    }

    // Display the full message on the page using innerHTML
    outputDiv.innerHTML = resultMessage;

    // Returning false stops the form's default submit behavior (page reload)
    return false;
}

/**
 * handlePalindromeSubmit()
 * Called when the Palindrome Checker form is submitted.
 * Reads the text the user typed and passes it into checkPalindrome()
 * so the actual validation/checking logic stays in a separate,
 * parameterized function.
 * Returns false so the form does not reload the page.
 */
function handlePalindromeSubmit() {
    // Locate the text input element by its id
    const inputField = document.getElementById("wordInput");

    // Read the current text the user entered
    const userInput = inputField.value;

    // Hand the input value off to checkPalindrome for processing
    checkPalindrome(userInput);

    // Prevent the form from reloading the page
    return false;
}

/**
 * checkPalindrome(text)
 * Takes the user's input as a parameter, validates it, and determines
 * whether it is a palindrome (reads the same forwards and backwards,
 * ignoring case and spaces). All output (validation errors or results)
 * is written to the page using innerHTML.
 * @param {string} text - the word or phrase entered by the user
 */
function checkPalindrome(text) {
    // Grab the div where palindrome results/messages will be shown
    const outputDiv = document.getElementById("palindromeOutput");

    // Validate that the user typed something other than blank spaces
    if (text.trim() === "") {
        // Input failed validation: show an error message and stop
        outputDiv.innerHTML = "<p><strong>Please enter a word or phrase.</strong></p>";
        return;
    }

    // Lowercase the text and strip spaces so comparisons ignore case/spacing
    const cleaned = text.toLowerCase().split(" ").join("");

    // Reverse the cleaned string: split into letters, reverse the array, rejoin
    const reversed = cleaned.split("").reverse().join("");

    // Compare the cleaned original to its reversed version
    if (cleaned === reversed) {
        // They match: the input is a palindrome
        outputDiv.innerHTML = "<p><strong>\"" + text + "\" is a palindrome!</strong></p>";
    } else {
        // They don't match: the input is not a palindrome
        outputDiv.innerHTML = "<p><strong>\"" + text + "\" is not a palindrome.</strong></p>";
    }
}