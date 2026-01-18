const prompt = require("prompt-sync")({ sigint: true });

// const quiz = [
//   { question: "What is 2 + 2? ", answer: "4" },
//   { question: "What is the capital of France? ", answer: "paris" },
//   { question: "What year is it? ", answer: "2026" }
// ];

// let score = 0;
// let answeredCount = 0;

// console.log('Type "exit" at any time to quit.\n');

// for (let i = 0; i < quiz.length; i++) {
//   const raw = prompt(`Question ${i + 1}: ${quiz[i].question}`).trim();

//   // Exit option
//   if (raw.toLowerCase() === "exit") {
//     console.log("\nYou exited the quiz early.");
//     break;
//   }

//   answeredCount++;

//   const userAnswer = raw.toLowerCase();
//   const correctAnswer = quiz[i].answer.trim().toLowerCase();

//   if (userAnswer === correctAnswer) {
//     console.log("Correct!");
//     score++;
//   } else {
//     console.log(`Wrong. The correct answer is: ${quiz[i].answer}`);
//   }

//   console.log("");
// }

// console.log(`Final Score: ${score}/${answeredCount} correct!`);


// registration_prompt.js
// registration.js



const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Name: ", (name) => {
  rl.question("Email: ", (email) => {
    rl.question("Age: ", (age) => {
      rl.question("Favorite Color: ", (favoriteColor) => {
        console.log("\nRegistration Summary:");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Age: ${age}`);
        console.log(`Favorite Color: ${favoriteColor}`);

        rl.close();
      });
    });
  });
});


