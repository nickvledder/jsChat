(function() {
  
  let username   
  const chat = new Chat();

  if( !(localStorage['username']) ) {
    window.location.replace('index.html');
  } else {
    username = localStorage['username'];
  }
  $('#username').html(username);

  chat.getState(function(data) {
    console.log(JSON.parse(data)['state']);
  });

  function update() {
    chat.getUpdate(function(data) {
      data = JSON.parse(data)["log"];
      $("#log").html("");
      for(i = data.length-1; i > -1; i--) {
        $('#log').append("<p>" +data[i]['author'] + "<br>" + data[i]['message'] + '<p>');
      }
    });
  };
  setInterval(update, 1000);

  $("#send").on('click', function(e) {
    chat.send(username, $("#chat").val());
  });
  
  $("#logout").on('click', function(e) {
    localStorage.clear(); 
    window.location.replace("index.html");
  });

})();



