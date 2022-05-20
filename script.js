const container = document.getElementById("container");


function sixteen(){
    for(let x = 0; x<16; x++){
        let div = document.createElement("div");
        div.classList.add("sub");
        div.addEventListener("mouseover",  changeColor);
        div.addEventListener("mousedown",  changeColor);
        console.log("hi")
        container.appendChild(div);
    }
}

sixteen()

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeColor(e){
    if(e.type== 'mouseover' && !mouseDown) return;
    e.target.style.backgroundColor = "red";
}