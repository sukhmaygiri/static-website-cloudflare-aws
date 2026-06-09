let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#rstbtn");
let newgamebtn=document.querySelector("#nbtn");
let msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".msg-container");

let turn0=true;
let count=0;

const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetgame = () => {
    turn0=true;
    count=0;
    enableboxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        console.log("box was clicked");

        if(turn0){
            box.innerText="O";
            box.style.color="green";
            turn0=false;
        } else {
            box.innerText="X";
            box.style.color="red";
            turn0=true;
        }

        box.disabled=true;
        count++;

        checkwinner();
    });
});

const disableboxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableboxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.style.color="";
    }
};

const showwinner = (Winner) => {
    msg.innerText=`Congratulations, Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const showDraw = () => {
    msg.innerText="Game Draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {

    let winnerFound=false;

    for(let pattern of winpatterns){

        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){

            if(pos1val===pos2val && pos2val===pos3val){

                winnerFound=true;
                console.log("Winner",pos1val);
                showwinner(pos1val);
            }
        }
    }

    if(count===9 && !winnerFound){
        showDraw();
    }
};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);