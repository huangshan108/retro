function pack(obj) {
  return JSON.stringify(obj);
};

function unpack(str) {
  return JSON.parse(str);
};

function appendToList(list_type, content) {
  $('ul.' + list_type + '-list').append('<li>' + content + '</li>');
};