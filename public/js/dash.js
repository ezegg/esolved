var base_url = 'http://localhost/esolved/public/';
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

PageModel = {
    countCredits: 0,
    flag:0//that means is available
};

function loadSpinner() {
    //var target = $('#eliminar');
    var target = document.getElementById('spin');
    var spinner = new Spinner(opts).spin(target);
}

$(document).ready(function() {
    getClassesByAdministrador();
    getClassesByAlumno();
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

/******************* esolved **************************/

/*function createClass(){
    var target = document.getElementById('createClass');
    var spinner = new Spinner(opts).spin(target);

    var nombre = $('#nombre').val();
    var creditos = $('#creditos').val();
    var hora_inicio = $('.hora_inicio').val();
    var hora_fin = $('.hora_fin').val();
    var DATA = 'nombre='+nombre+'&creditos='+creditos+'&hora_inicio='+hora_inicio+'&hora_fin='+hora_fin;
    alert(DATA)
    $.ajax({
        url: base_url+'createClass',
        type: 'POST',
        data: DATA,
        contentType: 'application/x-www-form-urlencoded',
        success: function(data){
            if (data.error) {
                generate('error', 'error');
            } else{
                generate('success', 'Success');

            };
            //alert(data)
            spinner.stop();

        },
        error: function( xhr, ajaxOptions, thrownError ){
            spinner.stop();
            generate('error', 'Lo siento no es posible rechazar esta tarea');
        }
    });
}*/

function getClassesByAdministrador() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "getClassesByAdministrador",
        success: function(data) {
            //console.log(data);
            var model = $('#classesAministrador');
            model.empty();
            for (var i in data.classes) {
              var item = data.classes[i];

              if (item.obligatorio == 1) {
                var required = "<th class='center'><span>Required</span></th>";
              } else {
                var required = "<th class='center'></th>";
              }
              model.append("<tr><th class='center'>" + item.nombre + "</th>" +
                  "<th class='center'>" + item.creditos + "</th>" +
                  "<th class='center'>" + item.hora_inicio + "</th>" +
                  "<th class='center'>" + item.hora_fin + "</th>"+
                  required+
                  "<th class='center'><button type='button' class='btn btn-danger' onclick='showDeleteClass(" + item.id + ")'>Delete</button></th>");
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible mostrar los usuarios');
        }
    });
}

function showDeleteClass(id){
    notyButtonsDeleteClass('error', 'topCenter', id);
}

function deleteClass(id) {
    var target = document.getElementById('listUsers');
    var spinner = new Spinner(opts).spin(target);
    $.ajax({
        type: "GET",
        url: base_url + "deleteClass/" + id,
        success: function(data) {
            generate('success', 'Class delete Succes');
            spinner.stop();
            getClassesByAdministrador();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            spinner.stop();
            generate('error', 'error');
        }
    });
}

function getClassesByAlumno() {
    //console.debug('va a cambiar');
    $.ajax({
        type: "GET",
        url: base_url + "getClassesByAlumno",
        success: function(data) {
            //console.log(data);
            var model = $('#classes');
            model.empty();
            for (var i in data.classes) {
              var item = data.classes[i];

              if (item.obligatorio == 1) {
                addClassRequired(item);
              } else {
                if (item.days == 1) {
                  var days = "MWF";
                } else {
                  var days = "TTh";
                }
                var required = "";
                model.append("<div class='center col-md-12'>" + item.nombre + "</div>" +
                    "<div class='center col-md-12'>" + item.creditos + "</div>" +
                    "<div class='center col-md-4'>" + item.hora_inicio + "</div>" +
                    "<div class='center col-md-4'>" + item.hora_fin + "</div>"+
                    "<div class='center col-md-4'>" + days + "</div>"+
                    required+
                    "<div class='center col-md-12' style='box-shadow: 1px 1px 0px #888888;margin-bottom: 5px;'><button type='button' class='btn btn-info' onclick='addClassMySchedule(" + item.id + ")'>Add to Schedule</button></div>");
              }


            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            generate('error', 'Lo siento no fue posible mostrar los usuarios');
        }
    });
}

function addClassRequired(item) {
  //alert('entro');
  var model = $('#schedule');
  //model.empty();
  if (item.obligatorio == 1) {
    var required = "<th class='center'><span>Required</span></th>";
  } else {
    var required = "<th class='center'></th>";
  }
  if (item.days == "1") {
    model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
        "<th class='center'>" + item.nombre + "</th>" +
        "<th class='center'></th>" +
        "<th class='center'>" + item.nombre + "</th>"+
        "<th class='center'></th>" +
        "<th class='center'>" + item.nombre + "</th>");
        PageModel.countCredits += parseInt(item.creditos);
  } else {
    model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
        "<th class='center'></th>" +
        "<th class='center'>" + item.nombre + "</th>" +
        "<th class='center'></th>"+
        "<th class='center'>" + item.nombre + "</th>" +
        "<th class='center'></th>");
        PageModel.countCredits += parseInt(item.creditos);
  }
  countCredits();

}

function addClassMySchedule(id) {
  countCredits();
  $.ajax({
      type: "GET",
      url: base_url + "getClassById/"+id,
      success: function(data) {
          var model = $('#schedule');
          var firstTime = 0;
          for (var i in data.class) {
            var item = data.class[i];

            if ((item.id == 3 || item.id == 6) && PageModel.flag == 0) {
              PageModel.flag = item.id;
              if (item.days == "1") {
                model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>"+
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>");
                    PageModel.countCredits += parseInt(item.creditos);
              } else {
                model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>"+
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>");
                    PageModel.countCredits += parseInt(item.creditos);
              }
            } else if ((item.id == 3 || item.id == 6) && PageModel.flag != 0) {
              console.debug('lo siento no se puede agregar esta clase')
              notyButtonsCantAddClass('error', 'topCenter', null);
            } else if (item.id != 3 || item.id != 6) {
              if (item.days == "1") {
                model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>"+
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>");
                    PageModel.countCredits += parseInt(item.creditos);
              } else {
                model.append("<tr><th class='center' id='"+item.id+"'>" + item.hora_inicio+ '-' + item.hora_fin + "</th>" +
                    "<th class='center'></th>" +
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>"+
                    "<th class='center'>" + item.nombre + "</th>" +
                    "<th class='center'></th>");
                    PageModel.countCredits += parseInt(item.creditos);
            }

            countCredits();
          }
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
          generate('error', 'Lo siento no fue posible mostrar los usuarios');
      }
  });
}

function countCredits() {

  if (PageModel.countCredits >= 15 ) {
    $('#complete').css("display", "block");
  }
  var model = $('#countCredits');
  model.empty();
  model.append("<div class='circle'>"+PageModel.countCredits+"</div>");
}



/******************************************************/

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
