document.addEventListener("DOMContentLoaded", function(event) { 
    function f(){
        var uri = window.location.pathname;
        if( !!document.querySelector(".moves move")){
            var request = new XMLHttpRequest();
            var game_id = window.location.pathname.match(/[\/]([A-Za-z0-9_]{7,9})/)[0];
            
            request.open('GET', "/game/export" + game_id + "?literate=1", true);
            request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                var found = this.response.match(/(?<=%eval )([-]?[\d]{1,3}[.][\d]{1,2}|[#][-]?[\d]{1,3})/g);
                var moves = document.querySelectorAll(".moves move");
                var len_moves = moves.length;
                for(var i=0; i<len_moves;i++){
                    if(found[i]){
                        moves[i].append(" ("+ found[i]+ ") ");
                    }
                }
            } else {
                // We reached our target server, but it returned an error
            
            }
            };
            
            request.onerror = function() {
            // There was a connection error of some sort
            };
            request.send();

        }
    }

    setTimeout(f, 4000);
    
});



