$(document).ready(function() {
  function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'results-data.json', true);
      xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
              // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
              callback(xobj.responseText);
            }
      };
      xobj.send(null);
   }

   function convertToHtml(json_obj){
      var str = [];
      var str2 = ["<div class='row'>"];
     $.each(json_obj.names, function(index, val){
         if(index % 4 == 0){
             str.push("<div class='row'>");
             str.push("<div class='col-xs-1 col-xs-offset-1 text-center student'>");
         }else{
             str.push("<div class='col-xs-1 col-xs-offset-2 text-center student'>");
         }
         str.push("<img src='" + json_obj[val].URL + "' class='img-responsive'>");
         str.push("<h3>" + val + "</h3>");
         str.push("<p>Class " + json_obj[val].class + "<br/> " + json_obj[val].marks + "%</p>");
         str.push("</div>");
         if(index % 4 == 3)
            str.push("</div>")
     });
     $.each(json_obj.Places, function(index, val){
         str2.push("<h4 class=col-xs-offset-2>"+val+"</h4>");
     });
    return [str.join(""), str2.join("")];
   }

   function init() {
   loadJSON(function(response){
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);

      html_list = convertToHtml(actual_JSON)
      $('#resultsDiv').html(html_list[0]);
      $('#placesDiv').html(html_list[1]);
   });
  }

  init();
})
