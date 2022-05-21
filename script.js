
// Initialize page/variables
const DEFAULT_MODE = 'start'
const DEFUALT_SIZE = 40;
const DEFAULT_BUTTON_BORDER = '3px solid #c70039';
const SELECTED_BUTTON_BORDER = '3px solid #900c3f'

const PURPLE = '#581845';
const MAROON = '#900c3f';
const RED = '#c70039';
const ORANGE = '#ff5733';
const YELLOW = '#ffc20f';

let currentSize = DEFUALT_SIZE;
let mode = DEFAULT_MODE;
let pickedColor = RED;

denoteMode('start');

createGrid(40);


// Add event listeners to buttons/slider
// On click events are for button function
document.getElementById('standard').onclick = () => changeMode('standard');
document.getElementById('palette').onclick = () => changeMode('palette');

document.getElementById('pick').onclick = () => changeMode('pick');
document.getElementById('pick').onchange = (e) => changePick(e.target.value);

document.getElementById('rainbow').onclick = () => changeMode('rainbow');
document.getElementById('eraser').onclick = () => changeMode('eraser');
document.getElementById('reset').onclick = () => reset();

// Event listeners for resizing grid
document.getElementById('slider').onclick = (e) => resize(e.target.value);
document.getElementById('slider').oninput = (e) => updateSizeLabel(e.target.value);

// Event listeners for hover effect
document.getElementById('pick').onmouseenter = () => hoverPickA();
document.getElementById('pick').onmouseleave = () => hoverPickB();

document.getElementById('standard').onmouseenter = () => hoverStandardA();
document.getElementById('standard').onmouseleave = () => hoverStandardB();

document.getElementById('eraser').onmouseenter = () => hoverEraserA();
document.getElementById('eraser').onmouseleave = () => hoverEraserB();



// Change color variable from user input
function changePick(e){
    pickedColor = e;
    document.getElementById('a').style.color = `${e}`;
}

// The A and B function together create "hover" effect for Eraser button
function hoverEraserA(){
    document.getElementById('eraser').style.backgroundColor = "white";
    document.getElementById('eraser').style.color = "white";
}

function hoverEraserB(){
    if(mode == 'eraser'){
        document.getElementById('eraser').style.backgroundColor = MAROON;
    }
    else{
        document.getElementById('eraser').style.backgroundColor = 'rgb(236, 204, 200)';
        document.getElementById('eraser').style.color = MAROON;
    }
}

// The A and B function together create "hover" effect for Standard button
function hoverStandardA(){
    document.getElementById('standard').style.backgroundColor = RED;
}

function hoverStandardB(){
    if(mode == 'standard'){
        document.getElementById('standard').style.backgroundColor = MAROON;
    }
    else{
        document.getElementById('standard').style.backgroundColor = 'rgb(236, 204, 200)';
    }
}



// The A and B function together create "hover" effect for Rainbow button
function hoverPickA(){
    if(pickedColor== RED){
        document.getElementById('pick').style.backgroundColor = '#FC4F4F';
    }
    else{
        document.getElementById('pick').style.backgroundColor = pickedColor;
    }
}

function hoverPickB(){
    if(mode == 'pick'){
        document.getElementById('pick').style.backgroundColor = MAROON;
    }
    else{
        document.getElementById('pick').style.backgroundColor = 'rgb(236, 204, 200)';
    }
}




// change mode based on user input
function changeMode(newMode){
    console.log(newMode);
    mode = newMode;
    denoteMode(mode);
}


// completely clear grid
function clearGrid(){
    let child = container.lastElementChild; 
    while(child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

//clear grid - keep size
function reset(){
    clearGrid();
    createGrid(currentSize);
}

// resize grid based on slider input 
function resize(e){
    currentSize = e;
    clearGrid();
    createGrid(currentSize);
}

// update displayed grid size based on slider input
function updateSizeLabel(e){
    document.getElementById('gridSize').textContent= `${e} x ${e}`;
}




//create responsive grid
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




// global to ensure user intends to draw (mousedown)
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//handle current mode drawing effect
function changeColor(e){
    if(e.type== 'mouseover' && !mouseDown) return;
    switch(mode){
        case 'start':
            break
        case 'standard':
            e.target.style.backgroundColor = "#c70039";
            break;
        case 'palette':
            const randomColor = createRndInteger(1,5);
            if(randomColor == 1){
                e.target.style.backgroundColor = PURPLE;
            }
            else if(randomColor==2){
                e.target.style.backgroundColor = MAROON;
            }
            else if(randomColor==3){
                e.target.style.backgroundColor = RED;
            }
            else if(randomColor==4){
                e.target.style.backgroundColor = ORANGE;
            }
            else{
                e.target.style.backgroundColor = YELLOW;
            }
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

//change button effect to denote current mode
function denoteMode(mode){
    let buttons = document.querySelectorAll('.buttons');
    buttons.forEach((button) =>{
        button.style.border = DEFAULT_BUTTON_BORDER;
        button.style.color = PURPLE;
        button.style.backgroundColor = "rgb(236, 204, 200)"
        button.style.borderStyle = '';
    })
    switch(mode){
        case 'start':
            break;
        case 'standard':
            document.getElementById('standard').style.border = SELECTED_BUTTON_BORDER;
            document.getElementById('standard').style.color = "white";
            document.getElementById('standard').style.backgroundColor = MAROON
            document.getElementById('standard').style.borderStyle = 'outset';
            break;
        case 'palette':
            document.getElementById('palette').style.border = SELECTED_BUTTON_BORDER;
            document.getElementById('palette').style.color = "white";
            document.getElementById('palette').style.backgroundColor = MAROON
            document.getElementById('palette').style.borderStyle = 'outset';
            break;
        case 'rainbow':
            document.getElementById('rainbow').style.border = SELECTED_BUTTON_BORDER;
            document.getElementById('rainbow').style.color = "white";
            document.getElementById('rainbow').style.backgroundColor = MAROON
            document.getElementById('rainbow').style.borderStyle = 'outset';
            break;
        case 'eraser':
            document.getElementById('eraser').style.border = SELECTED_BUTTON_BORDER;
            document.getElementById('eraser').style.color = "white";
            document.getElementById('eraser').style.backgroundColor = MAROON
            document.getElementById('eraser').style.borderStyle = 'outset';
            break;
        case 'pick':
            document.getElementById('pick').style.border = SELECTED_BUTTON_BORDER;
            document.getElementById('pick').style.backgroundColor = MAROON
            document.getElementById('pick').style.borderStyle = 'outset';
            break;
    }
}



// Helper function to create random int [min,max]
function createRndInteger(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}