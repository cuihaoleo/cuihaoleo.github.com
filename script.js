var prev_width = 0, prev_height = 0;

$(".intro-icon").each(function (idx) {
    $(this).on("click", function() {
        $(".intro-icon.active").removeClass("active");
    });
});

function setup() {
    canvas = createCanvas(prev_width = windowWidth, prev_height = windowHeight);
    noLoop();
}

function windowResized() {
    if (windowWidth > prev_width || windowHeight > prev_height) {
        resizeCanvas(windowWidth, windowHeight);
    }
}

function draw() {
    background(0, 0, 0, 0);
    fill(255);
    strokeWeight(0);
    const box_size = 12;
    for (var x=0; x<width; x+=box_size) {
        var x_scale = x / width;
        var s1 = Math.cos(x_scale * 60);
        var s2 = Math.cos(x_scale * 6);
        var signal = 0.4 * Math.abs(s1 * s2);
        var n1 = noise(x_scale * 40, 0) * 0.1;
        var n2 = noise(x_scale * 40, 1) * 0.1;
        var a = (0.5 - (signal + n1)) * height;
        var b = (0.5 + (signal + n2)) * height;

        for (var y=0; y<height; y+=box_size) {
            if (y > a && y < b) {
                fill(0xFF, 0x41, 0x36, 16);
            } else {
                fill(0x00, 0x74, 0xD9, 16);
            }
            rect(x+2, y+2, box_size-1, box_size-1);
        }
    }
}
