var base_url = 'http://172.16.71.230/authLaravelSimple/public/';
/*Necesario para el spinner*/
var opts = {
    lines: 15, // The number of lines to draw
    length: 17, // The length of each line
    width: 25, // The line thickness
    radius: 50, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 64, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#1976D2', // #rgb or #rrggbb or array of colors
    speed: 2, // Rounds per second
    trail: 48, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};
/*Necesario para el spinner*/

function loadSpinner() {
    //var target = $('#eliminar');
    var target = document.getElementById('spin');
    var spinner = new Spinner(opts).spin(target);
}

$(document).ready(function() {
    getUsers();
    getTasks();
    getTasksSuperAdmin();
    listUsers();
    $(".datepicker").datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $("form").submit(function(event) {
        var target = document.getElementById('asignarTarea');
        var target1 = document.getElementById('updateUser');
        var target2 = document.getElementById('registrarUsuario');
        var target3 = document.getElementById('sendRejectTask');
        var spinner = new Spinner(opts).spin(target);
        var spinner1 = new Spinner(opts).spin(target1);
        var spinner2 = new Spinner(opts).spin(target2);
        var spinner3 = new Spinner(opts).spin(target3);
    });
});

function showView(id, clases) {
    //console.debug(id+'    '+ clases);

    $('.' + clases).hide();
    $('#' + id).show();
}

function addClassActive(id) {
    $('.nav-sidebar > li').removeClass('active');
    $('.nav-sidebar > li#' + id).addClass('active');
}

function getUsers() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "getUsers",
        success: function(data) {
            //console.log(data);
            var model = $('#usuarios');
            model.empty();
            for (var i in data.users) {
                var item = data.users[i];
                model.append("<option value='" + item.id + "'>" + item.first_name + "</option>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible mostrar los usuarios');
        }
    });
}

function getTasks() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "getTasks",
        success: function(data) {
            d = new Date();
            //console.log(data);
            var model = $('#tasks');
            model.empty();
            for (var i in data.tasks) {
                var item = data.tasks[i];
                if (item.fecha_respuesta == d.format('Y\\-m\\-d 00\\:00\\:00')) {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-danger' style='border-radius:45%;'></button></th>";
                } else {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-success' style='border-radius:45%;'></button></th>";
                };
                model.append("<tr><th class='center'>" + item.folio + "</th>" +
                    "<th class='center'>" + item.oficio_referencia + "</th>" +
                    "<th class='center'>" + item.asunto + "</th>" +
                    "<th class='center'>" + item.first_name + "</th>" +
                    //"<th class='center shortDateFormat'>" + item.fecha_respuesta + "</th>" +
                    //"<th class='center'>" + item.estatus +
                    semaforo +
                    "<th class='center'><button type='button' class='btn btn-info' onclick='getTaskDetailsByIdOperative(" + item.id + ")'>Ver Detalles</button></th>"+
                    "<th class='center'><button type='button' class='btn btn-warning' onclick='showRejectTask(" + item.id + ")'>Rechazar</button></th>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible mostrar las tareas asignadas');
        }
    });
}

function getTasksSuperAdmin() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "getTasksSuperAdmin",
        success: function(data) {
            //console.log(data);
            d = new Date();
            var model = $('#tasksSuperAdmin');
            model.empty();
            for (var i in data.tasks) {
                var item = data.tasks[i];
                var fechar = item.fecha_respuesta;
                //alert( $.format.parseDate(fechar, 'dd/MM/yyyy'))
                if (item.fecha_respuesta == d.format('Y\\-m\\-d 00\\:00\\:00')) {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-danger' style='border-radius:45%;'></button></th>";
                } else {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-success' style='border-radius:45%;'></button></th>";
                };
                model.append("<tr><th class='center'>" + item.folio + "</th>" +
                    "<th class='center'>" + item.oficio_referencia + "</th>" +
                    "<th class='center'>" + item.asunto + "</th>" +
                    "<th class='center'>" + item.first_name + "</th>" +
                    //"<th class='center shortDateFormat'>" + item.fecha_respuesta + "</th>" +
                    //"<th class='center'>" + item.estatus +
                    semaforo +
                    "<th class='center'><button type='button' class='btn btn-info' onclick='getTaskDetailsById(" + item.id + ")'>Ver Detalles</button></th>" +
                    "<th class='center'><button type='button' class='btn btn-danger' onclick='showDeleteTask(" + item.id + ")'>Eliminar</button></th> </tr>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible mostrar las tareas asignadas');
        }
    });
}

