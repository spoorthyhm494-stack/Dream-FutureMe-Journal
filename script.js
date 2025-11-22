
function login() {
    // When user clicks login button, open dashboard page
    alert("Login successful!");
    window.location.href = "dashboard.html";
}


function saveMessage() {

    let messageBox = document.getElementById("futureMsg");
    let message = messageBox.value;


    if (message.trim() === "") {
        alert("Please write something before saving!");
        return;
    }

    let oldMessages = JSON.parse(localStorage.getItem("messages")) || [];

    oldMessages.push(message);

    localStorage.setItem("messages", JSON.stringify(oldMessages));

    messageBox.value = "";
    showMessages();
}


function showMessages() {

    let container = document.getElementById("savedMessages");

    if (!container) return;

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    container.innerHTML = ""; 

    messages.forEach((msg, index) => {
        let box = document.createElement("div");
        box.className = "saved-box";
        box.innerHTML = `
            <p>${msg}</p>
            <button onclick="deleteMessage(${index})">Delete</button>
        `;
        container.appendChild(box);
    });
}




function deleteMessage(index) {

    let messages = JSON.parse(localStorage.getItem("messages")) || [];

    messages.splice(index, 1); // remove selected message

    localStorage.setItem("messages", JSON.stringify(messages));

    showMessages(); // refresh list
}




window.onload = function () {
    showMessages();
};
