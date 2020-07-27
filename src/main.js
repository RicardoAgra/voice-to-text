import App from './App.svelte';

var app = new App({
	target: document.body
});

export default app;

document.querySelectorAll( 'button' ).forEach( button => {
	button.onclick = event => {
		let buttonCoords = getCoords( button );

		button.classList.remove( "show-ripple" );
		button.querySelector( ".ripple" ).style.top = event.clientY - buttonCoords.top+"px";
		button.querySelector( ".ripple" ).style.left = event.clientX - buttonCoords.left+"px";
		void button.offsetWidth;
		button.classList.add( "show-ripple" );
	}

	function getCoords( elem ) {
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		var top  = box.top +  scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return { top: Math.round(top), left: Math.round(left) };
	}

	return false;
});