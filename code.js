 
var actualCode = '(' + function() {
  var annotation_toogle = false;

  function loadAnnotation(){
    var data = lichess.analysis.data;
    var treeParts =  data.treeParts;
    for(var i=1; i<data.treeParts.length;i++ ){
      if(treeParts[i]['eval']){
        if( !annotation_toogle ){
          if(treeParts[i]['eval']['cp'] != null){
            treeParts[i]['san'] += "(" + ((treeParts[i]['eval']['cp'] / 100.0).toFixed(1)).toString() + ")";
          }else if(treeParts[i]['eval']['mate'] != undefined) {
            treeParts[i]['san'] += "(m " + treeParts[i]['eval']['mate'] + ")";
          }
        }else{
          treeParts[i]['san'] = treeParts[i]['san'].replaceAll(/(\([m]?[ ]?[-]?[0-9]{1,3}\))/ig, "");
          treeParts[i]['san'] = treeParts[i]['san'].replaceAll(/(\(.{1,8}\))/ig, "");
        }
      }
    }
    annotation_toogle = !annotation_toogle;
  }

  document.addEventListener("keydown", function(e){
    if (e.shiftKey && e.code == 'KeyA') {
      if(typeof lichess !== "undefined" && typeof lichess.analysis !== "undefined" && typeof lichess.analysis.data !== "undefined" ){
        loadAnnotation();
      }
    }
  });

  function loadDuplicateMovesPatch(){
    var last_move_selector = document.querySelector('.lastMove');
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
  setTimeout(loadDuplicateMovesPatch, 5000);

} + ')()';


var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
