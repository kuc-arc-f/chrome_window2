//top.js

onload = function() {
	document.querySelector('a#id-a-open').onclick = function() {
		click_sub();
	}
}

//
//function
//
function click_sub()
{
      chrome.app.window.create(
     'sub.html',
     {id: "browserSlideID",
      bounds: {
      'width' : 1024,
      'height': 600
      }
     }
     , function(appWin) {
       appWin.contentWindow.addEventListener('DOMContentLoaded',
         function(e) {
console.log( '#.DOMContentLoaded' );
				var text1 = appWin.contentWindow.document.querySelector('#id-text1');
				text1.setAttribute('value',  "moji-1234 from topWindow");
           appWin.show();
         }
       )
      }
     );
}
