function showDropZone() {
  dropZone.style.visibility = "visible";
}
function hideDropZone() {
  dropZone.style.visibility = "hidden";
}
function allowDrag(e) {
  if (true) {
    e.dataTransfer.dropEffect = "copy";
    e.preventDefault();
  }
}
function handleDrop(e) {
  e.preventDefault();
  hideDropZone();
  if (e.dataTransfer.items) {
    data = e.dataTransfer.items;
	for (var i = 0; i < data.length; i++) {
	  if (data[i].kind === "file" && data[i].type.match("^image/")) {
        file = data[i].getAsFile();
	    img = document.createElement("img");
		img.src = URL.createObjectURL(file);
		img.classList.add("resize-drag");
		img.ondblclick = function() {this.remove();};
		document.body.append(img);
      }
	}
  }
}
window.addEventListener("dragenter", function(e) {
  showDropZone();
});
dropZone.addEventListener("dragenter", allowDrag);
dropZone.addEventListener("dragover", allowDrag);
dropZone.addEventListener("dragleave", function(e) {
  hideDropZone();
});
dropZone.addEventListener("drop", handleDrop);
interact(".resize-drag")
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move (event) {
        var target = event.target;
        var x = (parseFloat(target.getAttribute("data-x")) || 0);
        var y = (parseFloat(target.getAttribute("data-y")) || 0);
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";
        x += event.deltaRect.left;
        y += event.deltaRect.top;
        target.style.transform = "translate(" + x + "px," + y + "px)";
        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: "parent"
      })
    ],
    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true
      })
    ]
  })
function dragMoveListener (event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
  target.style.transform = "translate(" + x + "px, " + y + "px)";
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
window.dragMoveListener = dragMoveListener;
function box() {
  if (on == "1") {
    for (i=0; i<document.getElementsByTagName("img").length; i+=1) {
      document.getElementsByTagName("img")[i].style.outline = "0";
    }
	on = "0";
  } else {
    for (i=0; i<document.getElementsByTagName("img").length; i+=1) {
      document.getElementsByTagName("img")[i].style.outline = "1px solid #e5e5e5";
    }
	on = "1";
  }
}
var on = "1";
