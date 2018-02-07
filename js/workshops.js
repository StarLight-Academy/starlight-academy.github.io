$(document).ready(function() {

   function convertToHtml(json_obj, head){
      var str = ["<div class='row'>"];
     $.each(json_obj.title, function(index, val){
         if(index % 3 == 0){
             str.push("<div class='col-xs-4 col-xs-offset-1 col-md-2 workshop' data-toggle='modal' data-target='#workshopModal' data-key=\""+ val +"\" data-head=\"" + head + "\" data-title=\"" + val + "\">");
         }else{
             str.push("<div class='col-xs-4 col-xs-offset-1 col-md-offset-2 col-md-2 workshop' data-toggle='modal' data-target='#workshopModal' data-key=\""+ val +"\" data-head=\"" + head + "\" data-title=\"" + val + "\">");
         }
         str.push("<h3 class='workshop-title text-center'>" + val + '</h3>');
         str.push("<img src='" + json_obj[val].Img + "' class='img-responsive'>");
         str.push('</div>');
     });
     return str.join("");
   }

   function init() {
   loadJSON(function(response) {
    // Parse JSON string into object
      var actual_JSON = JSON.parse(response);

      $('#workshops').html(convertToHtml(actual_JSON, 'workshops'));
  },'workshop-data.json');
  }

  $('#workshopModal').on('show.bs.modal', function(event){
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

         img = "<img src='" + actual_JSON[key].Img + "' class='img-responsive'>";
         about = "<p>" + actual_JSON[key].Caption + "</p>"
         modal.find('#imgDiv').html(img);
         modal.find('#aboutDiv').html(about);
    }, 'workshop-data.json');

  });

  init();

})
