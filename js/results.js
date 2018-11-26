$(document).ready(function() {

   function convertToHtml(json_obj){
      var str = ["<div class='col-xs-10 col-xs-offset-1 table-responsive'>",
                 "<table class='table table-hover' style='font-size:20px'>",
                 "<thead class='thead-dar'>",
                 "<tr><th scopr='col' class='text-center'>#</th><th scopr='col' class='text-center'>Name</th><th scopr='col' class='text-center'>Marks</th></tr>",
                 "</thead>"];
      var str2 = ["<div class='row'>"];
     $.each(json_obj.results, function(index, val){
         str.push('<tr>');
         str.push('<td class="text-center">' + (index+1) + '</td>');
         str.push('<td class="text-center">' + val.name + '</td>');
         str.push('<td class="text-center">' + val.marks + '</td>');
         str.push('</tr>')
     });
     str.push('</table></div>')
     $.each(json_obj.Places, function(index, val){
         str2.push("<h4 class=col-xs-offset-1><b>&#9672;</b> "+val+"</h4>");
     });
    return [str.join(""), str2.join("")];
   }

   function init() {
   loadJSON(function(response){
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);

      html_list = convertToHtml(actual_JSON);
      $('#resultsDiv').html(html_list[0]);
      $('#placesDiv').html(html_list[1]);
  }, 'results-data.json');
  }

  init();
})
