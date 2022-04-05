var SpeechRecognition= window.webkitSpeechRecognition;
var recognize= new SpeechRecognition();
var selfie_take;
var content;
var image_id;

function start() {
    recognize.start();
};

recognize.onresult= function(event) {
    console.log(event);
    content= event.results[0][0].transcript;
    selfie_take= "false";
    if (content== "selfie") {
        selfie_take="true"
    };
    speak();
};

var camera= document.getElementById("camera");
Webcam.set({
    width:500,
    height:400,
    image_format: "jpeg",
    jpeg_quality: 90
});

function speak() {
    var synth= window.speechSynthesis;
    var speak_data;
    if (selfie_take== "true") {
        speak_data= "taking your selfie in 5 seconds";
        Webcam.attach(camera);
    };
    if (selfie_take== "false") {
        speak_data= content;
    };
    var utter_this= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    if (selfie_take== "true") {
        setTimeout(
            function() {
                image_id= "selfie1";
                take_snapshot();
                speak_data= "taking your next selfie in 10 seconds";
                var utter_this= new SpeechSynthesisUtterance(speak_data);
                synth.speak(utter_this);
            }, 5000
        );
        setTimeout(
            function() {
                image_id= "selfie2";
                take_snapshot();
                speak_data= "taking your next selfie in 15 seconds";
                var utter_this= new SpeechSynthesisUtterance(speak_data);
                synth.speak(utter_this);
            }, 10000
        );
        setTimeout(
            function() {
                image_id= "selfie3";
                take_snapshot();
            }, 15000
        );
    };
};

function take_snapshot() {
    console.log(image_id);
    Webcam.snap(
        function(data_uri) {
            if (image_id== "selfie1") {
                document.getElementById("image1").src= data_uri;
            };
            if (image_id== "selfie2") {
                document.getElementById("image2").src= data_uri;
            };
            if (image_id== "selfie3") {
                document.getElementById("image3").src= data_uri;
            };
        }
    );
};