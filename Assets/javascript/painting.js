/* chatGPT help me to create a painting board*/
var canvas_content = document.getElementById("canvas-content");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var brushSize = 3;
var brushStyle = "round";
var brushColor = "black";

let isPaintingEnabled = false;
var isDrawing = false;
var lastX = 0;
var lastY = 0;

var states = [];
var currentState = 0;
const PaintingOnButton = document.getElementById("paintonButton");
const PaintLayerButton = document.getElementById("PaintLayerButton");
let isPaintingBehind = true;

window.onload = function(e){
    var parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    canvas_content.style.display = "none";

    states.splice(currentState + 1);
    states.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    currentState = states.length - 1;
   }


   var modes = document.querySelectorAll("nav .mode");
   modes.forEach(function(mode) {
    mode.addEventListener("click", function() {
       modes.forEach(function(el) {
         el.classList.remove("active");
       });
       this.classList.add("active");
       if(PaintingOnButton.classList.contains('active')){
        isPaintingEnabled = true;
        canvas_content.classList.add('active');
       }
       else{
        isPaintingEnabled = false;
        canvas_content.classList.remove('active');
       }
     });
   });

PaintLayerButton.addEventListener("click", function() {
    isPaintingBehind = !isPaintingBehind;
    this.innerHTML = isPaintingBehind ? '<i class="fa fa-sort-amount-desc" aria-hidden="true"></i>' : '<i class="fa fa-sort-amount-desc" style="transform:rotateX(180deg)" aria-hidden="true"></i>';
    this.getAttribute = isPaintingBehind ? this.setAttribute('title', "畫在後") : this.setAttribute('title', "畫在前");
    ctx.globalCompositeOperation = isPaintingBehind ? "destination-over" : "source-over";
  });



  var brushSizeElements = document.querySelectorAll("brush-size");
  brushSizeElements.forEach(function(brushSizeElement) {
    brushSizeElement.addEventListener("click", function() {
      brushSize = this.getAttribute("value");
      brushSizeElements.forEach(function(el) {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

var brushStyleElements = document.querySelectorAll("brush-style");
  brushStyleElements.forEach(function(brushStyleElement) {
    brushStyleElement.addEventListener("click", function() {
      brushStyle = this.getAttribute("value");
      brushStyleElements.forEach(function(el) {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  var brushStyleSelect = document.getElementById("brushStyle");
  brushStyleSelect.addEventListener("change", function(e) {
    brushStyle = e.target.value;
  });

var brushColorInputs = document.querySelectorAll("#brushColor li");
  brushColorInputs.forEach(function(brushColorInput) {
    if (brushColorInput.getAttribute("value")) {
        var color_value = brushColorInput.getAttribute("value");
        brushColorInput.style.backgroundColor = color_value;
    }
    brushColorInput.addEventListener("click", function() {
      brushColor = this.getAttribute("value");
      brushColorInputs.forEach(function(el) {
        el.classList.remove("selected");
      });
      this.classList.add("selected");
    });
  });

  canvas.addEventListener("mousedown", function(e) {
    if (isPaintingEnabled) {
        // start drawing a stroke
        isDrawing = true;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    
  });
  
  canvas.addEventListener("mouseup", function() {
    isDrawing = false;
    states.splice(currentState + 1);
    states.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    currentState = states.length - 1;
  });
  
  canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = brushStyle;
    ctx.strokeStyle = brushColor;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    lastX = e.clientX;
    lastY = e.clientY;
  });
  
  var prevButton = document.getElementById("prevButton");
  prevButton.addEventListener("click", function() {
    if (currentState > 0) {
      currentState--;
      ctx.putImageData(states[currentState], 0, 0);
    }
  });
  
  var nextButton = document.getElementById("nextButton");
  nextButton.addEventListener("click", function() {
    if (currentState < states.length - 1) {
      currentState++;
      ctx.putImageData(states[currentState], 0, 0);
    }
  });

  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", function() {
    states.splice(currentState + 1);
    states.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    currentState = states.length - 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });