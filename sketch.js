let song;
let bpSound;
let creamSound, drinkSound, bubbleSound;
let video;
let poster;
let button1, button2, button3;
let colorChangeButton1, colorChangeButton2, toggleWhippedCreamButton;
let bubbleTeaX, bubbleTeaY;
let bubbleColorIndex = 0;
let drinkColorIndex = 0;
let bubbleColors = [
  [56, 36, 34],
  [165, 4, 23],
  [24, 94, 10],
  [237, 237, 221],
  [39, 11, 117]
];
let drinkColors = [
  [226, 190, 143],
  [194, 163, 239],
  [109, 160, 104],
  [237, 155, 58],
  [244, 166, 224],
  [239, 233, 158]
];
let showWhippedCream = true;
let canvas, captureGraphics;
let customFont;

// משתנים חדשים למרכיבי הכוס
let cupWidth, cupHeight, cupX, cupY;
let strawWidth, strawHeight, strawX, strawY;
let drinkWidth, drinkHeight, drinkX, drinkY;
let creamWidth, creamHeight, creamX, creamY;

function preload() {
  song = loadSound('backmusic.mp3');
  bpSound = loadSound('BP.mp3');
  creamSound = loadSound('CREAM.mp3');
  drinkSound = loadSound('DRINK.mp3');
  bubbleSound = loadSound('BUBBLE.mp3');
  poster = loadImage('POSTER.jpg');
  customFont = loadFont('Chocolate.ttf');
}

function setup() {
  canvas = createCanvas(2000, 2400);
  
  song.play();
  
  video = createCapture(VIDEO);
  video.size(1055, 1755);
  video.hide();
  
  bubbleTeaX = 110 + 1055 / 2;
  bubbleTeaY = 606 + 1755 - 300;

  captureGraphics = createGraphics(1055, 1800);

  // הגדרת הערכים ההתחלתיים למרכיבי הכוס
  cupWidth = 300;
  cupHeight = 450;
  cupX = bubbleTeaX - cupWidth / 2;
  cupY = bubbleTeaY - cupHeight + 150;

  strawWidth = 45;
  strawHeight = 830;
  strawX = 644;
  strawY = 1281;

  drinkWidth = cupWidth - 30;
  drinkHeight = cupHeight - 30;
  drinkX = cupX + 15;
  drinkY = cupY + 15;

  creamWidth = cupWidth;
  creamHeight = 90;
  creamX = cupX;
  creamY = cupY;

  let buttonFontSize = '50px';
  button1 = createButton('POP!');
  button1.position(width / 2 -(-270), height / 2 + 600);
  button1.size(600, 100);
  button1.style('background-color', '#CE4596');
  button1.style('color', '#FFFFFF');
  button1.style('font-size', buttonFontSize);
  button1.style('font-family', 'Chocolate');
  button1.style('border-radius', '10px');
  button1.mousePressed(playBP);

  button2 = createButton('Play/mute music');
  button2.position(width / 2 -(-270), height / 2 + 750);
  button2.size(600, 100);
  button2.style('background-color', '#CE4596');
  button2.style('color', '#FFFFFF');
  button2.style('font-size', buttonFontSize);
  button2.style('font-family', 'Chocolate');
  button2.style('border-radius', '10px');
  button2.mousePressed(toggleMusic);

  button3 = createButton('Save Image');
  button3.position(width / 2 -(-270), height / 2 + 900);
  button3.size(600, 100);
  button3.style('background-color', '#CE4596');
  button3.style('color', '#FFFFFF');
  button3.style('font-size', buttonFontSize);
  button3.style('font-family', 'Chocolate');
  button3.style('border-radius', '10px');
  button3.mousePressed(saveImage);

  let smallButtonFontSize = '24px';
  let buttonWidth = 300;
  let buttonHeight = 60;
  let buttonY = 606 + 1755 - 100;
  let spacing = (1055 - (buttonWidth * 3)) / 4;

  colorChangeButton1 = createButton('Change Tapioca Pearls flavor');
  colorChangeButton1.position(110 + spacing, buttonY);
  colorChangeButton1.size(buttonWidth, buttonHeight);
  colorChangeButton1.style('background-color', '#CE4596');
  colorChangeButton1.style('color', '#FFFFFF');
  colorChangeButton1.style('font-size', smallButtonFontSize);
  colorChangeButton1.style('font-family', 'Chocolate');
  colorChangeButton1.style('border-radius', '10px');
  colorChangeButton1.mousePressed(changeBubbleColor);

  colorChangeButton2 = createButton('Change Drink flavor');
  colorChangeButton2.position(110 + spacing * 2 + buttonWidth, buttonY);
  colorChangeButton2.size(buttonWidth, buttonHeight);
  colorChangeButton2.style('background-color', '#CE4596');
  colorChangeButton2.style('color', '#FFFFFF');
  colorChangeButton2.style('font-size', smallButtonFontSize);
  colorChangeButton2.style('font-family', 'Chocolate');
  colorChangeButton2.style('border-radius', '10px');
  colorChangeButton2.mousePressed(changeDrinkColor);

  toggleWhippedCreamButton = createButton('Whipped Cream');
  toggleWhippedCreamButton.position(110 + spacing * 3 + buttonWidth * 2, buttonY);
  toggleWhippedCreamButton.size(buttonWidth, buttonHeight);
  toggleWhippedCreamButton.style('background-color', '#CE4596');
  toggleWhippedCreamButton.style('color', '#FFFFFF');
  toggleWhippedCreamButton.style('font-size', smallButtonFontSize);
  toggleWhippedCreamButton.style('font-family', 'Chocolate');
  toggleWhippedCreamButton.style('border-radius', '10px');
  toggleWhippedCreamButton.mousePressed(toggleWhippedCream);
}

