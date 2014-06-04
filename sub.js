window.onresize = proc_resize;

var mWidth_share = 800;
var mHeight_share= 600;

var mItems = new Array();

function AppShow() {
  this.name = 'AppShow';
}

AppShow.prototype.proc_share = function() {
	var ctl = new Controller();
console.log('#proc_share');
	var pos= $('#h_position').attr('value');
console.log('pos=' + pos);
	var ipos= parseInt( pos );
	if(ipos >= 0 ){
	 	 var item  = mItems[ipos];
 console.log( 'id='+ item.id );
 console.log( 'tit='+ item.title );
 console.log( 'url='+ item.url_b );
		var s_url_enc = encodeURIComponent( item.link );
		var s_share ='https://twitter.com/share?url=' +s_url_enc;
   
	    chrome.app.window.create(
		     'share.html',
		     {id: "browserShareID",
		      bounds: {
		      'width':  mWidth_share,
		      'height': mHeight_share
		      }
		     }
		     , function(appWin) {
		       appWin.contentWindow.addEventListener('DOMContentLoaded',
		         function(e) {
	console.log( 'show.DOMContentLoaded' );
				   var webview = appWin.contentWindow.document.querySelector('webview');
		           webview.setAttribute('src', s_share );
		
		           appWin.show();
		         }
		       )
		      }
		);
	} //ipos_0over
};

AppShow.prototype.proc_leftMoveDraw = function() {
	var ctl = new Controller();
console.log('#proc_leftMoveDraw.len='+ mItems.length );
	var pos= $('#h_position').attr('value');
console.log('pos=' + pos);
	var ipos= parseInt( pos );
	if(ipos > 0 ){
		ipos= ipos-1;
	 	 var item  = mItems[ipos];
 console.log( 'id='+ item.id );
 console.log( 'tit='+ item.title );
 console.log( 'url='+ item.url_b );
		this.proc_redraw(item, ipos);
	}
};

AppShow.prototype.proc_redraw = function(item, ipos) {
	var ctl = new Controller();
	$('#id_img1').remove();
//	 var s_title = item.title + ' by '+ item.owner;
	 var s_title = item.title;
	 
	 var divcont = document.querySelector('#contweb');
	 var img_t= ctl._requestRemoteImageAddElem(item.url_b, divcont ,'id_img1');
	 
	 var h_tit = document.querySelector('#id_h1_title');
	 h_tit.innerHTML= s_title;
	 $('#id_a_link').remove();
	 
	 $('input#h_position').attr('value' , ipos.toString() );
	 
	 proc_resize();
};

AppShow.prototype.proc_rightMoveDraw = function() {
	var ctl = new Controller();
console.log('#proc_rightMoveDraw.len='+ mItems.length );
	var pos= $('#h_position').attr('value');
console.log('pos=' + pos);
	var imax=mItems.length;
	var ipos= parseInt( pos );
	if(ipos < imax-1 ){
		ipos= ipos + 1;
		var item  = mItems[ipos];
		
		this.proc_redraw(item, ipos);
	}
};

AppShow.prototype.proc_init = function() {
 console.log('#proc_init');
		 chrome.storage.local.get('ptlist',  function(value) {
	 	 if(value){
	 	 	 var imax=value.ptlist.length;
 console.log( 'len='+ value.ptlist.length );
	 	 	 mItems = value.ptlist;
	 	 }
	 });
}

onload = function() {
 var app= new AppShow();
 var ctl = new Controller();
 
  //document.querySelector('#id_btn_left').onclick = function() {
  //  app.proc_leftMoveDraw();
  //};
  document.querySelector('#id-div-btn-left').onclick = function() {
//	console.log('#id_btn_left');
    app.proc_leftMoveDraw();
  };
  
  document.querySelector('#id-div-btn-right').onclick = function() {
//	console.log('#id_btn_right');
	app.proc_rightMoveDraw();
  };
  //document.querySelector('#id_btn_right').onclick = function() {
//	app.proc_rightMoveDraw();
  //};
  
  document.querySelector('#id_a_close').onclick = function() {
 console.log('#id_a_close');
	window.close();
  };
  
  document.querySelector('#id_a_tw').onclick = function() {
 console.log('#id_a_tw');
	 app.proc_share();
  };
  
  app.proc_init();
  proc_resize();
};

window.addEventListener('DOMContentLoaded', function() {
console.log('web.DOMContentLoaded');
})
	
//
// function
//
function proc_resize() {
	var app= new AppShow();
// console.log('#proc_resize');
	var wH    = $(window).height();
	var wW    = $(window).width();
//	var himg = wH - mHeight_showTitle;
	var himg = wH - mHeight_slideTitle;
	var wDiv = wW/2;
// console.log('#wH='   + wH.toString() );
// console.log('#himg=' + himg.toString() );
	$(this).delay( mSec_ImgResize ).queue(function() {
		$('div#contweb').css({"height" : himg+"px" });
		$('div#id-div-btn-left' ).css({"height" : himg+"px" , "width": wDiv+ "px" });
		$('div#id-div-btn-right').css({"height" : himg+"px" , "width": wDiv+ "px" });
		var img1 =$('img#id_img1').css({"max-height" : himg+"px" });
		$(this).dequeue();
	});
}



