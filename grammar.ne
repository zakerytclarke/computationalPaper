addition -> addition "+" addition {% function(d) {return [d[1],d[0],d[2]]} %}
          | addition "-" addition {% function(d) {return [d[1],d[0],d[2]]} %}
          | multiplication {% function(d) {return d[0]} %}
		  
multiplication -> multiplication "*" multiplication {% function(d) {return [d[1],d[0],d[2]]} %}
          | multiplication "/" multiplication {% function(d) {return [d[1],d[0],d[2]]} %}
          | number {% function(d) {return d[0]} %}


number -> int {% function(d) {return Number(d[0])} %}

float ->
      int "." int   {% function(d) {return d[0].join("")} %}
    | int           {% function(d) {return parseInt(d[0])} %}

int -> [0-9]:+        {% function(d) {return d[0].join("")} %}