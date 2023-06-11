var totalScore = 0;
var maxScore = 10;
var flags=[false,false,false,false];
function resetGame() {
    $(".image").css({
        top: 0,
        left: 0,
        width: "230px",
        height: "230px"
    }).draggable("enable");
    $(".square").each(function () {
        var image = $(this).children("img");
        $("#imagesContainer").append(image);
        $(this).css({
            border: "2px dashed #4d4d4d"
        });
        var num = $(this).attr("id").replace("img", "");
        $(this).text(num);
    });
    $(".progress-bar").css("width", "0%");
    totalScore = 0;
}

function updateScore() {
    if (totalScore<0) totalScore = 0;
    var score = (totalScore / maxScore)* 10;
    $("#score").text(score.toFixed(2));
    $('#scoreModal').modal('show');
}

function imageDraggable(){
$(".image").draggable({
    containment: ".container",
    revert: "invalid",
    start: function (event, ui) {
        $(this).css("z-index", 1);
    }
});
}
function squareDroppable(){
$(".square").droppable({
    accept: ".image",
    drop: function (event, ui) {
        var droppedImage = ui.draggable;
        var droppedElementId = droppedImage.attr("id");
        var dropzoneId = $(this).attr("id");

        if (droppedElementId === dropzoneId) {
            $(this).empty();
            droppedImage.css({
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }).draggable("option", "disabled", true);
            $(this).css({
                border: "2px solid #4d4d4d"
            });
            $(this).append(droppedImage);
            document.getElementById("audioSuccess").play();
            var progress = 0;
            totalScore += 2.5;
           
            $("#divContainer .square").each(function (index) {
                var square = $(this);
                var img = square.find("img");
                if (img.length > 0 && img.attr("id") == $(this).attr("id")) {
                    progress += 25;
                    $(".progress-bar").css("width", progress + "%");
                    flags[index] = true;
                } else{
                    flags[index] = false;
                }
                   
            });
            if (!flags.includes(false))
                updateScore();
        } else {
            document.getElementById("audioFail").play();       
            totalScore -= 2.5;
        }
    }
});
}