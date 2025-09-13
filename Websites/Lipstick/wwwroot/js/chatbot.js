"use strict"
// Chatbot logic
const chatbotBaseUrl = "https://lulusia.com/";
const signalRUrl = chatbotBaseUrl+ "chat";
const streamOllamaUrl = chatbotBaseUrl + "api/ollama/getstreamingresponse";
let context = [];
let message = '';
let keyMess = 0;
let connection;

export function showChatBox() {
    var chatbox = $('#chatbox');
    if (chatbox.hasClass('d-none')) {
        chatbox.removeClass('d-none');
        startSignalRConnection();
    } else {
        chatbox.addClass('d-none');
        stopSignalRConnection();
    }
}
function startSignalRConnection() {
    connection = new signalR.HubConnectionBuilder().withUrl(signalRUrl).build();
    connection.start().then(function () {
        console.log("SignalR connection established.");
    }).catch(function (err) {
        return console.error(err.toString());
    });
    connection.on("ReceiveMessage", function (res, context) {
        message += res;
        document.getElementById(`messageId_${keyMess}`).innerHTML = message;
        if (context) {
            context = context;
        }
    });
}
function stopSignalRConnection() {
    if (connection) {
        connection.stop().then(function () {
            console.log("SignalR connection stopped.");
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }
}
export function setupChatInput() {
    $('#inputQuestion').keypress(function (e) {
        if (e.which == 13) {
            var question = $(this).val();
            if (question.trim() !== '') {
                var chatboxContent = $('#chatbox .chatboxContent');
                chatboxContent.append('<div class="request mb-3">' + question + '</div>');
                $(this).val('');
                $.ajax({
                    type: 'POST',
                    url: streamOllamaUrl,
                    data: JSON.stringify({
                        request: question,
                        model: "gemma3",
                        context: context,
                        stream: true
                    }),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (res) {
                        keyMess++;
                        message = '';
                        chatboxContent.append(`<div class="response mb-3"><img class="avatar me-2" src="/assets/images/chopper.png"/><div id="messageId_${keyMess}" class="responseContent"></div></div>`);
                        chatboxContent.scrollTop(chatboxContent[0].scrollHeight);
                        console.log("Completed request!");
                    },
                    error: function (error) {
                        console.error("Error submitting form:", error);
                    }
                });
            } else {
                $(this).val('');
            }
        }
    });
}