$(document).ready(function() {
  function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'courses.json', true);
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);
   }

   function convertToHtml(json_obj, choice){
     var str = ["<div class='row'><div class='col-md-8 col-md-offset-1'><h2>" + json_obj.head + "</h2></div></div>", "<div class='row'>"];
     if(choice == 1){

      $.each(json_obj.course_list, function(index, val){
        if(index % 2 == 0){
          str.push("<div class='col-md-4 col-xs-4 col-xs-offset-1 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");
        }else {
          str.push("<div class='col-md-4 col-xs-4 col-xs-offset-2 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");
        }
      });
    }else{
      $.each(json_obj.course_list, function(index, val){
        switch (index) {
          case 1:
          case 5:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-2 col-md-offset-2 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");

            break;
          case 0:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-1 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");

            break;
          case 2:
          case 4:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-1 col-md-offset-2 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");

            break;
          case 3:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-2 col-md-offset-1 course'><h3 class='course-title text-center'>" + val + "</h3><img src=" + json_obj.details[json_obj.keys[index]] +" class='img-responsive'></div>");

            break;
          default:

        }
      });
    }
    str.push("</div>");
    return str.join("");
   }

   function init() {
   loadJSON(function(response) {
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);

      $('#nine_ten').html(convertToHtml(actual_JSON.nine_ten, 1));
      $('#eleven_twelve').html(convertToHtml(actual_JSON.eleven_twelve, 2));
      $('#cs_courses').html(convertToHtml(actual_JSON.cs_courses, 2));
   });
  }

  init();

});
