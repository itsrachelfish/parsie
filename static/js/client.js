// This file handles all the UI javascript

$(document).ready(function()
{
    $('.packet, .pattern').keypress(function(event)
    {
        // When a user presses enter
        if(event.which == 13)
            $('.submit').trigger('click');
    });

    $('.submit').click(function()
    {
        var packet = $('.packet').val();
        var pattern = $('.pattern').val();
        socket.emit('packet', {packet: packet, pattern: pattern});
    });
});
