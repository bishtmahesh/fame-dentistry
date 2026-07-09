const { JSDOM } = require("jsdom");
const dom = new JSDOM(`
  <div class="signal__num counter">9.4<span style="font-size:28px">/10</span></div>
  <div class="signal__num counter">200<span>+</span></div>
`);
const document = dom.window.document;

// setup
document.querySelectorAll('.counter').forEach(function(el) {
    var textNode = null;
    for (var i = 0; i < el.childNodes.length; i++) {
      if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.match(/[0-9]/)) {
        textNode = el.childNodes[i];
        break;
      }
    }
    if (!textNode) {
      if (el.textContent.match(/[0-9]/)) textNode = el;
      else return;
    }

    var text = textNode.nodeType === 3 ? textNode.nodeValue : textNode.textContent;
    var match = text.match(/([0-9]*\.?[0-9]+)/);
    if (match) {
      var target = parseFloat(match[1]);
      var isFloat = match[1].includes('.');
      var decimals = isFloat ? match[1].split('.')[1].length : 0;
      
      el.dataset.target = target;
      el.dataset.decimals = decimals;
      el.dataset.originalText = text;
      el.dataset.numberStr = match[1];
      el.counterNode = textNode;
      
      if (textNode.nodeType === 3) {
         textNode.nodeValue = text.replace(match[1], (0).toFixed(decimals));
      } else {
         el.textContent = text.replace(match[1], (0).toFixed(decimals));
      }
    }
});

console.log("After setup:");
console.log(document.body.innerHTML);

// simulate animation step
document.querySelectorAll('.counter').forEach(function(el) {
    var target = parseFloat(el.dataset.target);
    var decimals = parseInt(el.dataset.decimals, 10);
    var displayVal = target.toFixed(decimals);
    var textNode = el.counterNode;
    var originalText = el.dataset.originalText;
    var numberStr = el.dataset.numberStr;
    
    if (textNode.nodeType === 3) {
       textNode.nodeValue = originalText.replace(numberStr, displayVal);
    } else {
       textNode.textContent = originalText.replace(numberStr, displayVal);
    }
});

console.log("After animation end:");
console.log(document.body.innerHTML);