function listUsers() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "listUsers",
        success: function(data) {
            //console.log(data);
            var model = $('#listUsers');
            model.empty();
            for (var i in data.users) {
                var item = data.users[i];
                model.append("<tr><th value='" + item.id + "'>" + item.id + "</th>" +
                    "<th value='" + item.email + "'>" + item.first_name + "</th>" +
                    "<th value='" + item.email + "'>" + item.email + "</th>" +
                    "<th value='" + item.email + "'>" + item.username + "</th>" +
                    "<th><button type='button' class='btn btn-danger' onclick='showDeleteuser(" + item.id + ")'>Eliminar</button></th>" + "</tr>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible Listar los usuarios');
        }
    });
}

function showDeleteuser(id){
    notyButtonsDeleteUser('error', 'topCenter', id);
}

function deleteUser(id) {    var target = document.getElementById('listUsers');
    var spinner = new Spinner(opts).spin(target);
    $.ajax({
        type: "GET",
        url: base_url + "deleteUser/" + id,
        success: function(data) {
            generate('success', 'Usuario eliminado correctamente');
            spinner.stop();
            listUsers();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'Lo siento no fue posible eliminar este usuario');
        }
    });
}

function cleanDD() {
    var target = document.getElementById('limpiarEspacio');
    var spinner = new Spinner(opts).spin(target);
    $.ajax({
        type: "GET",
        url: base_url + "cleanDD",
        success: function(data) {
            generate('success', 'Servidor Limpio');
            spinner.stop();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'Lo siento no fue posible limpiar tu servidor');
        }
    });
}

function showDeleteTask(id){
    notyButtonsDeleteTask('error', 'topCenter', id);

}

function deleteTask(id) {
    var target = document.getElementById('main');
    var spinner = new Spinner(opts).spin(target);
    $.ajax({
        type: "GET",
        url: base_url + "deleteTask/" + id,
        success: function(data) {
            generate('success', 'Tarea eliminada correctamente');
            spinner.stop();
            getTasksSuperAdmin();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'Lo siento no es posible eliminar estar tarea');
        }
    });
}

