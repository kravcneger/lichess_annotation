 var actualCode = '(' + function() {
  var annotation_toogle = false;

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  setTimeout(function(){
    var el = document.createElement("p");
    el.innerHTML = "";
    el.setAttribute("aria-live", "assertive");
    el.setAttribute("aria-atomic", "1");
    el.classList.add("evalposition");
    var div = document.querySelector('.position');
    insertAfter(div, el);
  }, 3800);

  function loadAnnotation(){
    var position_selector = document.querySelector('.position');
    var evalposition = document.querySelector('.evalposition');
    if(typeof position_selector == "undefined"){
      return;
    }

    var positionObserver = new MutationObserver(function(records) {
      if(annotation_toogle){
        if(typeof lichess.analysis.node['eval'] != "undefined"){
          if(typeof lichess.analysis.node['eval']['cp'] != "undefined"){
            evalposition.innerHTML = ((lichess.analysis.node['eval']['cp'] / 100.0).toFixed(1)).toString();
          }else if(typeof lichess.analysis.node['eval']['mate'] != "undefined") {
            evalposition.innerHTML = "m " + lichess.analysis.node['eval']['mate'];
          }else{
            evalposition.innerHTML = "";
          }
        }
      }else{
        evalposition.innerHTML = "";
      }
    });
    positionObserver.observe(position_selector, {
      childList: true,
      characterData: true,
      subtree: true,
      characterDataOldValue: true
    });
  }
  setTimeout(loadAnnotation, 4000);

  document.addEventListener("keydown", function(e){
    if (e.shiftKey && e.code == 'KeyA') {
      if(typeof lichess !== "undefined" && typeof lichess.analysis !== "undefined" && typeof lichess.analysis.data !== "undefined" ){
        annotation_toogle = !annotation_toogle;
      }
    }
  });

  function fixDuplicateMove(){
    var last_move_selector = document.querySelector('.lastMove');
    if(typeof last_move_selector == "undefined"){
      return;
    }

    var last_move = "";
    var mutateObserver = new MutationObserver(function(records) {
      if( last_move_selector.innerHTML.match(/[\.]/) ){
        return;
      }
      if(
        (last_move.trim().length > 1 && last_move_selector.innerHTML.trim().length > 1) &&
        last_move.match(last_move_selector.innerHTML) || last_move_selector.innerHTML.match(last_move)){
        last_move_selector.innerHTML = '.' + last_move_selector.innerHTML + ".";
      }
      last_move = last_move_selector.innerHTML;
    });

    mutateObserver.observe(last_move_selector, {
      childList: true,
      characterData: true,
      subtree: true,
      characterDataOldValue: true
    });

  }
  setTimeout(fixDuplicateMove, 4000);

} + ')()';


var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
