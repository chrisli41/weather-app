/**
 * Created by christopherli on 8/30/16.
 */
function success(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=36c21ac6dfcd53bc998caee897ef3fc0';

    $.getJSON(apiCall, function(json) {

        var name = json.name + ', ' + json.sys.country;
        var descrip = json.weather[0].description;
        var humidity = json.main.humidity + '%';
        var pressure = json.main.pressure + ' hpa';
        var icon = convertIcon(descrip);
        
        var f = toFarenheit(json.main.temp) + ' °F';
        var c = toCelsius(json.main.temp) + ' °C';

        $('.loader').remove();
        $('#date').text(date());
        $('#name').text(name);
        $('#four').append('<h1>Forecast<h1>').append('<i class="' + icon + '"></i>').append('<h1 class="header" id="descrip">' + descrip + '</h1>');
        $('#temp').text(f).click(function(){
           $(this).text() === f ? $(this).text(c) : $(this).text(f);
        });
        $("#humidity").text(humidity);
        $("#pressure").text(pressure);

        $('#outer').children().fadeIn('slow');

    });
}

function error(){
    $('#weather').text('Unable to retrieve your location');
}

function toCelsius(k){
    return Math.round(((k - 273.15) * 100) / 100);
}

function toFarenheit(k){
    return Math.round((((k * (9/5)) - 459.67) * 100) / 100);
}

function convertIcon(data){
    var mappings = {'scattered clouds': 'wi wi-cloudy',
                    'clear sky': 'wi wi-day-sunny',
                    'few clouds': 'wi wi-day-cloudy',
                    'broken clouds': 'wi wi-cloudy',
                    'shower rain': 'wi wi-showers',
                    'rain': 'wi wi-rain',
                    'light rain': 'wi wi-rain',
                    'thunderstorm': 'wi wi-thunderstorm',
                    'snow': 'wi wi-snow',
                    'mist': 'wi wi-sleet'};

    return mappings[data];
}

function date(){

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var today = new Date();
    var dd = today.getDate();
    var mm = monthNames[today.getMonth()];
    var yyyy = today.getFullYear();

    return mm + ' ' + dd + ', ' + yyyy;
}

$('#outer').children().hide();

$(document).ready(function(){

    if(!navigator.geolocation){
        $('#outer').text('Geolocation not found');
    }

    navigator.geolocation.getCurrentPosition(success, error);

});

