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

   function convertToHtml(json_obj, choice, head){
     var str = ["<div class='row'><div class='col-md-8 col-md-offset-1'><h2>" + json_obj.head + "</h2></div></div>", "<div class='row'>"];
     if(choice == 1){

      $.each(json_obj.course_list, function(index, val){
        if(index % 2 == 0){
          str.push("<div class='col-md-4 col-xs-4 col-xs-offset-1 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");
        }else {
          str.push("<div class='col-md-4 col-xs-4 col-xs-offset-2 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");
        }
      });
    }else{
      $.each(json_obj.course_list, function(index, val){
        switch (index) {
          case 1:
          case 5:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-2 col-md-offset-2 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");

            break;
          case 0:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-1 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");

            break;
          case 2:
          case 4:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-1 col-md-offset-2 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");

            break;
          case 3:
            str.push("<div class='col-md-2 col-xs-4 col-xs-offset-2 col-md-offset-1 course' id='contactbtn' data-toggle='modal' data-target='#courseModal' data-key='"+ json_obj.keys[index] +"' data-head='" + head + "' data-title='" + val + "'><h3 class='course-title text-center'>" + val + "</h3><img src='" + json_obj.details[json_obj.keys[index]].Img +"' class='img-responsive'></div>");

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

      count = 1;
      for(x in actual_JSON){
          var id = '#' + x
          $(id).html(convertToHtml(actual_JSON[x], count, x));
          count += 1;
      }
      //$('#eleven_twelve').html(convertToHtml(actual_JSON.eleven_twelve, 2));
      //$('#pg_courses').html(convertToHtml(actual_JSON.pg_courses, 2));
   });
  }

  init();

  $('#courseModal').on('show.bs.modal', function(event){
     var div = $(event.relatedTarget);
     var head = div.data('head');
     var title = div.data('title');
     var key = div.data('key');
     var modal = $(this);
     var img = "";
     var about = "";
     modal.find('.modal-title').text(title);

     loadJSON(function(response){
         var actual_JSON = JSON.parse(response);

         img = "<img src='" + actual_JSON[head]["details"][key].Img + "' class='img-responsive'>";
         about = "<p>" + actual_JSON[head]["details"][key].About + "</p>"
         modal.find('#imgDiv').html(img);
         modal.find('#aboutDiv').html(about);
    });

  });

  $('#enquireBtn').on('click', function(event){
      document.querySelector('input[name="course"]').value = document.querySelector('#modalLabel').innerText;
      document.querySelector('#course').readOnly = true;
      document.querySelector('#aboutDiv').style.display = 'none';
      document.querySelector('#enquireBtn').style.display = 'none';
      document.querySelector('#courseForm').style.display = 'block';
  });

  $('#courseModal').on('hide.bs.modal', function(){
      document.querySelector('#course').readOnly = true;
      document.querySelector('#aboutDiv').style.display = 'block';
      document.querySelector('#enquireBtn').style.display = 'block';
      document.querySelector('#courseForm').style.display = 'none';
  });

});
