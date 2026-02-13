const knownDevices = new Map();
function addOrUpdateMicrobit(name, data) {
    const table = document.getElementById("microbitDisplayBoard");

    if (knownDevices.has(name)) {
        // Update existing row
        const row = knownDevices.get(name);
        row.cells[2].textContent = data; // update data cell
        return;
    }

    // Add new row
    const row = table.insertRow();

    // Always insert in order: 0, 1, 2
    const imgCell = row.insertCell(0); 
    const img = document.createElement("img");
    img.src = "static/images/microbit_1.webp";
    img.className = "microbitImg";
    imgCell.appendChild(img);

    const nameCell = row.insertCell(1);
    nameCell.textContent = name;

    const dataCell = row.insertCell(2);
    dataCell.textContent = data;

    const removeCell = row.insertCell(3);
    const btn = document.createElement("button");
    btn.textContent = "Remove Row";
    btn.className = "removeRow";
    removeCell.appendChild(btn)

    knownDevices.set(name, row);
}




//const dataBtn = document.getElementById("dataTXbtn") ;
//dataBtn.addEventListener("click", rxData)

async function rxData() {
    try {
        const response = await fetch("/getData");
        const obj = await response.json();
        addOrUpdateMicrobit(obj.name, obj.value);
    } catch (err) {
        console.error("Error receiving data:", err);
    }
}

setInterval(rxData, 1000); //no button, function runs every 4secs


const table = document.getElementById("microbitDisplayBoard");
table.addEventListener('click', function(event){ 
    if(event.target.classList.contains("removeRow")){
        const row = event.target.closest("tr");
        row.remove();
    }
});
