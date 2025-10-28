window.addEventListener('load', function () {

    // Open and connect socket
    let socket = io();
    // Listen for confirmation of connection
    socket.on('connect', function () {
        console.log("Connected");
    });

    // Assign a random user name
    const nameOptions = [
        "Callie", "Marie", "Pearl",
        "Marina", "Shiver", "Frye",
        "BigMan", "Agent3", "Agent8"
    ];

    const assignedName = nameOptions[Math.floor(Math.random() * nameOptions.length)];
    const nameDisplay = document.getElementById('user-label');
    if (nameDisplay) {
        nameDisplay.textContent = "You are " + assignedName;
    }

    /* --- Code to RECEIVE a socket message from the server --- */
    let chatBox = document.getElementById('chat-box-msgs');

    // Listen for messages named 'msg' from the server
    socket.on('msg', function (data) {
        console.log("Message arrived!");
        console.log(data);

        // Create a message string and page element
        let receivedMsg = data.name + ": " + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        // Add the element with the message to the page
        chatBox.appendChild(msgEl);
        // Auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Code to SEND a socket message to the Server --- */
    const emojiButtons = document.querySelectorAll('[data-emoji]');
    emojiButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const emoji = button.getAttribute('data-emoji');
            const msgObj = { "name": assignedName, "msg": emoji };

            // Send the message object to the server
            socket.emit('msg', msgObj);
        });
    });
});
