
(function(){
    const socket = io();
    document.querySelector('#messageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        socket.emit('message', {
            user: document.querySelector('#username').value,
            text: textToMorse(document.querySelector('#message-text').value)
        });
        document.querySelector('#message-text').value = "";
        return false;
    });

    socket.on('message', (msg) => {  
        
        const message = `<li>
            <span class="message-user">${msg.user} : </span>
            <span class="message-text">${msg.text}</span>
        </li>`
        document.querySelector('#all-messages').insertAdjacentHTML('beforeend', message);
    });
    socket.on('users', (count) => {
        document.querySelector('#online-users').innerHTML = `${count} users online`
    });
})()

function cleanText(msg) {
    let text = msg.toLowerCase().split('')
    let vowelList = ['a','i','o','u','e']
    let newText = text.filter(res => { 
        if(!vowelList.includes(res)) {
            return res
        }
    }).join('')
    
    return newText
}

function textToMorse(msg) {
    const text = msg.toLowerCase().split('')
   
    const letters = [ ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
    const morseLetters = [ " / ", ". ___", "___ . . .", "___ . ___ .", "___ . .", ".", ". . ___ .", "___ ___ .", ". . . .", ". .", ". ___ ___ ___", "___ . ___", ". ___ . .",  "___ ___", "___ .", "___ ___ ___", ". ___ ___ .", "___ ___ . ___", ". ___ .", ". . .", "_", ". . ___", ". . . ___", ". ___ ___", "___ . . ___", "___ . ___ ___", "___ ___ . .", ". ___ ___ ___ ___", ". . ___ ___ ___", ". . . ___ ___", ". . . . ___", ". . . . .", "___ . . . .", "___ ___ . . .", "___ ___ ___ . .", "___ ___ ___ ___ .", "___ ___ ___ ___ ___" ];
    
    let newText = text.map(res => { 
        let i = letters.indexOf(res)
        
        return morseLetters[i]
    }).join('')

    return newText
}