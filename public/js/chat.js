



(function(){
    const socket = io();
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('message', document.querySelector('#message-text').value);
        document.querySelector('#message-text').value = "";
        return false;
    });
    socket.on('message', (msg) => {
        const newLi = document.createElement('li')
        newLi.textContent = msg
        document.querySelector('#all-messages').append(newLi);
    });
    socket.on('users', (data) => {
        document.querySelector('#online-users').innerHTML = data
    });
})()