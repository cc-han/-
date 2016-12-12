(function($){ 
//var n = 1; 
var o = {} 
$.fn.MoveBox=function(options){
	var x,y,iLeft,iTop;
	var opts = $.extend({}, $.fn.MoveBox.defaults, options); 
	return this.each(function(i){ 
		$(this).mousedown(function(e){ 
			x = $(this).position().left;//原始位置
			y = $(this).position().top;
			//e.pageY  鼠标点击时所处位置
			o.iTop = $(this).position().top - e.pageY; //负数
			o.iLeft = $(this).position().left - e.pageX; 
			//console.log(o.iLeft);
			//n++; 
			$this = $(this); 
			//$this.css({'z-index':n}); 
			$(document).bind("mousemove",function(e){ 
				iLeft = e.pageX + o.iLeft; //移动位置
				//console.log(iLeft);
				iTop = e.pageY + o.iTop;
				//console.log($this.parent().width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width")));
				//console.log($(document).width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width"))-$this.parent().offset().left-parseInt($this.parent().css("border-left-width")));
				if(opts.out){ 
					if(iLeft<-$this.parent().offset().left-parseInt($this.parent().css("border-left-width"))){ 
						iLeft = -$this.parent().offset().left-parseInt($this.parent().css("border-left-width")); 
					}else if(iLeft>$(document).width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width"))-$this.parent().offset().left-parseInt($this.parent().css("border-left-width"))){ 
						iLeft = $(document).width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width"))-$this.parent().offset().left-parseInt($this.parent().css("border-left-width")); 
					} 
					if(iTop<-$this.parent().offset().top-parseInt($this.parent().css("border-top-width"))+$(document).scrollTop()){ 
						iTop = -$this.parent().offset().top-parseInt($this.parent().css("border-top-width"))+$(document).scrollTop(); 
					}else if(iTop>$(window).height()+$(document).scrollTop()-$this.height()-parseInt($this.css("border-top-width"))-parseInt($this.css("border-bottom-width"))-$this.parent().offset().top-parseInt($this.parent().css("border-top-width"))){ 
						iTop = $(window).height()+$(document).scrollTop()-$this.height()-parseInt($this.css("border-top-width"))-parseInt($this.css("border-bottom-width"))-$this.parent().offset().top-parseInt($this.parent().css("border-top-width")); 
					} 
				}else{ 
					if(iLeft<0){ 
						iLeft = 0; 
					}else if(iLeft>$this.parent().width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width"))){ 
						iLeft = $this.parent().width()-$this.width()-parseInt($this.css("border-left-width"))-parseInt($this.css("border-right-width")); 
					} 
					if(iTop<0){ 
						iTop = 0; 
					}else if(iTop>$this.parent().height()-$this.height()-parseInt($this.css("border-top-width"))-parseInt($this.css("border-bottom-width"))){ 
					iTop = $this.parent().height()-$this.height()-parseInt($this.css("border-top-width"))-parseInt($this.css("border-bottom-width")); 
					} 
				} 
				//console.log(iLeft);
				$this.css({ 
				'left':iLeft +"px", 
				'top':iTop + "px" 
				}) 
				//console.log($this.css("top"))
				$(document).bind("mouseup",function(e){
					$(document).unbind("mousemove");
					$(document).unbind("mouseup")
					$this.css({ 
						'left':x +"px", 
						'top':y + "px" 
					}) 
				});
			});
			
		});
	}); 
}; 

$.fn.MoveBox.defaults = { 
out:false //默认不可跑出线外 
}; 
})(jQuery); 