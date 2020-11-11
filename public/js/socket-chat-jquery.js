// jQuery references.
const divUsers = $('#divUsers');
const formSend = $('#formSend');
const txtMessage = $('#txtMessage');
const divChatbox = $('#divChatbox');
const boxTitle = $('#box-title');


// Render users.
const renderUsers = (room, peopleList) => {
    let html = '';

    html = html + '<li>';
    html = html + `<a data-id='room' href="javascript:void(0)" class="active"> Chat of <span> ${ room }</span></a>`;
    html = html + '</li>';

    for (let i = 0; i < peopleList.length; i++) {
        html = html + '<li>'
        html = html + `<a data-id='${ peopleList[i].id }' href="javascript:void(0)"><img src="https://robohash.org/${ peopleList[i].name }${ peopleList[i].id }" alt="user-img" class="img-circle"> <span>${ peopleList[i].name } <small class="text-success">online</small></span></a>`
        html = html + '</li>'
    }

    divUsers.html(html);

    boxTitle.html(`Chat Room of <small>${ room } (${ peopleList.length })</small>`)
}

const renderMessages = (data, me) => {
    const date = new Date(data.date);
    const time = `${ date.getHours() }:${ date.getMinutes() }`;

    let html = '';
    console.log(me)
    if (me) {
        html = html + '<li class="reverse">'
        html = html + '    <div class="chat-content">'
        html = html + `        <h5>${ data.name }</h5>`
        html = html + `        <div class="box bg-light-inverse">${ data.message }</div>`
        html = html + '    </div>'
        html = html + `    <div class="chat-img"><img src="https://robohash.org/${ data.name }${ data.id }" alt="user" /></div>`
        html = html + `    <div class="chat-time">${ time }</div>`
        html = html + '</li>'
    } else {
        html = html + '<li class="animated fadeIn">';

        if (data.name !== 'Admin') {
            html = html + `<div class="chat-img"><img src="https://robohash.org/${ data.name }${ data.id }" alt="user" /></div>`;
        }

        html = html +     '<div class="chat-content">';
        html = html +         `<h5>${ data.name }</h5>`;
        html = html +         `<div class="box bg-light-${ data.name === 'Admin' ? 'danger' : 'info' }">${ data.message }</div>`;
        html = html +     '</div>';
        html = html +     `<div class="chat-time">${ time }</div>`;
        html = html + '</li>';
    }

    divChatbox.append(html);
    scrollBottom();
}

// Listeners.
divUsers.on('click', 'a', function() {
    const id = $(this).data('id');
    
    console.log(id);
});

formSend.on('submit', function(event) {
    event.preventDefault();

    if (txtMessage.val().trim().length <= 0) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    
    socket.emit('publicMessage', { name: params.get('name'), message: txtMessage.val() }, (data) => {
        txtMessage.val('').focus();
        renderMessages(data, true);
    });
});

const scrollBottom = () => {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}