function draw() {
  background(poster);
  
  // מצייר את הוידאו על captureGraphics
  captureGraphics.image(video, 0, 0, 1055, 1755);
  
  // מצייר את captureGraphics על הקנבס הראשי
  image(captureGraphics, 110, 606);
  
  // מצייר את הבועה תה ישירות על הקנבס הראשי
  drawBubbleTea(bubbleTeaX, bubbleTeaY);

  // ציור הכפתורים
  drawButtons();
}

function drawBubbleTea(x, y) {
  push();
  translate(x, y);

  // ציור הכוס
  noFill();
  stroke('#DD3088');
  strokeWeight(10);
  quad(491-x,1700-y,852-x,1700-y,801-x,2124-y,542-x,2124-y);

  // ציור הקצפת (מאחורי המשקה)
  if (showWhippedCream) {
    noStroke();
    fill(255);
    ellipse(594-x,1678-y,215,215);
    ellipse(666-x,1648-y,185,185);
    ellipse(734-x,1639-y,165,165);
    ellipse(776-x,1681-y,165,165);
  }

  // ציור המשקה (מעל הקצפת)
  noStroke();
  fill(drinkColors[drinkColorIndex]);
  quad(491-x,1700-y,852-x,1700-y,801-x,2124-y,542-x,2124-y);

  // ציור הקש (כעת מאחורי הקצפת והמשקה)
  fill(0, 0, 0);
  rect(strawX-x, strawY-y, strawWidth, strawHeight);

  // ציור כדורי הטפיוקה
  fill(bubbleColors[bubbleColorIndex]);
  ellipse(637-x,1928-y,45,45);
  ellipse(580-x,1973-y,45,45);
  ellipse(575-x,2054-y,45,45);
  ellipse(626-x,2015-y,45,45);
  ellipse(682-x,1973-y,45,45);
  ellipse(756-x,1965-y,45,45);
  ellipse(705-x,2030-y,45,45);
  ellipse(768-x,2025-y,45,45);
  ellipse(654-x,2072-y,45,45);
  ellipse(737-x,2075-y,45,45);

  pop();
}

function drawButtons() {
  // הפונקציה הזאת מציירת את כל הכפתורים ומוודאת שהם נמצאים במיקום הנכון
  button1.position(width / 2 - (-270), height / 2 + 600);
  button2.position(width / 2 - (-270), height / 2 + 750);
  button3.position(width / 2 - (-270), height / 2 + 900);

  let buttonY = 606 + 1755 - 100;
  let spacing = (1055 - (300 * 3)) / 4;

  colorChangeButton1.position(110 + spacing, buttonY);
  colorChangeButton2.position(110 + spacing * 2 + 300, buttonY);
  toggleWhippedCreamButton.position(110 + spacing * 3 + 300 * 2, buttonY);
}

function changeBubbleColor() {
  bubbleColorIndex = (bubbleColorIndex + 1) % bubbleColors.length;
  bubbleSound.play();
}

function changeDrinkColor() {
  drinkColorIndex = (drinkColorIndex + 1) % drinkColors.length;
  drinkSound.play();
}

function toggleWhippedCream() {
  showWhippedCream = !showWhippedCream;
  creamSound.play();
}

function playBP() {
  bpSound.play();
}

function toggleMusic() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.play();
  }
}

function saveImage() {
  let savedGraphics = createGraphics(1055, 1755);
  
  // ציור הוידאו על savedGraphics
  savedGraphics.image(video, 0, 0, 1055, 1755);
  
  // ציור הבועה תה על savedGraphics
  drawBubbleTeaOnGraphics(savedGraphics, 1055 / 2, 1755 - 400);
  
  // שמירת התמונה
  savedGraphics.save('myBubbleTea.jpg');
}

function drawBubbleTeaOnGraphics(graphics, x, y) {
  graphics.push();
  graphics.translate(x, y);

  // ציור הכוס
  graphics.noFill();
  graphics.stroke('#DD3088');
  graphics.strokeWeight(10);
  graphics.quad(491-600,1700-1800,852-600,1700-1800,801-600,2124-1800,542-600,2124-1800);

  // ציור הקצפת (מאחורי המשקה)
  if (showWhippedCream) {
    graphics.noStroke();
    graphics.fill(255);
    graphics.ellipse(594-600,1678-1800,215,215);
    graphics.ellipse(666-600,1648-1800,185,185);
    graphics.ellipse(734-600,1639-1800,165,165);
    graphics.ellipse(776-600,1681-1800,165,165);
  }

  // ציור המשקה (מעל הקצפת)
  graphics.noStroke();
  graphics.fill(drinkColors[drinkColorIndex]);
  graphics.quad(491-600,1700-1800,852-600,1700-1800,801-600,2124-1800,542-600,2124-1800);

  // ציור הקש (כעת מאחורי הקצפת והמשקה)
  graphics.fill(0, 0, 0);
  graphics.rect(strawX-600, strawY-1800, strawWidth, strawHeight);

  // ציור כדורי הטפיוקה
  graphics.fill(bubbleColors[bubbleColorIndex]);
  graphics.ellipse(637-600,1928-1800,45,45);
  graphics.ellipse(580-600,1973-1800,45,45);
  graphics.ellipse(575-600,2054-1800,45,45);
  graphics.ellipse(626-600,2015-1800,45,45);
  graphics.ellipse(682-600,1973-1800,45,45);
  graphics.ellipse(756-600,1965-1800,45,45);
  graphics.ellipse(705-600,2030-1800,45,45);
  graphics.ellipse(768-600,2025-1800,45,45);
  graphics.ellipse(654-600,2072-1800,45,45);
  graphics.ellipse(737-600,2075-1800,45,45);

  graphics.pop();
}
