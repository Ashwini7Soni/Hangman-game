const words = ["apple", "book", "pencil", "hand", "goa", "trampoline"];
const correctChar = [];
const wrongChar = [];
const visitedArray = [];
const randomWord = words[Math.floor(Math.random() * words.length)];
const hangmanBody = document.querySelectorAll(".figure-part");

function showChar() {
    

    //displaying the characters on dashes
    document.getElementById("word").innerHTML = 
    `
    ${randomWord.split("").map((letter) => 
        `
        <span class = "letter">
            ${(correctChar.includes(letter)? letter : "")}
        </span>
        `
    ).join("")
    }
    `;

    //check if word is correct
    const guessWord = document.getElementById("word").innerText.replace(/\n/g,"");
    console.log("guessWord = "+guessWord);
    console.log("randomWord = "+randomWord);
    if(guessWord === randomWord) {
        console.log("if(guessWord === randomWord)");
        alert("Hurray! You Won");
        wrongChar.splice(0);
        correctChar.splice(0);
        visitedArray.splice(0);
        showChar();
    }
}

function updateIncorrectChar() {
    document.getElementById("wrong-char-block").innerHTML = 
    `
    ${(wrongChar.length >= 1)? "<p>Wrong character guessed</p>" : ""}
    ${wrongChar.map((letter) => 
        `
        <span>${letter}</span>
        `
        )}
    `;
    hangmanBody.forEach((ele, index) => {
        const numberOfIncorrectGuess = wrongChar.length;

        if(index < numberOfIncorrectGuess) {
            //show body
            ele.style.display = "block";
        }
        else {
            //hide body
            ele.style.display = "none";
        }
    });

    if(wrongChar.length === hangmanBody.length) {
        alert("Game Over");
    }

}
function showNotification() {
    document.getElementById("notification-container").style.display = "block";
    setTimeout(() => {
        document.getElementById("notification-container").style.display = "none";
    }, 1000);
}

const notificationCOntainer = document.getElementById("notification-container").style.display = "none";
showChar();

window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if(e.key >= 'a' && e.key <= 'z') {
        if(visitedArray.includes(e.key)) {
            //show alert
            showNotification();
        }
        else {
            visitedArray.push(e.key);
            if(randomWord.includes(e.key)) {
                //correct character
                correctChar.push(e.key);
                showChar();
            }
            else {
                //wrong character
                wrongChar.push(e.key);
                updateIncorrectChar();
            }
            console.log("visitedArray = "+visitedArray);
            console.log("correctChar = "+correctChar);
            console.log("wrongChar = "+wrongChar);
        }
    }
    else {
        console.log("Bad character ...");
    }
});

