

/*  http://ned.im/noty/#/about  */


function generate(type, text) {
    var n = noty({
        text        : text,
        type        : type,
        dismissQueue: true,
        timeout     : 2500,
        closeWith   : ['click'],
        layout      : 'center',
        theme       : 'defaultTheme',
        maxVisible  : 10,
        animation: {
            open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
            close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
            easing: 'swing',
            speed: 5 // opening & closing animation speed
        },
    });
}

function notyButtonsDeleteClass(type, layout, id) {
    var n = noty({
        text        : 'Confirm',
        type        : type,
        dismissQueue: true,
        layout      : layout,
        theme       : 'defaultTheme',
        buttons     : [
            {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                $noty.close();
                //noty({dismissQueue: true, force: true, layout: layout, theme: 'defaultTheme', text: 'Lo has confirmado', type: 'success'});
                deleteClass(id);
            }
            },
            {addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                $noty.close();
                //noty({dismissQueue: true, force: true, layout: layout, theme: 'defaultTheme', text: 'Cancelado', type: 'error'});
            }
            }
        ]
    });
}

function notyButtonsDeleteTask(type, layout, id) {
    var n = noty({
        text        : 'Confirmación',
        type        : type,
        dismissQueue: true,
        layout      : layout,
        theme       : 'defaultTheme',
        buttons     : [
            {addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                $noty.close();
                //noty({dismissQueue: true, force: true, layout: layout, theme: 'defaultTheme', text: 'Lo has confirmado', type: 'success'});
                deleteTask(id);
            }
            },
            {addClass: 'btn btn-danger', text: 'Cancelar', onClick: function ($noty) {
                $noty.close();
                //noty({dismissQueue: true, force: true, layout: layout, theme: 'defaultTheme', text: 'Cancelado', type: 'error'});
            }
            }
        ]
    });
}
