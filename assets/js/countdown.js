const dataQuestion = {
    1:"He's very short: ________ sisters are taller.",
    2:"When ________ dinner.",
    3:"Kate is the best ________ the three.",
    4:"Are you ready? - ________.",
    5:"Leave your dirty shoes ________ the door.",
    6:"He ________ swim very well.",
    7:"Peter works in London. ________.",
    8:"Yeu Yee had her house painted white yesterday.",
    9:"The hotel is ________.",
    10:"Can we begin the test? - We can't unless the teacher ________ so.",
};
const dataAnswer = {
    1: ["both of them", "his both", "both his", "the two both his", { "answer": [2,3] }],
    2: ["have you", "do you have", "you have", "you are having", { "answer": [1,2] }],
    3: ["in", "from", "than", "of", { "answer": [0,3] }],
    4: ["Already not", "Quite not", "Yet not", "Not yet", { "answer": [1,3] }],
    5: ["out from", "out", "outside", "out of", { "answer": [0,2] }],
    6: ["not can", "cannot", "doesn't can", "don't can", { "answer": [1,3] }],
    7: ["He goes there by train.", "He there goes by train.", "He goes by train there.", "There goes he by train.", { "answer": [0,1] }],
    8: ["She had to paint her house white yesterday.", "Her house was not blue last week.", "They painted her house white for her yesterday.", "She painted her house yesterday.", { "answer": [2,3] }],
    9: ["sell", "for sale", "for sell", "sale", { "answer": [1,3] }],
    10: ["will say", "is saying", "shall say", "says", { "answer": [2,3] }],
}
localStorage.setItem("question", JSON.stringify(dataQuestion));
localStorage.setItem("answer", JSON.stringify(dataAnswer));

const getQuestion = localStorage.getItem("question");
const getAnswer = localStorage.getItem("answer");
const titleKey = document.getElementById("titleKey");
const valueKey = document.getElementById("valueKey");
const question = JSON.parse(getQuestion);
const answer = JSON.parse(getAnswer);
const activeClass = document.getElementsByClassName("active");
const button = document.getElementsByClassName("tab-que");
const btnPrevious = document.getElementById("button-previous");
const btnNext = document.getElementById("button-next");


const date = new Date();

if (localStorage.getItem("count_timer") === null || localStorage.getItem("count_timer") <= 0) {
    date.setSeconds(540 + date.getSeconds());
    var count_timerDate = date.getTime();
    localStorage.setItem("count_timer", count_timerDate);
}

const second = localStorage.getItem("count_timer");
date.setTime(second);
var count_timer = date.getTime();

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = count_timer - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (seconds < 10) {
        document.getElementById("startTime").innerHTML = minutes + ":" + "0" + seconds;
    } else {
        document.getElementById("startTime").innerHTML = minutes + ":" + seconds;
    }
    if (distance < 0) {
        document.getElementById("startTime").innerHTML = "Time out!!!";
        submit();
    }
}, 500);

function renderData(index) {
    // List answer
    const listAnswer = Object.values(answer)[index]; 
    const keyAnswer = document.getElementsByClassName("answer");
    
    titleKey.innerHTML = Object.keys(question)[index]; 
    valueKey.innerHTML = Object.values(question)[index];

    for (let index = 0; index < listAnswer.length; index++) {
        if (index < listAnswer.length - 1) {
            keyAnswer[index].innerHTML = listAnswer[index];
        }
    }
}

// Get Object
Object.size = function (obj) {
    let size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


//Check size Object
let size = Object.size(question);

if (localStorage.getItem("positionIndex") === null) {
    localStorage.setItem("positionIndex", 0);
    btnPrevious.disabled = true;
}

if (localStorage.getItem("sizeCheckBox") === null) {
    const addCheckBoxSize = {};
    const arr = [];
    localStorage.setItem("sizeCheckBox", JSON.stringify(addCheckBoxSize));

    for (let i = 0; i < size; i++) {
        const sizeCheckBox = JSON.parse(localStorage.getItem("sizeCheckBox"));
        sizeCheckBox[i] = arr;
        localStorage.setItem("sizeCheckBox", JSON.stringify(sizeCheckBox));
    }
}

for (var i = 0; i < size; i++) {
    button[i].addEventListener("click", clickButton);
}

function listChecked(index) {
    const checkbox = document.getElementsByClassName("checkbox");//checked

    if (localStorage.getItem("sizeCheckBox") === null) {
        const addCheckBoxSize = {};
        localStorage.setItem("sizeCheckBox", JSON.stringify(addCheckBoxSize));
    }
    const arr = [];
    const sizeCheckBox = JSON.parse(localStorage.getItem("sizeCheckBox"));

    for (let i = 0; i < checkbox.length; i++) {

        if (checkbox[i].checked == true) {
            arr.push(i);
        }
    }
    sizeCheckBox[index] = arr;
    localStorage.setItem("sizeCheckBox", JSON.stringify(sizeCheckBox));
}

const checkbox = document.getElementsByClassName("checkbox");//checked

// Check checkbox 
function listCheckedOrNot(index) {
    const obj = JSON.parse(localStorage.getItem("sizeCheckBox"));
    var value = Object.values(obj)[Number(index)];

    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
    }

    for (let i = 0; i < value.length; i++) {
        var x = value[i];
        checkbox[x].checked = true;
    }
}

