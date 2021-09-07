// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
    function id(x) { return x[0]; }
    var grammar = {
        Lexer: undefined,
        ParserRules: [
        {"name": "addition", "symbols": ["addition", {"literal":"+","pos":6}, "addition"], "postprocess": function(d) {return [d[1],d[0],d[2]]}},
        {"name": "addition", "symbols": ["addition", {"literal":"-","pos":16}, "addition"], "postprocess": function(d) {return [d[1],d[0],d[2]]}},
        {"name": "addition", "symbols": ["multiplication"], "postprocess": function(d) {return d[0]}},
        {"name": "multiplication", "symbols": ["multiplication", {"literal":"*","pos":34}, "multiplication"], "postprocess": function(d) {return [d[1],d[0],d[2]]}},
        {"name": "multiplication", "symbols": ["multiplication", {"literal":"/","pos":44}, "multiplication"], "postprocess": function(d) {return [d[1],d[0],d[2]]}},
        {"name": "multiplication", "symbols": ["number"], "postprocess": function(d) {return d[0]}},
        {"name": "number", "symbols": ["int"], "postprocess": function(d) {return Number(d[0])}},
        {"name": "float", "symbols": ["int", {"literal":".","pos":70}, "int"], "postprocess": function(d) {return d[0].join("")}},
        {"name": "float", "symbols": ["int"], "postprocess": function(d) {return parseInt(d[0])}},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/]},
        {"name": "int$ebnf$1", "symbols": [/[0-9]/, "int$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
        {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": function(d) {return d[0].join("")}}
    ]
      , ParserStart: "addition"
    }
    if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
       module.exports = grammar;
    } else {
       window.grammar = grammar;
    }
    })();