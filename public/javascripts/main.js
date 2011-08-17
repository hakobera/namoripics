$(function() {
  $('#thumbnailTemplate').template('thumbnailTemplate');

  $('#refresh').click(function() {
    window.location.reload();
  });

  $.getJSON('/images')
    .success(function(data) {
      $.tmpl('thumbnailTemplate', data.images).appendTo('#thumbnails');
    })
    .error(function() {
      alert('Data not found')
    });
});