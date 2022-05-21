const DEFAULT_MODE = 'standard'
const DEFUALT_SIZE = 40;

let currentSize = DEFUALT_SIZE;
let mode = DEFAULT_MODE;
let pickedColor = '#c70039'

console.log(mode)



document.getElementById('standard').onclick = () => changeMode('standard');
document.getElementById('pick').onclick = () => changeMode('pick');
document.getElementById('pick').onchange = (e) => changePick(e.target.value);
document.getElementById('rainbow').onclick = () => changeMode('rainbow');
document.getElementById('eraser').onclick = () => changeMode('eraser');
document.getElementById('reset').onclick = () => reset();


function changePick(e){
    console.log(e)
    pickedColor = e;
    document.getElementById('a').style.color = `${e}`;
}
function changeMode(newMode){
    mode = newMode;
}

function reset(){
    let child = container.lastElementChild; 
    while(child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
    createGrid(currentSize);
}







// make it so that when a button is active, the button
// represents that somehow


function createGrid(perSide){
    const container = document.getElementById("container");
    for(let x = 0; x<(perSide*perSide); x++){
        const percent = 100/perSide;
        let div = document.createElement("div");
        div.style.width = `${percent}%`;
        div.style.display = "inline-block";
        div.style.paddingBottom = `${percent}%`;
        div.addEventListener("mouseover",  changeColor);
        div.addEventListener("mousedown",  changeColor);
        container.appendChild(div);
    }
}





// function reset(){
//     createGrid(16);
//     let mode = 'black';
// }

createGrid(40);


// global to ensure user intends to draw (mousedown)
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
    if(e.type== 'mouseover' && !mouseDown) return;
    switch(mode){
        case 'standard':
            e.target.style.backgroundColor = "#c70039";
            break;
        case 'rainbow':
            const r = createRndInteger(0,256);
            const g = createRndInteger(0,256);
            const b = createRndInteger(0,256);
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break;
        case 'eraser':
            e.target.style.backgroundColor = "white";
            break;
        case 'pick':
            e.target.style.backgroundColor = `${pickedColor}`;
            break;
    }
}

// Helper function to create random int [min,max]
function createRndInteger(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}