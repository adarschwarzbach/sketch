const container = document.getElementById("container");


function createGrid(perSide){
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

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
    if(e.type== 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = "red";
}