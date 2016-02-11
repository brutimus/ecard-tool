//@codekit-prepend "../bower_components/jquery/dist/jquery.js"
//@codekit-prepend "./html2canvas.js"
//@codekit-prepend "../vendor/jquery.profanityfilter/jquery.profanityfilter.js"
//@codekit-prepend "../vendor/social-share-kit/js/social-share-kit.js"

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

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

jQuery(document).ready(function($) {

  var hed_choices = [
        'Happy Valentine&#8217;s Day<br><b>{0}!</b>',
        'Valentine of the year?<br><b>{0}!</b>',
        'GUESS WHO IS MY BAE?<br><b>{0}!</b>',
        'QUEEN OF THE BEACH?<br><b>{0}!</b>',
        'KING OF THE BEACH?<br><b>{0}!</b>',
        'HUGS ARE BETTER WITH<br><b>{0}!</b>',
        'LOVE GODDESS OF YEAR<br><b>{0}!</b>',
        'OC LOVE GOD OF YEAR<br><b>{0}!</b>',
        'WHO IS LOVED VERY MUCH?<br><b>{0}!</b>',
        'MOST LOVED PERSON IN OC?<br><b>{0}!</b>'
      ],
      img_choices = [
        ['static/{0}/1.jpg', 'Paul Bersebach, STAFF PHOTOGRAPHER'],
        ['static/{0}/2.jpg', 'MICHAEL GOULDING, STAFF PHOTOGRAPHER'],
        ['static/{0}/3.jpg', 'Mark Rightmire, STAFF PHOTOGRAPHER'],
        ['static/{0}/4.jpg', 'CINDY YAMANAKA, STAFF PHOTOGRAPHER'],
        ['static/{0}/5.jpg', 'MARK RIGHTMIRE, STAFF PHOTOGRAPHER'],
        ['static/{0}/6.jpg', 'BILL ALKOFER, STAFF PHOTOGRAPHER']
      ],
      dummy_name = "John Doe",
      share_title = "Build a front page as a custom Valentine's Day card!";

  // CREATE PAGE
  if ($('#create').length > 0){
    $.each(hed_choices, function(i, v){
      $('#hedOptions').append($('<div class="col-md-6">').append($('<h4>').html(v.format(dummy_name)).data('id', i)));
    });
    $.each(img_choices, function(i, v){
      $('#imgOptions').append($('<div class="col-md-4">').append($('<img>').attr('src', v[0].format('thumb')).data('id', i)));
    });
    $('#hedOptions h4').click(function(e){
      $('#hedInput').val($(this).data('id'));
      $('#hedOptions h4').removeClass('selected');
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
          fromName = $('#fromInput').val(),
          note = $('#noteInput').val(),
          img = $('#imgInput').val(),
          hed = $('#hedInput').val();

      // PROFANITY
      $(document).profanityFilter({
          externalSwears: './vendor/jquery.profanityfilter/swearWords.json',
          filter: false,
          profaneText: function(data) {
              alert('Please do not use swear words!');
              e.preventDefault();
          }
      });
      if ($.grep([name, fromName, note, img, hed], function(n, i){
        return n.length < 1;
      }).length > 0) {
        alert('Please fill in all the fields before continuing!');
        e.preventDefault();
      }
    });
  }

  // VIEW PAGE
  if ($('#view').length > 0){
    var name = getUrlParameter('na').replace(/\+/g, " "),
        note = getUrlParameter('no').replace(/\+/g, " "),
        fromName = getUrlParameter('f').replace(/\+/g, " "),
        share_title = hed = hed_choices[parseInt(getUrlParameter('h'))].format(name),
        img = parseInt(getUrlParameter('i'));

    $('#page-hed').html(hed);
    $('#lead-img').append($('<img>').attr('src', img_choices[img][0].format('full')));
    $('#lead-img-credit').text(img_choices[img][1]);
    $('#lead-story').html(note + '&#8221;');
    $('#lead-name').text('- ' + fromName);

    $(document).profanityFilter({
        externalSwears: './vendor/jquery.profanityfilter/swearWords.json',
        filter: false,
        profaneText: function(data) {
          $('body').empty();
          alert("You've used a restricted word. Please go back and fix this mistake.");
        }
    });

    $('#downloadButton').click(function(e){
      html2canvas($('#eCard')[0]).then(function(canvas) {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image; // it will save locally
      });
    });
  }

  SocialShareKit.init({
    title: share_title.replace(/<br>/g, " ").replace(/<b>/g, "").replace(/<\/b>/g, "").toUpperCase()
  });

  var zc = new ZeroClipboard( document.getElementById("copyButton") );
  zc.on( "copy", function (event) {
    var clipboard = event.clipboardData;
    clipboard.setData( "text/plain", document.location.href );
  });

});
