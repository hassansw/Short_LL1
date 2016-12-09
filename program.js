/**
 * LL(1) parser. Building parsing table: First, Follow and Nullable sets.
 *
 * by Hassan Saleem <hassan_saleem@outlook.com>
 * Github -> github.com/hassansw
 * MIT Style License
 */

var EPSILON = "ε";

var firstSets = {};
var followSets = {};

function buildFirstSets(grammar) {
  firstSets = {};
  buildSet(firstOf);
}

function firstOf(symbol) {

  if (firstSets[symbol]) {
    return firstSets[symbol];
  }

  var first = firstSets[symbol] = {};

  if (isTerminal(symbol)) {
    first[symbol] = true;
    return firstSets[symbol];
  }

  var productionsForSymbol = getProductionsForSymbol(symbol);
  for (var k in productionsForSymbol) {
    var production = getRHS(productionsForSymbol[k]);

    for (var i = 0; i < production.length; i++) {
      var productionSymbol = production[i];

      if (productionSymbol === EPSILON) {
        first[EPSILON] = true;
        break;
      }


      var firstOfNonTerminal = firstOf(productionSymbol);

      if (!firstOfNonTerminal[EPSILON]) {
        merge(first, firstOfNonTerminal);
        break;
      }

      merge(first, firstOfNonTerminal, [EPSILON]);
    }
  }

  return first;
}


function getProductionsForSymbol(symbol) {
  var productionsForSymbol = {};
  for (var k in grammar) {
    if (grammar[k][0] === symbol) {
      productionsForSymbol[k] = grammar[k];
    }
  }
  return productionsForSymbol;
}


function getLHS(production) {
  return production.split('->')[0].replace(/\s+/g, '');
}


function getRHS(production) {
  return production.split('->')[1].replace(/\s+/g, '');
}

function buildFollowSets(grammar) {
  followSets = {};
  buildSet(followOf);
}

function followOf(symbol) {

  if (followSets[symbol]) {
    return followSets[symbol];
  }

  var follow = followSets[symbol] = {};

  if (symbol === START_SYMBOL) {
    follow['$'] = true;
  }


  var productionsWithSymbol = getProductionsWithSymbol(symbol);
  for (var k in productionsWithSymbol) {
    var production = productionsWithSymbol[k];
    var RHS = getRHS(production);

    var symbolIndex = RHS.indexOf(symbol);
    var followIndex = symbolIndex + 1;


    while (true) {

      if (followIndex === RHS.length) { // "$"
        var LHS = getLHS(production);
        if (LHS !== symbol) { // To avoid cases like: B -> aB
          merge(follow, followOf(LHS));
        }
        break;
      }

      var followSymbol = RHS[followIndex];


      var firstOfFollow = firstOf(followSymbol);

      if (!firstOfFollow[EPSILON]) {
        merge(follow, firstOfFollow);
        break;
      }

      merge(follow, firstOfFollow, [EPSILON]);
      followIndex++;
    }
  }

  return follow;
}

function buildSet(builder) {
  for (var k in grammar) {
    builder(grammar[k][0]);
  }
}

function getProductionsWithSymbol(symbol) {
  var productionsWithSymbol = {};
  for (var k in grammar) {
    var production = grammar[k];
    var RHS = getRHS(production);
    if (RHS.indexOf(symbol) !== -1) {
      productionsWithSymbol[k] = production;
    }
  }
  return productionsWithSymbol;
}

function isTerminal(symbol) {
  return !/[A-Z]/.test(symbol);
}

function merge(to, from, exclude) {
  exclude || (exclude = []);
  for (var k in from) {
    if (exclude.indexOf(k) === -1) {
      to[k] = from[k];
    }
  }
}

function printGrammar(grammar) {
  console.log('Grammar:\n');
  for (var k in grammar) {
    console.log('  ', grammar[k]);
  }
  console.log('');
}

function printSet(name, set) {
  console.log(name + ': \n');
  for (var k in set) {
    console.log('  ', k, ':', Object.keys(set[k]));
  }
  console.log('');
}

//Sample Test
var grammar = {
  1: 'S -> F',
  2: 'S -> (S + F)',
  3: 'F -> a'
};

var START_SYMBOL = 'S';

printGrammar(grammar);

buildFirstSets(grammar);
printSet('First sets', firstSets);

buildFollowSets(grammar);
printSet('Follow sets', followSets);

// Results:

// Grammar:
//
//    S -> F
//    S -> (S + F)
//    F -> a
//
// First sets:
//
//    S : [ 'a', '(' ]
//    F : [ 'a' ]
//    a : [ 'a' ]
//    ( : [ '(' ]
//
// Follow sets:
//
//    S : [ '$', '+' ]
//    F : [ '$', '+', ')' ]


var grammar = {
  1: 'S -> A C B',
  2: 'S -> C b B',
  3: 'S -> B a',
  4: 'A -> d a',
  5: 'A -> B C',
  6: 'B -> g',
  7: 'B -> ε',
  8: 'C -> h',
  9: 'C -> ε',
};

function hasLowerCase(str) {
  if(str.toUpperCase() != str) { return true;}
  else {
    return false;
  }
}


var checkNullable = function (gram) {

  for (var k in gram) {
    if (String(gram[k]).indexOf('ε') !== -1) {

      var x =  gram[k].split('->')[1].replace(/\s+/g, '');
      console.log( x + " : is nullable");

    } else if ( hasLowerCase(gram[k]) == true){

      var x =  gram[k].split('->')[1].replace(/\s+/g, '');
      console.log(x + " : is not nullable");

    } else {

      var x =  gram[k].split('->')[1].replace(/\s+/g, '');
      console.log(x + " : is nullable");

    }

  }

}







var START_SYMBOL = 'S';

printGrammar(grammar);

buildFirstSets(grammar);
printSet('First sets', firstSets);

buildFollowSets(grammar);
printSet('Follow sets', followSets);

checkNullable(grammar);
var check = function (str) {
  if (String(str).indexOf('ε') !== -1){
    console.log("yes");
  }
}("B -> ε")
