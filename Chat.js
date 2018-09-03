/**
 * @author  Kyle Davies
 * @version 1.0
 * @since   23-07-2018
 */
class Chat {

  /**
   * 
   * @param instance 
   * @param url 
   * @param file 
   */
  constructor(instance="default", url='process.php', file='log.json') {
      this.url = url;
      this.file = file;
      this.state = null;
      this.instance = instance;
  }

  /**
   * @param func
   */
  getState(func=function(){}) {  
    $.ajax({
      type: 'POST',
      url: this.url,
      data: {
        'function': 'STATE',
        'file': this.file
      }
    })
      .done(function(data) {
        data = JSON.parse(data); // This part could be better...
        this.state = data['state'];
      })
      .always(function(data) {
          func(data);
      });
  }  
  
  /**
   * @param func
   */
  getUpdate(func=function(){}) {
    $.ajax({
      type: 'POST',
      url: this.url,
      data: {
        'function': 'UPDAT',
        'file': this.file,
        'state': this.state
      }
    })
      .always(function(data) {
          func(data);
      });
  }

  /**
   * 
   * @param username 
   * @param message 
   * @param func
   */
  send(username, message, datetime,func=function(){}) {
    $.ajax({
      type: 'POST',
      url: this.url,
      data: {
        'function': 'SEND',
        'file': this.file,
        'user': username,
        'msg': message,
        'datetime' : datetime,
      }
    })
      .done(function() {
        console.log("Message has been sent.");
      })
      .always(function(data){
        func(data);
      })
  }

} 
