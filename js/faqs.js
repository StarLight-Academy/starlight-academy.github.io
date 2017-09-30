$(document).ready(function() {
  function loadJSON(callback) {

      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'faqs.json', true);
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
     $.each(json_obj, function(index, val){
       str.push("<div class='row'><div class='col-md-10 col-md-offset-1 col-xs-offset-1'><h3 class='faq'>" + "Q. " + val.q + "</h3><p class='answer'>" + "A: " + val.a + "</p></div></div>");
     });
     return str;
   }

   function init() {
   loadJSON(function(response) {
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);

      console.log(actual_JSON);
      $('#faqs').html(convertToHtml(actual_JSON));
   });
  }

  init();
});
