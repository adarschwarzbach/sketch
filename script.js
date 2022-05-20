




function createGrid(perSide){
    const container = document.getElementById("container");
    for(let x = 0; x<(perSide*perSide); x++){
        const percent = 100/perSide;
        let div = document.createElement("div");
        console.log(percent);
        div.style.width = `${percent}%`;
        div.style.display = "inline-block";
        div.style.paddingBottom = `${percent}%`;
        div.addEventListener("mouseover",  changeColor);
        div.addEventListener("mousedown",  changeColor);
        container.appendChild(div);
    }
}

createGrid(50);
let mode = 'rainbow';


function reset(){
    createGrid(16);
    let mode = 'black';

}


// global to ensure user intends to draw (mousedown)
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
    if(e.type== 'mouseover' && !mouseDown) return;
    switch(mode){
        case 'black':
            e.target.style.backgroundColor = "black";
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
        case 'choose':
            break;
    }
}

// Helper function to create random int [min,max]
function createRndInteger(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}