// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
function renderHomeView() {
    var html =
      "<h1>Directory</h1>" +
      "<input class='search-key' type='search' placeholder='Enter name'/>" +
      "<ul class='employee-list'></ul>";
    $('body').html(homeTpl());
    $('.search-key').on('keyup', findByName);
}
    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
    var service = new EmployeeService();
    service.initialize().done(function () {
        renderHomeView();

    });

    /* --------------------------------- Event Registration -------------------------------- */
    //$('.search-key').on('keyup', findByName);
    //$('.help-btn').on('click', function() {
    //    alert("Employee Directory v3.4");
    //});

document.addEventListener('deviceready', function () {
  if (navigator.notification) { // Override default HTML alert with native dialog
      window.alert = function (message) {
          navigator.notification.alert(
              message,    // message
              null,       // callback
              "Workshop", // title
              'OK'        // buttonName
          );
      };
  }
}, false);

    

    /* ---------------------------------- Local Functions ---------------------------------- */
    function findByName() {
        service.findByName($('.search-key').val()).done(function (employees) {
         //   var l = employees.length;
         //   var e;
         //   $('.employee-list').empty();
         //  for (var i = 0; i < l; i++) {
         //       e = employees[i];
          //      $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
          $('.content').html(employeeListTpl(employees));

            //}
        });
    }
