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
    var position_sel = document.querySelector('.position');
    if(position_sel == null){
      return;
    }
    insertAfter(position_sel, el);
  }, 3800);

  function loadAnnotation(){
    var position_selector = document.querySelector('.position');
    var evalposition = document.querySelector('.evalposition');
    if(typeof position_selector == "undefined"){
      return;
    }

    var positionObserver = new MutationObserver(function(records) {
      var is_toogle = getCookie("annotation_toogle");
      if(is_toogle != null){
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
        if( getCookie("annotation_toogle") != null){
          eraseCookie("annotation_toogle");
        }else{
          setCookie("annotation_toogle", "1", 365)
        }
      }
    }
  });

  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }

  function eraseCookie(name) {   
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

} + ')()';


var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();
