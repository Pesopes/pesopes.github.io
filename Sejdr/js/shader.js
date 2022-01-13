//
//  SHADER
//
//  TODO: make them general but typescript (js) overloading kinda sucks
//does not work (obviously)
function rectangle(uv, w, h) {
    console.log("IDK");
}
//smooth circle TODO: add how much SMOOTH hmmmm
function circle(uv, pos, radius) {
    //let st: [number,number] = [uv[0]-pos[0],uv[1]-pos[1]]
    return smoothstep(distance(uv, pos), radius - 0.008, radius);
}
//things for mandelbrot (i have no idea)
function squareImaginary(number) {
    return [
        Math.pow(number[0], 2) - Math.pow(number[1], 2),
        2 * number[0] * number[1]
    ];
}
function iterateMandelbrot(coord, maxIterations) {
    var z = [0, 0];
    for (var i = 0; i < maxIterations; i++) {
        z = [squareImaginary(z)[0] + coord[0], squareImaginary(z)[1] + coord[1]];
        if (lengthVec2(z) > 2)
            return i / maxIterations;
    }
    return 1;
}
//zooms ...
function zoom(uv, num) {
    return [uv[0] * num, uv[1] * num];
}
//translates by pos
function move(uv, pos) {
    return [uv[0] + pos[0], uv[1] + pos[1]];
}
// THE shader
function shaderMain(x, y, w, h, time) {
    //you can write code here! All vectors work like arrays (well they are arrays), there are some built in functions but you can make your own
    //w - width of screen, h - width of screen, time (currently not working properly)
    var fragColor = [1, 1, 1, 1];
    var uv = [x / w, y / h];
    uv = [uv[0] - 0.5, uv[1] - 0.5];
    uv = zoom(uv, zoomScale);
    uv = [uv[0] + 0.5, uv[1] + 0.5];
    uv = move(uv, [xScale, yScale]);
    fragColor[0] = (1 - iterateMandelbrot(uv, 25));
    fragColor[1] = fragColor[0];
    fragColor[2] = circle(uv, [0.5, 0.5], 0.01);
    return fragColor;
}
//I dont even remember adding this here
function plot(st, pct) {
    return smoothstep(pct - 0.02, pct, st[1]) -
        smoothstep(pct, pct + 0.02, st[1]);
}
