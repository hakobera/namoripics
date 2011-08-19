$(function() {
  $('#thumbnailTemplate').template('thumbnailTemplate');

  $('#refresh').click(function() {
    window.location.reload();
  });

  var thumbnails = $('#thumbnails'),
      loadNext = $('#loadNext'),
      loadNextLink = $('#loadNextLink');

  loadNextLink.data('page', 1);

  loadNextLink.click(function() {
    var page = $(this).data('page');
    $.mobile.pageLoading();
    $.getJSON('/search/_namori_/' + page)
      .success(function(data) {
        $.tmpl('thumbnailTemplate', data.images).insertBefore(loadNext);
        thumbnails.listview('refresh');
        loadNextLink.data('page', page + 1);
      })
      .error(function() {
        alert('Data not found');
      })
      .complete(function() {
        $.mobile.pageLoading(true);
      });
  });

  loadNextLink.triggerHandler('click');
});