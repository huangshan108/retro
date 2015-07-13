function pack(obj) {
  return JSON.stringify(obj);
};

function unpack(str) {
  return JSON.parse(str);
};

function appendToList(list_type, content) {
  $('ul.' + list_type + '-list').append('<li>' + content + '</li>');
};

function flash(message, type) {
  $('.flash').remove();
  var flash_html = '<div class="flash '+ type +'">'+ message +'</div>';
  $('body').prepend(flash_html);
  $('.flash').fadeOut(3000);
}