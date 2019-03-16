const ques = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');




let currentQues={};
let acceptingAnswers = true;
let score=0;
let questionCounter=0;
let availableQuestions=[]

//consts
const correct_bonus = 10;
let max_questions = 10;

let questions = [];

// load question from local json file
/*
fetch('questions.json')
.then( res=> res.json())
.then(qes=>{
    questions=qes;
    startGame();
})
.catch(err=> console.error(err)); */

//load questions from open trivia
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
.then(res=>{console.log(res);return res.json()})
.then(qes=>{
    console.log(qes)
    questions=qes.results.map(a=>{
        const obj1 = {
            question: a.question
        };
        //console.log(obj1.question)

        const obj2 = [...a.incorrect_answers]
        obj1.answer = Math.floor(Math.random()*3)+1;
        obj2.splice(obj1.answer-1,0,a.correct_answer)
        obj2.forEach((choice,index)=>{
            obj1['choice'+(index+1)] = choice;
        })
        //console.log(obj1)
        return obj1;
    }) 
    max_questions = questions.length;
    startGame();
}).catch(err=> console.error(err)); 



startGame = ()=>{
    questionCounter = 0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
};

getNewQuestion = ()=>{

    if(availableQuestions.length == 0 || questionCounter > max_questions){
        //save score to local storage and go to end page
        localStorage.setItem("score",score);
        window.location.href ="./end.html"
    }

    questionCounter++;

    //update progress bar
    progressBarFull.style.width = `${(questionCounter/max_questions)*200}px`
    progressText.innerText = `Question: ${questionCounter}/${max_questions}`;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQues = availableQuestions[questionIndex];
    ques.innerHTML = currentQues.question;
    choices.forEach(choice=>{
        const number=choice.dataset['number'];
        choice.innerHTML= currentQues['choice'+number]
    })
    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply=selectedAnswer == currentQues.answer?'correct':'incorrect';            
        selectedChoice.parentElement.classList.add(classToApply);
        if(classToApply == 'correct'){
            incrementScore(correct_bonus);
        }
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
    })
})

incrementScore = num=>{
    score+=num;
    scoreText.innerText = score;
}
