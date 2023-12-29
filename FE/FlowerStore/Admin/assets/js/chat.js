"use strict";



// Handle click chat icon

$("#chatIcon").click((e) => {
  $("#chatForm").show();
  $(this).hide();
});

$("#btnCloseChat").click((e) => {
  $("#chatForm").hide();
  $("#chatIcon").show();
});


if (localStorage.getItem("message") != null) {
  document.getElementById('messList').innerHTML = localStorage.getItem("message");
}


// End handle

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7126/chatHub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

var username;


const receiveMessage = async () => {
  if (!username) 
    return;

  try {
    await connection.on("ReceiveMessage", (user, message) => {

      const messageClass = username === user ? "send" : "received";
      appendMessage(message, messageClass);
    });
  } catch (error) {
    console.log(error);
  }
};

const appendMessage = (message, messageClass) => {
  const messageSectionEl = document.getElementById("messList");
  const msgBoxEl = document.createElement("div");
  msgBoxEl.classList.add("msg-box");
  msgBoxEl.classList.add(messageClass);
  msgBoxEl.innerHTML = message;
  messageSectionEl.appendChild(msgBoxEl);

  if(localStorage.getItem("message") === null)
    localStorage.setItem("message", message)
  else
    localStorage.setItem("message",localStorage.getItem("message") + message)
};


const start = async () => {
  try {
    await connection.start();
    if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token");
      const decodedToken = parseJwt(token);
      username = decodedToken.name;      
    }
  } catch (error) {
    console.log(error);
  }
};


// Send to user
$("#send").click(async (e) => {
    e.preventDefault();
  const user = username;
  const message = document.getElementById("messageInput");
  const msg = message.value; 

  if (!user) return;
    msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt");
  if (msg) {
    await sendMessage(user, `${user}: ${msg}`);
    message.value = "";
  }

});

$("#messageInput").keypress(async (e) => {
  if (e.key === 'Enter'){
    $("#messList").show();
    const user = username;
    const message = document.getElementById("messageInput");
    const msg = message.value; 
    
    if (!user) return;
      msg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt");
    if (msg) {
      await sendMessage(user, `${user}: ${msg}`);
      message.value = "";
    }
  }

});

const sendMessage = async (user,message) => {
    
    try {
        await connection.invoke('SendMessage', user, message);
    } catch (error) {
        console.log(error);
    }
}
// End send

const startApp = async () => {
  await start();
  // await joinUser();
  await receiveMessage();
};

startApp();

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(atob(base64));
}
