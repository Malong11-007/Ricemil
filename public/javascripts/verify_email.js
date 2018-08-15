$(document).ready(function(){
  $("#email").keyup(function(){
    var email = $("#email").val();

  // $.post("https://ricemil.herokuapp.com/validate",{ username: name},function(response,status){
  $.post("http://localhost:5000/validate",{email: email},function(response,status){
      if(!response && status == "success"){
        $('#error_name').html(alert('Entered email already registered!'));
      } else {
        $('#error_name').html("");
      }
    });
  });


  console.log('Connected');
});
//'<div class="alert alert-danger"><span class="glyphicons glyphicons-warning-sign"></span>' + email+ ' : not available</div>'