var vertCount = 75;
var tanPos = -vertCount / 2;
var equation = '-x^2';

let eqBox;
let eqButton;

let allowScroll;
let scroll;

function setup() {
  createCanvas(400, 400);
  
  eqBox = createInput();
  eqButton = createButton("Submit");
  
  eqButton.mousePressed(() => {
    equation = eqBox.value();
  })
  
  allowScroll = createCheckbox();
  scroll = createSlider(-vertCount / 2, vertCount / 2, 0);
}

function draw() {
  background(220);
  parabola();
  tickClock();
  stroke(255, 0, 0);
  strokeWeight(5)
  tangent();
  stroke(0);
  strokeWeight(1);
}

function parabola() {
  for (var i = -vertCount / 2; i < vertCount / 2; i += vertCount / width) {
    line(width / 2 + i * (width / vertCount), height / 2 - evaluate(equation, i), width / 2 + (i + 1) * (width / vertCount), height / 2 - evaluate(equation, i + 1));
  }
}

function tangent() {
  var m;
  var p;
  
  switch (allowScroll.checked()) {
    case true:
      m = ((evaluate(equation, scroll.value() + 0.001)) - (evaluate(equation, scroll.value()))) / 0.001;
      p = [width / 2 + scroll.value() * (width / vertCount), height / 2 - evaluate(equation, scroll.value())];
      break;
    case false:
      m = ((evaluate(equation, tanPos + 0.001)) - (evaluate(equation, tanPos))) / 0.001;
      p = [width / 2 + tanPos * (width / vertCount), height / 2 - evaluate(equation, tanPos)];
      break;
  }
  
  // Thanks Mr. Rutherford
  line(p[0] - 25, m / (width / vertCount) * (p[0] - (p[0] - 25)) + p[1], p[0] + 25, m / (width / vertCount) * (p[0] - (p[0] + 25)) + p[1]);
  //circle(p[0], p[1], 10);
}

function tickClock() {
  tanPos += vertCount / 3 * deltaTime / 1000;
  if (tanPos > vertCount / 2) {
    tanPos = -vertCount / 2;
  }
}

function evaluate(eq, i) {
  let scope = {
    x: i
  };
  
  return math.evaluate(eq, scope);
}