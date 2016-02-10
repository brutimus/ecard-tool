//@codekit-prepend "../bower_components/jquery/dist/jquery.js"
//@codekit-prepend "./html2canvas.js"

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

jQuery(document).ready(function($) {
  var hed_choices = [
    'Happy Valentines Day, {0}'
  ],
      img_choices = [];

  // CREATE PAGE
  if ($('#create').length > 0){
    $('#hedOptions h3').click(function(e){
      $('#hedInput').val($(this).data('id'));
      $('#hedOptions h3').removeClass('selected');
      $(this).addClass('selected');
    });

    $('#imgOptions img').click(function(e){
      $('#imgInput').val($(this).data('id'));
      $('#imgOptions img').removeClass('selected');
      $(this).addClass('selected');
    });

    $('#configurator').on('submit', function(e){

      // VALIDATE
      var name = $('#nameInput').val(),
          note = $('#noteInput').val(),
          img = $('#imgInput').val(),
          hed = $('#hedInput').val();

      console.log($.grep([name, note, img, hed], function(n, i){
        return n.length > 0;
      }));
      if ($.grep([name, note, img, hed], function(n, i){
        return n.length < 1;
      }).length > 0) {
        alert('Please fill in all the fields before continuing!');
      }
      e.preventDefault();



    });
  }

  // VIEW PAGE
  if ($('#view').length > 0){
    console.log('create')
  }

});
