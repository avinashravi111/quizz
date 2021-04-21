var ques;
var correctScore = 0;
var wrongScore = 0;
var tempQuesArray;
var tempObj;
var count=120;
var time;


var sqlquestions=[
	{
		question:"What is the full form of SQL?",
		questionType:1,
		choices:["Structured Query List","Structure Query Language","Sample Query Language","None of these"],
		correctChoice: "Structure Query Language",
		score:10
	},
	{
		question:"Which of the following is not a valid SQL type?",
		questionType:1,
		choices:["FLOAT","NUMERIC","DECIMAL","CHARACTER"],
		correctChoice: "DECIMAL",
		score:10
	},
	{
		question:"Which of the following is not a DDL command?",
		questionType:1,
		choices:["TRUNCATE","ALTER","CREATE","UPDATE"],
		correctChoice: "UPDATE",
		score:10
	},
	{
		question:"Which of the following are TCL commands?",
		questionType:1,
		choices:["COMMIT and ROLLBACK","UPDATE and TRUNCATE","SELECT and INSERT","GRANT and REVOKE"],
		correctChoice: "COMMIT and ROLLBACK",
		score:10
	},
	{
		question:"Which statement is used to delete all rows in a table without having the action logged?",
		questionType:1,
		choices:["DELETE","REMOVE","DROP","TRUNCATE"],
		correctChoice: "TRUNCATE",
		score:10
	}
]/*

]
*/
var pythonquestions=[

	{
		question:"What is the maximum possible length of an identifier?",
		questionType:1,
		choices:["16","32","64","None of these above"],
		correctChoice: "None of these above",
		score:10
	},
	{
		question:"Who developed the Python language?",
		questionType:1,
		choices:["Zim Den","Guido van Rossum","Niene Stom","Wick van Rossum"],
		correctChoice: "Guido van Rossum",
		score:10
	},
	{
		question:"In which year was the Python language developed?",
		questionType:1,
		choices:["1995","1972","1981","1989"],
		correctChoice: "1989",
		score:10
	},
	{
		question:"Which one of the following is the correct extension of the Python file?",
		questionType:1,
		choices:[".py",".python",".p","None of these"],
		correctChoice: ".py",
		score:20
	},
	{
		question:"In which year was the Python 3.0 version developed?",
		questionType:1,
	  choices:["2008","2000","2010","2005"],
		correctChoice: "2008",
		score:20
	}

]

var category=[
	{
		qType: "sqlquestions",
		questions: sqlquestions
	},
	{
		qType: "pythonquestions",
		questions: pythonquestions
	}
]



/***
	Called on: choose button.
	Function: Displays the questions and the options
**/
function populate(){

var today = new Date();
	document.getElementById('date').innerHTML = today.getMonth()+ " / "+ today.getDate() + " / " + today.getFullYear();
	var titleIndex = Math.floor(Math.random()*category.length);
	var item = category[titleIndex];
	document.getElementById("subject").innerHTML = item.qType.toString();
}

/**
	Called by: Start button
	Function: This function displays the first question and hides the start button
**/
function start(){
	if(document.getElementById("subject").innerHTML == "Quiz Application"){
		alert("Please chose a topic");
	}
	else{
		document.getElementById("choose").style.visibility='hidden';
		timedCount();
		traverse();
		document.getElementById("start").style.visibility='hidden';
	}

}

/**
	Called from: traverse()
	Function: This function will return the index of the question type
**/
function catIndex(){

	var titleValue= $('#subject').html();
	switch(titleValue){
		case "sqlquestions":
		return 0;
		break;

		case "pythonquestions":
		return 1;
		break;
	}
}
/**
	Called by: start() and displayNext()
	Function: This function will randomly display the questions and options/textbox
**/
function traverse(){


	var categoryIndex = catIndex();									//index of the category object
	tempQuesArray = category[categoryIndex].questions;				//question type of the category

	//last question left
	if(tempQuesArray.length == 1){
			document.getElementById("next").remove();
			document.getElementById("submit").style.visibility='visible';
	}
	tempObj = tempQuesArray.pop();									//stores the popped object
	answer = tempObj.correctChoice;									//stores the answer of the question


	document.getElementById("question").innerHTML = tempObj.question.toString();
	if(tempObj.questionType == 2){
    // code for handling text buttons
            $("#answer").html('<label>Answer : </label>' +
            '<input type="text" name="textbox" id="answerText" value="" >');
	}
	else if (tempObj.questionType == 1){
	//code for handling radio entry
       	var choicesHtml="";
       	var currentQuestion = 0;
        var i;

        for (i = 0; i < tempObj.choices.length; i++)
            {
                choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
                "' class='choice' value='" + tempObj.choices[i] + "'>" +
                " <label for='choice'>" + tempObj.choices[i] + "</label><br>";
                document.getElementById("answer").innerHTML = choicesHtml;
            }
	}
}

/**
	Called on: next button
	Function: This function checks and updates the score
**/
function updateScore(){

	//document.getElementById("temp").innerHTML = tempObj.correctChoice.toString();
	if(tempObj.questionType == 2){
    // code for handling text entry
    	//check if the user entered value is equal to the answer
    	if(document.getElementById("answerText").value == tempObj.correctChoice.toString()){
    			correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore;
    	}
    	else{
    		wrongScore += 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore;
    	}
	}
	else if (tempObj.questionType == 1){

	//code for handling radio entry
    $(".choice").each(function() {
        if($(this).is(':checked')){
        	if($(this).val() == tempObj.correctChoice.toString()){
        		correctScore = correctScore + tempObj.score;
    			document.getElementById("rightScore").innerHTML = correctScore;
        	}
        	else{
        	wrongScore = wrongScore + 1;
    		document.getElementById("wrongScore").innerHTML = wrongScore;
        	}
        }
    });

	}
		traverse();
}

/**
	Called on: next button
	Function: This function first checks the result and then calls the traverse question
**/
function displayNext(){
	updateScore();
}

/**
	Called by: timedCount()
	Function: This function stops the countdown
**/
function stopCount()
{
	clearTimeout(time);
}

/**
	Called on: start button
	Function: This function starts the countdown
**/
function timedCount()
{
	document.getElementById('timer').innerHTML=count;
	count=count-1;
	if(count==0)
	{

		alert("time over");
		submit();
		stopcount();
	}

	time=setTimeout("timedCount()",1000);
}

/**
	Called on: submit button
	Function: This function displays the final score
**/
function submit(){

	//1. remove the question and options
	document.getElementById("question").style.visibility='hidden';
	document.getElementById("answer").style.visibility='hidden';

	//2. display the score
	document.getElementById("displayScore").style.visibility='visible';
	document.getElementById("displayScore").innerHTML="Your score: "+document.getElementById("rightScore").innerHTML;

	//3. Stop timer
	stopCount();

}

/**
	Called on: quit button
	Function: This function quits the quiz and displays the final score
**/
function quit(){
	var x;
	if(document.getElementById("subject").innerHTML != "Quiz Application"){
	    if (confirm("Press a button!") == true) {
    		submit();
    	}
	}
}
