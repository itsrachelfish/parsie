// This file handles all the UI javascript

$(document).ready(function()
{
    $('.packet').keypress(function(event)
    {
        // When a user presses enter
        if(event.which == 13)
            $('.submit').trigger('click');
    });

    $('.submit').click(function()
    {
        var packet = $('.packet').val();
        socket.emit('packet', {message: packet});
        $('.packet').val('');
    });
});
