document.addEventListener('DOMContentLoaded', function () {
        const choices = document.querySelectorAll('.choice-container');
        const resultDiv = document.querySelector('.result');
        const editor = document.getElementById('editor');
        const resetButton = document.querySelector('#reset-button');

        // Add event listener to reset button
        resetButton.addEventListener('click', () => {
          localStorage.removeItem('score');
          localStorage.removeItem('tries');

          let resetMessage = `
            Score and tries reset.
        `;

          animateTyping(editor, resetMessage, 4);
        });

        // Initialize the terminal content
        let terminalContent = '';

        choices.forEach(choice => {

          choice.addEventListener('click', () => {
            // Get the user's choice
            const userChoice = choice.getAttribute('data-choice');

            // Get computer choice
            const choicesList = ['rock', 'paper', 'scissors'];
            let computerChoice = Math.round(Math.random() * 2);
            computerChoice = choicesList[computerChoice];

            let score = JSON.parse(localStorage.getItem('score')) || {
              wins: 0,
              losses: 0,
              ties: 0
            };

            let tries = JSON.parse(localStorage.getItem('tries')) || 0;

            // Update the score based on the game result
            if ((userChoice === 'rock' && computerChoice === 'scissors') ||
              (userChoice === 'paper' && computerChoice === 'rock') ||
              (userChoice === 'scissors' && computerChoice === 'paper')) {
              score.wins++;
              tries++;
            } else if ((userChoice === 'rock' && computerChoice === 'paper') ||
              (userChoice === 'paper' && computerChoice === 'scissors') ||
              (userChoice === 'scissors' && computerChoice === 'rock')) {
              score.losses++;
              tries++;
            } else {
              score.ties++;
              tries++;
            }

            // Add your JavaScript logic here for handling the game result
            resultDiv.innerText = 'You chose ' + choice.querySelector('.text').innerText;
            resultDiv.classList.add('shake');
            setTimeout(() => {
              resultDiv.classList.remove('shake');
              resultDiv.innerText = 'Make your choice!';
            }, 500);

            // Terminal-like appearance to log user activity and results
            const code = `
            // Game Log...
            ${'Your choice: ' + userChoice}
            ${'Computer choice: ' + computerChoice}
            'Your Score:'
            ${'Wins: ' + score.wins}, ${'Losses: ' + score.losses}, ${'Ties: ' + score.ties}

            Total tries since last reset: ${tries}
            `;

            terminalContent += code + '\n';

            localStorage.setItem('score', JSON.stringify(score));
            localStorage.setItem('tries', JSON.stringify(tries));

            // Update the editor content with typing effect for new additions only
            animateTyping(editor, code, 4); // Adjust the delay (50 milliseconds in this example)

            // Clear terminalContent to avoid appending it again to the editor
            terminalContent = '';
          });
        });

        // Typing animation function with customizable delay
        function animateTyping(element, content, delay) {
          let index = 0;

          function typeCode() {
            element.textContent += content[index];
            index++;

            if (index < content.length) {
              setTimeout(typeCode, delay);
            }
          }

          // Start typing animation
          typeCode();
        }
      });