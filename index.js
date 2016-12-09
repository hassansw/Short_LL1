{
  var socialMedia = {
    facebook : 'http://facebook.com',
    twitter  : 'http://twitter.com',
    google   : 'http://google.com'
  }

  var social = function () {
    var output = '<ul>',
    myList = document.querySelectorAll('.socialMain')
    for (var key in arguments[0]){
      output +='<li><a href="'+socialMedia[key]+'" ><img src="images/'+key+'.png" /></a></li>'
    }
    output +='</ul>'

    for (var i = 0; i < myList.length; i++) {
      myList[i].innerHTML = output
    }
  }(socialMedia)

  var checkNullable = function () {

    if ( hasLowerCase("HeLLO") == true){
      console.log("Yes");
    }

  }

}

/*(function (){
  console.log('foo')
})()// Anonymouse Closure/ Self Executing Function */

//Note: javascript functions and variables are hoisted, meaning they are declaration or initialized at the top

// var dogName = 'Rover'
// function myDog(){
//   console.log(dogName);
//   var dogName = 'Fido'//this makes it a global variable
// }
// myDog()

var han = (function(){
  var DEFAULT = { say:'Hello', speed : 'normal'}

  return {
    speek : function (){
      var args = arguments[0] || ''
      var statement = args.say || DEFAULT.say
      console.log(statement)
      return this
    },
    run : function(){
      var args = arguments[0] || ''
      var running = args.speed || DEFAULT.speed
      console.log(running)
      return this
    }

  }
})()

han.speek({say : 'hell'}).run().speek().run({speed : 'Faster....'})