function getTaskDetailsById(id) {
    //console.debug('va a cambiar');
    showView('verDetalleTarea', 'ocultar')
    $.ajax({
        type: "GET",
        url: base_url + "getTaskDetailsById/" + id,
        success: function(data) {

            d = new Date();
            //console.log(data);
            var model = $('#detailsTask');
            model.empty();
            for (var i in data.tasks) {
                var item = data.tasks[i];
                if (item.fecha_respuesta == d.format('Y\\-m\\-d 00\\:00\\:00')) {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-danger' style='border-radius:45%;'></button></th>";
                } else {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-success' style='border-radius:45%;'></button></th>";
                };

                if (item.directoryResponseFile.length>0) {
                    var directoryResponseFile = "<a href='"+base_url+item.directoryResponseFile+"' download><i class='fa fa-cloud-upload'></i>Documento Respuesta</a>";
                } else {
                    var directoryResponseFile = "";
                };

                if (item.directoryFile.length>0) {
                    var directoryFile = "<a href='"+base_url+item.directoryFile+"' download><i class='fa fa-cloud-download'></i>Documento Asignado</span></a>";
                } else {
                    var directoryFile = "";
                };

                model.append(
                    "<form method='POST' id='updateTask' action='" + base_url + "updateTask/" + item.id + "'  accept-charset='UTF-8' role='form' enctype='multipart/form-data' class='fluid' style='margin-top:5px;'>" +
                        "<div class='container'>"+
                            "<div class='row'>"+
                                "<div class=''>"+
                                    "<div class='panel panel-default'>"+
                                        "<div class='panel-body'>"+
                                            "<div class='pull-right'>"+
                                                directoryFile+
                                                directoryResponseFile+
                                            "</div>"+
                                            "<br>" +
                                            "<input name='admin_id' type='hidden' value='" + item.admin_id + "'>"+
                                            "<label for='Folio'>Folio</label>" +
                                            "<input id='folio' class='form-control' placeholder='Folio' autofocus='' name='folio' type='text' value='" + item.folio + "'>" +
                                            "<br>" +
                                            "<label for='Oficio Referencia'>Oficio Referencia</label>" +
                                            "<input id='oficio_referencia' class='form-control' placeholder='Oficio Referencia' autofocus='' name='oficio_referencia' type='text' value='" + item.oficio_referencia + "'>" +
                                            "<br>" +
                                            "<label for='Asunto'>Asunto</label>" +
                                            "<input id='asunto' class='form-control' placeholder='Asunto' autofocus='' name='asunto' type='text' value='" + item.asunto + "'>" +
                                            "<br>" +
                                            "<label for='Fecha de Recepción'>Fecha de Recepción:" + item.fecha_recepcion + "</label>" +
                                            "<br>" +
                                            "<label for='Fecha de Recepción'>Actualizar Fecha de Recepción</label>" +
                                            "<input class='datepicker' type='date' name='fecha_recepcion' value='" + item.fecha_recepcion + "' id='fecha_recepcion'>" +
                                            "<br>" +
                                            "<br>" +
                                            "<label for='Fecha de Respuesta'>Fecha de Respuesta:" + item.fecha_respuesta + "</label>" +
                                            "<br>" +
                                            "<label for='Fecha de Respuesta'>Actualizar Fecha de Respuesta</label>" +
                                            "<label for='Fecha de respuesta'>Fecha Respuesta</label>" +
                                            "<!-- class , type, name -->" +
                                            "<input class='datepicker' type='date' name='fecha_respuesta' value='" + item.fecha_respuesta + "' id='fecha_respuesta'>" +
                                            "<br>" +
                                            "<label for='Area Generadora'>Area Generadora</label>" +
                                            "<input id='area_generadora' class='form-control' placeholder='Area Generadora' autofocus='' name='area_generadora' type='text' value='" + item.area_generadora + "'>" +
                                            "<br>" +
                                            "<label for='Nombre del titular'>Nombre del Titular</label>" +
                                            "<input id='nombre_titular' class='form-control' placeholder='Nombre Titular' autofocus='' name='nombre_titular' type='text' value='" + item.nombre_titular + "'>" +
                                            "<br>" +
                                            "<label for='Asignado a'>Asignado a</label>" +
                                            "<select id='usuarios' name='user_id'><option value='" + item.user_id + "'>" + item.first_name + "</option></select>" +
                                            "<br>" +
                                            "<br>" +
                                            "<label for='Ubicación Topografica'>Ubicación Topografica</label>" +
                                            "<input id='ubicacion_topografica' class='form-control' placeholder='Ubicacion Topografica' autofocus='' name='ubicacion_topografica' type='text' value='" + item.ubicacion_topografica + "'>" +

                                            "<br>" +
                                            "<label for='Estatus'>Estatus</label>" +
                                            "<select id='estatus' name='estatus'>" +
                                            "<option selected>"+item.estatus+"</option>" +
                                            "<option>En seguimiento</option>" +
                                            "<option>Atendido</option>" +
                                            "<option>Finalizado</option>" +
                                            "</select>" +
                                            "<br>" +
                                            "<br>" +
                                            "<p class='center'>" +
                                            "<input type='submit' value='Actualizar' class='btn btn-success'>" +
                                            "</p>" +
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+         
                    "</form>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'Lo siento no es posible obtener los detalles de esta tarea');
        }
    });
}

function getTaskDetailsByIdOperative(id) {
    //console.debug('va a cambiar');
    showView('verDetalleTarea', 'ocultar');
    $.ajax({
        type: "GET",
        url: base_url + "getTaskDetailsById/" + id,
        success: function(data) {

            d = new Date();
            //console.log(data);
            var model = $('#detailsTask');
            model.empty();
            for (var i in data.tasks) {
                var item = data.tasks[i];
                if (item.fecha_respuesta == d.format('Y\\-m\\-d 00\\:00\\:00')) {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-danger' style='border-radius:45%;'></button></th>";
                } else {
                    var semaforo = "<th class='center'><button type='button' class='btn btn-success' style='border-radius:45%;'></button></th>";
                };

                if (item.directoryResponseFile.length>0) {
                    var directoryResponseFile = "<a href='"+base_url+item.directoryResponseFile+"' download><i class='fa fa-cloud-upload'></i>Documento Respuesta</a>";
                } else {
                    var directoryResponseFile = "";
                };

                if (item.directoryFile.length>0) {
                    var directoryFile = "<a href='"+base_url+item.directoryFile+"' download><i class='fa fa-cloud-download'></i>Documento Asignado</span></a>";
                } else {
                    var directoryFile = "";
                };

                model.append(
                    "<form method='POST' id='updateTask' action='" + base_url + "updateTask/" + item.id + "'  accept-charset='UTF-8' role='form' enctype='multipart/form-data' class='fluid'>" +
                        "<div class='container'>"+
                            "<div class='row'>"+
                                    "<div class='col-md-5 col-md-offset-4'>"+
                                        "<div class='panel panel-default'>"+
                                            "<div class='panel-body'>"+
                                                "<div>"+
                                                    "<div class='text-center'>"+
                                                        directoryFile+
                                                        "<br>" +
                                                        directoryResponseFile+
                                                    "</div>"+
                                                    "<br>" +
                                                    "<input name='admin_id' type='hidden' value='" + item.admin_id + "'>"+
                                                    "<input name='folio' type='hidden' value='" + item.folio + "'>"+
                                                    "<input name='oficio_referencia' type='hidden' value='" + item.oficio_referencia + "'>"+
                                                    "<input name='asunto' type='hidden' value='" + item.asunto + "'>"+
                                                    "<input name='fecha_recepcion' type='hidden' value='"+item.fecha_recepcion+"'>"+
                                                    "<input name='fecha_respuesta' type='hidden' value='"+ item.fecha_respuesta +"'>"+
                                                    "<input name='area_generadora' type='hidden' value='" + item.area_generadora + "'>"+
                                                    "<input name='nombre_titular' type='hidden' value='" + item.nombre_titular + "'>"+
                                                    "<input name='user_id' type='hidden' value='" + item.user_id + "'>"+
                                                    "<input name='ubicacion_topografica' type='hidden' value='" + item.ubicacion_topografica + "'>"+
                                                    "<input name='' type='hidden' value=''>"+

                                                    "<label for='Fecha de Recepción'>Folio: " + item.folio + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Oficio Referencia:" + item.oficio_referencia + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Asunto:" + item.asunto + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Fecha de Recepción:" + item.fecha_recepcion + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Fecha de Respuesta:" + item.fecha_respuesta + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Area generadora:" + item.area_generadora + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'Nombre titular:" + item.nombre_titular + "</label>" +
                                                    "<br>" +
                                                    "<label for='Fecha de Recepción'>Ubicacion topografica:" + item.ubicacion_topografica + "</label>" +
                                                    "<br>" +                                                
                                                    "<label for='Estatus'>Estatus</label>" +
                                                    "<select id='estatus' name='estatus'>" +
                                                    "<option selected>"+item.estatus+"</option>" +
                                                    "<option>En seguimiento</option>" +
                                                    "<option>Atendido</option>" +
                                                    "<option>Finalizado</option>" +
                                                    "</select>" +
                                                    "<br>" +
                                                    "<br>" +
                                                    "<input id='filePdf' name='filePdf' type='file'>"+
                                                    "<br>" +
                                                    "<p class='center'>" +
                                                    "<input type='submit' value='Actualizar Tarea' class='btn btn-success'>" +
                                                    "</p>" +
                                                  
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                        "</div>"+                    
                    "</form>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'Lo siento no es posible obtener los detalles de esta tarea');
        }
    });
}

function showRejectTask(id){
    showView('rechazarTarea', 'ocultar');

     var model = $('#showRejectTask');
            model.empty();
            model.append("<form method='POST' id='sendRejectTask' action='" + base_url + "sendRejectTask/" + id + "'  accept-charset='UTF-8' role='form' enctype='multipart/form-data' class='fluid'>" +
                "</br><span>Lo sentimos quizás esta mal asignada esta tarea. Escribe tus comentarios por favor.</span>"+
                "<textarea id='comentariosRechazarTarea' class='form-control fluid' placeholder='Comentarios... ' name='comentarios'></textarea>"+      
                "</form>"+
                "<div class='center'><button type='button' class='btn btn-success' onclick='sendRejectTask("+id+");'>Rechazar esta tarea</button></div>");
}

function sendRejectTask(id){
    var target = document.getElementById('sendRejectTask');
    var spinner = new Spinner(opts).spin(target);
    
    var comentarios = $('#comentariosRechazarTarea').val();
    var DATA = 'id='+id+'&comentarios='+comentarios;
    //alert(DATA)
    $.ajax({
        url: base_url+'sendRejectTask',
        type: 'POST',
        data: DATA,
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.error) {
                generate('error', 'Lo siento no es posible rechazar esta tarea');
            } else{
                generate('success', 'Tarea rechazada correctamente, espera la validación');

            };
            //alert(data)
            spinner.stop();
            
        },
        error: function( xhr, ajaxOptions, thrownError ){
            spinner.stop();
            generate('error', 'Lo siento no es posible rechazar esta tarea');
        }
    });
}

function search () {
    var target = document.getElementById('main');
    var spinner = new Spinner(opts).spin(target);
    var search = $('#search').val();
    var DATA = 'search='+search;
    //alert(DATA)
    $.ajax({
        url: base_url+'search',
        type: 'GET',
        data: DATA,
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            console.debug(data)
            if (data.error) {
                generate('error', 'Lo siento no es posible realizar esta busqueda');
            } else{
                generate('success', 'busqueda exitosa');
                drawSearch(data);

            };
            //alert(data)
            spinner.stop();
            
        },
        error: function( xhr, ajaxOptions, thrownError ){
            spinner.stop();
            generate('error', 'Lo siento no es posible realizar esta busqueda');
        }
    });
}

function drawSearch(data){
    d = new Date();
    var model = $('#tasksSuperAdmin');
    model.empty();
    for (var i in data.busqueda) {
        var item = data.busqueda[i];
        var fechar = item.fecha_respuesta;
        //alert( $.format.parseDate(fechar, 'dd/MM/yyyy'))
        if (item.fecha_respuesta == d.format('Y\\-m\\-d 00\\:00\\:00')) {
            var semaforo = "<th class='center'><button type='button' class='btn btn-danger' style='border-radius:45%;'></button></th>";
        } else {
            var semaforo = "<th class='center'><button type='button' class='btn btn-success' style='border-radius:45%;'></button></th>";
        };
        model.append("<tr><th class='center'>" + item.folio + "</th>" +
            "<th class='center'>" + item.oficio_referencia + "</th>" +
            "<th class='center'>" + item.asunto + "</th>" +
            "<th class='center'>" + item.first_name + "</th>" +
            //"<th class='center shortDateFormat'>" + item.fecha_respuesta + "</th>" +
            //"<th class='center'>" + item.estatus +
            semaforo +
            "<th class='center'><button type='button' class='btn btn-info' onclick='getTaskDetailsById(" + item.id + ")'>Ver Detalles</button></th>" +
            "<th class='center'><button type='button' class='btn btn-danger' onclick='showDeleteTask(" + item.id + ")'>Eliminar</button></th> </tr>");
    }
}

/*libraries*/

jQuery(function() {
    var shortDateFormat = 'dd/MM/yyyy';
    var longDateFormat = 'dd/MM/yyyy HH:mm:ss';

    jQuery(".shortDateFormat").each(function(idx, elem) {
        if (jQuery(elem).is(":input")) {
            jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), shortDateFormat));
        } else {
            jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), shortDateFormat));
        }
    });
    jQuery(".longDateFormat").each(function(idx, elem) {
        if (jQuery(elem).is(":input")) {
            jQuery(elem).val(jQuery.format.date(jQuery(elem).val(), longDateFormat));
        } else {
            jQuery(elem).text(jQuery.format.date(jQuery(elem).text(), longDateFormat));
        }
    });
});