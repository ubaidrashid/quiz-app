document.addEventListener('DOMContentLoaded', function () {
    const categorySelection = document.getElementById('categorySelection');
    const quizContent = document.getElementById('quizContent');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextQuestionButton = document.getElementById('nextQuestion');
    const scoreElement = document.getElementById('score');

    let currentCategory = '';
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    const quizData = {
        science: [
            { question: 'What planet is known as the Red Planet?', answers: ['Earth', 'Mars', 'Jupiter'], correct: 'Mars' },
            { question: 'What is the chemical symbol for water?', answers: ['H2O', 'O2', 'CO2'], correct: 'H2O' },
            { question: 'Which planet is the largest in our solar system?', answers: ['Mars', 'Earth', 'Jupiter'], correct: 'Jupiter' },

            { question: 'What gas do plants absorb from the atmosphere?', answers: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'], correct: 'Carbon Dioxide' },

            { question: 'What is the powerhouse of the cell?', answers: ['Nucleus', 'Mitochondria', 'Ribosome'], correct: 'Mitochondria' },

            { question: 'Which element has the atomic number 1?', answers: ['Oxygen', 'Helium', 'Hydrogen'], correct: 'Hydrogen' },

            { question: 'What force keeps planets in orbit around the sun?', answers: ['Magnetism', 'Gravity', 'Electromagnetism'], correct: 'Gravity' },

            { question: 'Which organ in the human body is responsible for pumping blood?', answers: ['Brain', 'Lungs', 'Heart'], correct: 'Heart' },

            { question: 'What is the boiling point of water at sea level?', answers: ['100°C', '50°C', '0°C'], correct: '100°C' },

            { question: 'Which planet is closest to the sun?', answers: ['Venus', 'Earth', 'Mercury'], correct: 'Mercury' }
            ,
            { question: 'What is the chemical formula for table salt?', answers: ['NaCl', 'KCl', 'H2O'], correct: 'NaCl' },

            { question: 'What is the main gas found in the Earths atmosphere?', answers: ['Oxygen', 'Nitrogen', 'Carbon Dioxide'], correct: 'Nitrogen' },

            { question: 'What is the unit of measure for electric current?', answers: ['Volt', 'Ampere', 'Watt'], correct: 'Ampere' },

            { question: 'Which planet is known as the Earths twin?', answers: ['Mars', 'Venus', 'Saturn'], correct: 'Venus' },

            { question: 'What is the hardest natural substance on Earth?', answers: ['Gold', 'Diamond', 'Iron'], correct: 'Diamond' },

            { question: 'What part of the plant conducts photosynthesis?', answers: ['Root', 'Leaf', 'Stem'], correct: 'Leaf' },
        ],
        history: [
            { question: 'Who was the first President of the United States?', answers: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson'], correct: 'George Washington' },
            { question: 'In which year did World War II end?', answers: ['1945', '1939', '1918'], correct: '1945' },
            { question: 'Who was the first President of the United States?', answers: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln'], correct: 'George Washington' },

            { question: 'In which year did the Titanic sink?', answers: ['1912', '1905', '1898'], correct: '1912' },
            ,
            { question: 'Which ancient civilization built the pyramids?', answers: ['Romans', 'Egyptians', 'Greeks'], correct: 'Egyptians' },

            { question: 'Who was the first man to step on the moon?', answers: ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong'], correct: 'Neil Armstrong' },

            { question: 'What was the main cause of World War I?', answers: ['Assassination of Archduke Ferdinand', 'Invasion of Poland', 'Treaty of Versailles'], correct: 'Assassination of Archduke Ferdinand' }
            ,
            { question: 'Who was the British Prime Minister during World War II?', answers: ['Winston Churchill', 'Neville Chamberlain', 'Clement Attlee'], correct: 'Winston Churchill' },

            { question: 'Which empire was ruled by Julius Caesar?', answers: ['Roman Empire', 'Ottoman Empire', 'Byzantine Empire'], correct: 'Roman Empire' },
            ,
            { question: 'What year did the Berlin Wall fall?', answers: ['1989', '1975', '1991'], correct: '1989' }
            ,
            { question: 'Who was the leader of the Soviet Union during World War II?', answers: ['Vladimir Lenin', 'Joseph Stalin', 'Leon Trotsky'], correct: 'Joseph Stalin' }
            ,
            { question: 'Which document declared American independence from Britain?', answers: ['The Constitution', 'The Bill of Rights', 'The Declaration of Independence'], correct: 'The Declaration of Independence' }
            ,
            { question: 'Which war was fought between the North and South regions of the United States?', answers: ['The Revolutionary War', 'The Civil War', 'The War of 1812'], correct: 'The Civil War' },

            { question: 'Who was the first female Prime Minister of the United Kingdom?', answers: ['Margaret Thatcher', 'Theresa May', 'Indira Gandhi'], correct: 'Margaret Thatcher' },

            { question: 'What was the name of the ship that brought the Pilgrims to America in 1620?', answers: ['Mayflower', 'Santa Maria', 'Endeavour'], correct: 'Mayflower' },
            ,
            { question: 'Which king signed the Magna Carta?', answers: ['King John', 'King Henry VIII', 'King Richard III'], correct: 'King John' }
            ,
            { question: 'Who discovered America in 1492?', answers: ['Christopher Columbus', 'Leif Erikson', 'Ferdinand Magellan'], correct: 'Christopher Columbus' },
        ],
        geography: [
            { question: 'What does "NaN" stand for in JavaScript?', answers: ['Not a Number', 'Null and Not', 'Negative and Null'], correct: 'Not a Number' },

            { question: 'Which of the following is a JavaScript data type?', answers: ['Integer', 'Character', 'Boolean'], correct: 'Boolean' },

            { question: 'Which method is used to select an HTML element by its ID?', answers: ['getElementById()', 'querySelector()', 'getElementByClassName()'], correct: 'getElementById()' },

            { question: 'Which keyword is used to declare a variable in JavaScript?', answers: ['var', 'int', 'float'], correct: 'var' },

            { question: 'How do you create a function in JavaScript?', answers: ['function = myFunction()', 'function myFunction()', 'create function myFunction()'], correct: 'function myFunction()' },

            { question: 'Which operator is used to assign a value to a variable?', answers: ['+', '=', '-'], correct: '=' },

            { question: 'What does "DOM" stand for?', answers: ['Document Object Model', 'Data Object Model', 'Document Order Method'], correct: 'Document Object Model' },

            { question: 'Which built-in method can be used to convert a string to an integer?', answers: ['parseInt()', 'toInteger()', 'parseString()'], correct: 'parseInt()' },

            { question: 'Which of the following is used to check if two values are equal in both type and value?', answers: ['==', '=', '==='], correct: '===' },

            { question: 'Which keyword is used to define a constant in JavaScript?', answers: ['var', 'const', 'let'], correct: 'const' },

            { question: 'What is the correct syntax for referring to an external script called "script.js"?', answers: ['<script src="script.js">', '<script href="script.js">', '<script ref="script.js">'], correct: '<script src="script.js">' }
            ,
            { question: 'Which method is used to remove the last element from an array?', answers: ['pop()', 'shift()', 'splice()'], correct: 'pop()' },

            { question: 'How do you write a comment in JavaScript?', answers: ['<!-- Comment -->', '// Comment', '/ Comment /'], correct: '// Comment' },

            { question: 'Which method is used to add one or more elements to the end of an array?', answers: ['push()', 'unshift()', 'concat()'], correct: 'push()' },

            { question: 'Which keyword is used to declare a block-scoped variable in JavaScript?', answers: ['let', 'var', 'block'], correct: 'let' },
            { question: 'Which function is used to parse a JSON string into a JavaScript object?', answers: ['JSON.stringify()', 'JSON.parse()', 'JSON.objectify()'], correct: 'JSON.parse()' }
            ,
            { question: 'Which of the following is a looping structure in JavaScript?', answers: ['for', 'foreach', 'loop'], correct: 'for' },

            { question: 'What is the output of "typeof null" in JavaScript?', answers: ['"object"', '"null"', '"undefined"'], correct: '"object"' },

            { question: 'Which array method sorts the elements of an array?', answers: ['sort()', 'order()', 'arrange()'], correct: 'sort()' }
            ,
            { question: 'What does "this" keyword refer to in JavaScript?', answers: ['The current object', 'The global object', 'The previous object'], correct: 'The current object' }
            ,
            { question: 'Which statement is used to exit a loop in JavaScript?', answers: ['stop', 'break', 'exit'], correct: 'break' },
            ,
            { question: 'Which method is used to combine two or more arrays in JavaScript?', answers: ['concat()', 'merge()', 'append()'], correct: 'concat()' },
        ]
    };

    categorySelection.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            currentCategory = e.target.getAttribute('data-category');
            questions = quizData[currentCategory];
            currentQuestionIndex = 0;
            score = 0;
            categorySelection.style.display = 'none';
            quizContent.style.display = 'block';
            showQuestion();
        }
    });

    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        answersElement.innerHTML = '';
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', function () {
                if (answer === currentQuestion.correct) {
                    score++;
                }
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    showScore();
                }
            });
            answersElement.appendChild(button);
        });
    }

    function showScore() {
        questionElement.textContent = 'Quiz Completed!';
        answersElement.innerHTML = '';
        nextQuestionButton.style.display = 'none';
        scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
    }
});
