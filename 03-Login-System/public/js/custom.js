console.log('Static JS loaded')  


$(document).ready(function() {
    $(".alert").delay(3000).slideUp(200, function() {
        $(this).alert('close');
    });
});