
$(function () {

	function getDirection($module, event) {
		var module = $module.get(0);
		var w = $module.width();
		var h = $module.height();
		var x = (event.pageX - module.offsetLeft - w/2) * (w>h ? h/w : 1);
		var y = (event.pageY - module.offsetTop - h/2) * (h>w ? w/h : 1);
		var direction = Math.round((((Math.atan2(y, x) / Math.PI * 180) + 180) / 90) + 3) % 4; //Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4
		return direction;
	}
 
	$(".module").on("mouseenter mouseleave", function (e) {

		$(this).finish();

		var direction = getDirection($(this), e);
		var $inner = $(this).children(".inner");
		var height = $inner.height();
		var width = $inner.width();
		var speed = 200;

		function hideInner () {
			$inner.hide();
		}

		if (e.type == "mouseenter") {
			console.log("mouseenter " + direction);
			switch (direction) {
				case 0: //top
					$inner.css({
						"top" : -height + "px",
						"left" : "0px"
					}).show();
					$inner.animate({"top" : "0px"}, speed);
					break; 
				case 1: //right
					$inner.css({
						"top" : "0px",
						"left" : width + "px"
					}).show();
					$inner.animate({"left" : "0px"}, speed);
					break;
				case 2: //bottom
					$inner.css({
						"top" : height + "px",
						"left" : "0px"
					}).show();
					$inner.animate({"top" : "0px"}, speed);
					break;
				case 3: //left
					$inner.css({
						"top" : "0px",
						"left" : -width + "px"
					}).show();
					$inner.animate({"left" : "0px"}, speed);
					break;
			}
		} else {
			console.log("mouseleave " + direction);
			switch (direction) {
				case 0: //top
					$inner.animate({"top" : -height + "px"}, speed, hideInner);
					break;
				case 1: //right
					$inner.animate({"left" : width + "px"}, speed, hideInner);
					break;
				case 2: //bottom
					$inner.animate({"top" : height + "px"}, speed, hideInner);
					break;
				case 3: //left
					$inner.animate({"left" : -width + "px"}, speed, hideInner);
					break;
			}
		}

		return false;
	});
});
