let input;
let slider;
let button;
let dropdown;
let isJumping = false;
let iframe1, iframe2;
let iframe1Visible = false;
let iframe2Visible = false;

function setup() {  // 這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為#e63946(買回來的畫紙)
  createCanvas(windowWidth, windowHeight);
  background('#dad7cd'); // 設定背景顏色為#dad7cd
  // 產生一個文字框，位置在(10, 10)
  input = createInput();
  input.position(10, 10);
  input.size(200);
  // 產生一個文字大小標籤，位置在(250, 10)
  let label = createP('<b style="font-size:20px;">文字大小</b>');
  label.position(250, -10);
  // 產生一個滑桿，位置在(380, 10)，範圍為12到30
  slider = createSlider(12, 30, 12);
  slider.position(350, 10);
  slider.size(180);
  // 產生一個按鈕，位置在(550, 10)
  button = createButton('跳動');
  button.position(550, 10);
  button.mousePressed(toggleJumping);
  // 產生一個下拉選單，位置在(800, 10)
  dropdown = createSelect();
  dropdown.position(600, 12);
  dropdown.size(250);
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(handleDropdownChange);

  // 產生兩個 iframe，位置在視窗中間
  iframe1 = createElement('iframe');
  iframe1.attribute('src', 'https://www.tku.edu.tw');
  iframe1.size(windowWidth / 2 - 20, windowHeight / 2 - 20);
  iframe1.position(windowWidth / 4, windowHeight / 4);
  iframe1.hide(); // 初始狀態隱藏

  iframe2 = createElement('iframe');
  iframe2.attribute('src', 'https://www.et.tku.edu.tw');
  iframe2.size(windowWidth / 2 - 20, windowHeight / 2 - 20);
  iframe2.position(windowWidth / 4, windowHeight / 4);
  iframe2.hide(); // 初始狀態隱藏
}

function draw() { // 這是一個繪圖函數，會一直執行
  background('#dad7cd'); // 設定背景顏色為#dad7cd
  let textContent = input.value(); // 獲取文字框中的內容
  let textSizeValue = slider.value(); // 獲取滑桿的值作為文字大小

  if (textContent) {
    textSize(textSizeValue); // 設定文字大小
    textAlign(LEFT, TOP); // 設定文字對齊方式為左上
    fill(0); // 設定文字顏色為黑色
    stroke(0); // 設定文字外框顏色為黑色
    strokeWeight(1); // 設定文字外框寬度為1

    let spacing = textWidth(textContent) + 15; // 計算每個文字串的寬度，增加15像素的間隔

    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        let yOffset = isJumping ? sin(frameCount * 0.1) * 10 : 0; // 計算跳動的偏移量
        text(textContent, x, y + yOffset);
      }
    }
  }
}

function toggleJumping() {
  isJumping = !isJumping; // 切換跳動狀態
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe1Visible = !iframe1Visible;
    iframe1Visible ? iframe1.show() : iframe1.hide();
    iframe2.hide();
    iframe2Visible = false;
  } else if (selected === '教育科技學系') {
    iframe2Visible = !iframe2Visible;
    iframe2Visible ? iframe2.show() : iframe2.hide();
    iframe1.hide();
    iframe1Visible = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe1.size(windowWidth / 2 - 20, windowHeight / 2 - 20);
  iframe1.position(windowWidth / 4, windowHeight / 4);
  iframe2.size(windowWidth / 2 - 20, windowHeight / 2 - 20);
  iframe2.position(windowWidth / 4, windowHeight / 4);
}