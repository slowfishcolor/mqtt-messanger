/**
 * Created by Prophet on 2017/1/10.
 */
$(document).ready(function () {

    var client,receiveDestination, sendDestination;

    /**
     * connect and subscribe
     */
    $('#subscribe-button').click(function () {
        var url = "ws://www.prophet-xu.com:61614/stomp";
        var login = "";
        var passcode = "";
        receiveDestination = "/topic/" + $('#topic').val();

        sendDestination = "/topic/messanger.topic.device";

        // Stomp client
        client = Stomp.client(url);

        // log debug message
        client.debug = function (str) {
            console.log(str);
        };

        // the client is notified when it is connected to the server.
        // on connect callback
        var onconnect = function (frame) {
            client.debug("connect to Stomp");

            $('#topic').attr("disabled", true);
            $('#subscribe-button').attr("disabled", true);
            $('#unsubscribe-button').attr("disabled", false);
            $('#send-button').attr("disabled", false);

            // subscribe receive topic
            client.subscribe(receiveDestination, function (message) {
                var d = document.createElement("div");
                d.setAttribute("class", "list-group-item");
                var t = document.createTextNode(message.body);
                d.appendChild(t);

                $(d).hide().prependTo($('#receive-list')).slideDown();
            })
        };

        // connect to broker
        client.connect(login, passcode, onconnect);
    });

    /**
     * disconnect
     */
    $('#unsubscribe-button').click(function () {
        client.disconnect(function () {
            // disconnect call back
            $('#topic').attr("disabled", false);
            $('#subscribe-button').attr("disabled", false);
            $("#unsubscribe-button").attr("disabled", true)
            $('#send-button').attr("disabled", true);

        });
    });

    /**
     * send message
     * use submit() instead of onclick to response to 'enter'
     */
    $('#send-form').submit(function () {
        var text = $('#send-message').val();
        if (text) {
            // send message
            client.send(sendDestination, {foo: 1}, text);
            // gui change
            var d = document.createElement("div");
            d.setAttribute("class", "list-group-item");
            var t = document.createTextNode($('#send-message').val());
            d.appendChild(t);
            $(d).hide().prependTo($('#send-list')).slideDown();
            $('#send-message').val("");
        }
        // do not submit
        return false;
        }
    );
    /**
     * disconnect when page is closed
     */
    $(window).bind('beforeunload',function(){
        client.disconnect();
    });
});