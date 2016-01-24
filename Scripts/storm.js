/*
 * Runs drop animations, lightning animatiosn and thunder sounds
 */
function createStorm() {   
    var leftThunderJustPlayed = false;
    var numDropsTillLightning = 400;
    var dropAppearSpeed = 50;
    var dropCount = 0;
    var container = ".container";
    
    setInterval(function() {
        dropCount++;
        if (dropCount % numDropsTillLightning === 0) {
            dropCount = 0;
            createLightning(leftThunderJustPlayed);
            leftThunderJustPlayed = !leftThunderJustPlayed;
        }
        runDrop(createDrop(), dropCount, container);
    }, dropAppearSpeed);
};

/*
 * Runs a lightning animation and plays thunder sound
 * @param {boolean} leftThunderJustPlayed used to determine whether to run the left or right lightning and thunder 
 */
function createLightning (leftThunderJustPlayed) {
    var className = "";
    var lefttTunder = new Audio("Sound/leftThunder.mp3");
    var rightThunder = new Audio("Sound/rightThunder.mp3");
    if (!leftThunderJustPlayed) {
        className = ".lighting.left";
    } else {
        className = ".lighting.right";
    }
    $(className)
    .animate({
        opacity: 1
    }, 100)
    .animate({
        opacity: 0
    }, 100)
    .animate({
        opacity: 1
    }, 100)
    .animate({
        opacity: 0
    }, 100, function() {
        if (!leftThunderJustPlayed) {
            lefttTunder.play();
        } else {
            rightThunder.play();
        }
    });
}

/*
 * Variables for the drop span that will be animated
 */
function createDrop() {
    var dropHeight = 10 + 5 * Math.floor(Math.random() * 3);
    return {
        fallSpeed : 7000,
        rotateAngle : -10,
        height : dropHeight,
        width : 2
    };
}

/*
 * Animates a drop object falling from the top of the screen to the bottom
 * @param {object} drop holds variables that are used to create the drop span that will be animated
 * @param {number} dropCount drop number since last lightning strike
 * @param {string} container element to add the drop spans to
 */
function runDrop(drop, dropCount, container) {
    var leftPos = Math.floor(100 * Math.random() + 4);
    var startLetter = String.fromCharCode(65 + dropCount % 26);
    var dropId = startLetter + Date.now();  
    var zIdx = Math.floor(Math.random()*3);
    var dropSpan = "<span class=\"drop drop" + dropCount + " " + dropId + "\"" +
            "style=\"left:" + leftPos + "%;" +
            "width:" + drop.width + "px;" +
            "height:" + drop.height + "px;" +
            "z-index: " + zIdx + ";\"></span>";
    $(container).append(dropSpan);
    $("." + dropId).animate({
        top: $(window).height() - $("." + dropId).outerHeight() + drop.height * 2
    }, drop.fallSpeed, function() {
        $("." + dropId).remove();
    });
}