function checkQuestionComplete() {
    for (let i = 0; i < checkbox.length; i++) {

        if (checkbox[x].checked == true) {
            activeClass[0].classList.add("done");
        }
    }
}

// Check the sentence done 
function checkCheckbox() {
    const check = JSON.parse(localStorage.getItem("sizeCheckBox"));
    var doneCheck = Object.values(check);
    for (let i = 0; i < size; i++) {
        var checkColor = doneCheck[i];
        if (checkColor.length < 1) {
            button[i].className = button[i].className.replaceAll(" done", "");
        } else { button[i].classList.add("done") }
    }
}

// Check Point
function checkAnswer() {
    if (localStorage.getItem("point") === null) {
        localStorage.setItem("point", 0);
    }

    var values = Number(localStorage.getItem("point"));
    var point = Object.values(answer);
    const comparePoint = JSON.parse(localStorage.getItem("sizeCheckBox"));
    var done = Object.values(comparePoint);

    for (let i = 0; i < size; i++) {
        var answerPoint = point[i][4].answer;
        var answerPerson = done[i];

        if (JSON.stringify(answerPoint) == JSON.stringify(answerPerson)) {
            values++;
        }
    }
    localStorage.setItem("point", values);
}

//List Question
function clickButton() {
    activeClass[0].className = activeClass[0].className.replace(" active", "");
    this.className += " active";
    renderData(this.innerHTML - 1);
    listCheckedOrNot(this.innerHTML - 1);
    localStorage.setItem("positionIndex", this.innerHTML - 1);
    btnPrevious.disabled = false;
    btnNext.disabled = false;
}

// Submit
function submit() {
    checkAnswer();
    localStorage.setItem("count_timer", 0);
    document.getElementById("renderPoint").innerHTML = "Score:";
    document.getElementById("startTime").innerHTML = localStorage.getItem("point") * 10;
    alert("Your score is: " + ((localStorage.getItem("point") * 10) + 10 ));
    localStorage.setItem("point", 0);
    clearInterval(x);
    document.getElementById("button-submit").disabled = true;
    btnPrevious.disabled = true;
    btnNext.disabled = true;
    document.getElementById("reload").style.display = "block";
    document.getElementById("list").style.zIndex = -1;
    localStorage.clear();

}

//Render Data 
function loadData() {
    var i = localStorage.getItem("positionIndex");
    listCheckedOrNot(i);
    renderData(i);
    activeClass[0].className = activeClass[0].className.replace(" active", "");
    button[i].className += " active";
    checkCheckbox();
}

//Button
function next() {
    var i = localStorage.getItem("positionIndex");
    listChecked(i);
    checkCheckbox();

    try {
        listChecked(i);
        i++;
        localStorage.setItem("positionIndex", i);
        listCheckedOrNot(i);
        btnPrevious.disabled = false;
        activeClass[0].className = activeClass[0].className.replace(" active", "");
        button[i].className += " active";
        renderData(i);
    } catch (err) {
        i--;
        localStorage.setItem("positionIndex", i);
        listCheckedOrNot(i);
        renderData(i);
        activeClass[0].className = activeClass[0].className.replace(" active", "");
        button[i].className += " active";
    }
}

function previous() {
    var i = localStorage.getItem("positionIndex");
    listChecked(i);
    localStorage.setItem("positionIndex", i);
    checkCheckbox();

    try {
        listChecked(i);
        i--;
        localStorage.setItem("positionIndex", i);
        listCheckedOrNot(i);
        btnNext.disabled = false;
        activeClass[0].className = activeClass[0].className.replace(" active", "");
        button[i].className += " active";
        renderData(i);

    } catch (err) {
        i++;
        localStorage.setItem("positionIndex", i);
        listCheckedOrNot(i);
        renderData(i);
        activeClass[0].className = activeClass[0].className.replace(" active", "");
        button[i].className += " active";
    }
}


