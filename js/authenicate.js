$(document).ready(function() {

    $("#signin").submit(function(e) {
        
        let username = $("#username").val();
        console.log(username);
        e.preventDefault();

        if ( validate(username) ) {
            localStorage.setItem("username", username);
            window.open("client.html");
            //window.close();
        } else {
            alert("Incorrect username");
        }

    });

});




function validate(value) {
    return ( lengthCheck(value) && patternCheck(value) ) ? true : false;
}
function lengthCheck(value, min=3, max=30) {
    return ( value.length >= min ) && ( value.length <= max ) ? true : false;
};
function patternCheck(value, regexp=/[A-Z]{3,}/i ) {
    return ( regexp.test(value) ) ? true : false;
};


