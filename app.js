const boxElement=document.querySelectorAll(".box");
var winningCombinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],]

var x_pose = [];
var o_pose = [];
var wonTheGame = 0;
var click = 0;
const restart = document.getElementById("button");
const gameResult = document.getElementById("result");
const message = document.getElementById("message");



boxElement.forEach(box=>{
    box.onclick = handleClick;
})
function handleClick(e){
    console.log(e.target);
    console.log(e.target.getAttribute('id'));
    const i=e.target.getAttribute('id');
    const text = document.createElement('p');
    text.setAttribute('id','text');
    boxElement[i-1].appendChild(text);
    console.log(boxElement[i-1]);
    if(click%2 == 0){
        x_pose.push(parseInt(i-1));
        console.log(x_pose);
        text.innerHTML="X";
        text.style.color = 'red';
        result(winningCombinations,x_pose, "X");
    }
    else{
        o_pose.push(parseInt(i-1));
        console.log(o_pose)
        text.innerHTML="0";
        text.style.color = 'blue';
        result(winningCombinations,o_pose, "O");
    }

    click++;
    if(click == 9 && wonTheGame == 0) {
        gameResult.style.visibility="visible";
        message.innerHTML = "It's a tie"
    }

}


function result(winningCombinations,attempts,player) {
    let flag = 0;
    let checker = [];
    for(var i = 0; i < winningCombinations.length; i++) {
        console.log(winningCombinations[i]);
        if (Array.isArray(winningCombinations[i])){
            result(winningCombinations[i],attempts,player);
        }else{
            if(attempts.includes(winningCombinations[i])) {
                checker.push(true);
                flag++;
            } else {
                checker.push(false); 
            }
        }
    }
    if(checker.every(check => check === true)&&flag>2){
        gameResult.style.visibility="visible";
        message.innerHTML ="'"+ player +"'" + "Won the game!";
        wonTheGame=1;
    }
}

restart.onclick=()=>{
    history.go(0);
}