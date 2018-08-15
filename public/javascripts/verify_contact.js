$(document).ready(function(){
  $("#contact").keyup(function(){
    var contact = $("#contact").val();

  // $.post("https://ricemil.herokuapp.com/validate",{ username: name},function(response,status){
  $.post("http://localhost:5000/validate1",{contact: contact},function(response,status){
      if(!response && status == "success"){
        $('#error_name').html(alert('Entered Contact already Used!'));
      } else {
        $('#error_name').html("");
      }
    });
  });


  console.log('Connected');
});
//'<div class="alert alert-danger"><span class="glyphicons glyphicons-warning-sign"></span>' + email+ ' : not available</div>'