const DEFAULT_MODE = 'standard'
const DEFUALT_SIZE = 40;

const PURPLE = '#581845';
const MAROON = '#900c3f';
const RED = '#c70039';
const ORANGE = '#ff5733';
const YELLOW = 'ffc300';

let currentSize = DEFUALT_SIZE;
let mode = DEFAULT_MODE;
let pickedColor = '#c70039';


createGrid(40);;



document.getElementById('standard').onclick = () => changeMode('standard');
document.getElementById('palette').onclick = () => changeMode('palette');

document.getElementById('pick').onclick = () => changeMode('pick');
document.getElementById('pick').onchange = (e) => changePick(e.target.value);

document.getElementById('pick').onmouseenter = () => complementBackgroundPick();
document.getElementById('pick').onmouseleave = () => resetBackgroundPick();


document.getElementById('rainbow').onclick = () => changeMode('rainbow');
document.getElementById('eraser').onclick = () => changeMode('eraser');
document.getElementById('reset').onclick = () => reset();
document.getElementById('slider').onmousemove = (e) => resize(e.target.value);
document.getElementById('slider').onchange = (e) => updateSizeLabel(e.target.value);





function changePick(e){
    pickedColor = e;
    document.getElementById('a').style.color = `${e}`;
}

function complementBackgroundPick(){
    if(pickedColor== "#c70039"){
        document.getElementById('pick').style.backgroundColor = '#FC4F4F';
    }
    else{
        document.getElementById('pick').style.backgroundColor = pickedColor;
    }
}

function resetBackgroundPick(){
    document.getElementById('pick').style.backgroundColor = 'rgb(236, 204, 200)';
}

function changeMode(newMode){
    mode = newMode;
}

function clearGrid(){
    let child = container.lastElementChild; 
    while(child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function reset(){
    clearGrid();
    createGrid(currentSize);
}
function resize(e){
    if(mouseDown){
        currentSize = e;
        clearGrid();
        createGrid(currentSize);
    }
}


function updateSizeLabel(e){
    document.getElementById('gridSize').textContent= `${e} x ${e}`;
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
        case 'palette':
            
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