/*
	jQuery.customizer

	Author Coşku DEMİRHAN
	Version 1.0
	Date: 19/01/2013
*/

(function($) {
	$.fn.customizer = function(options) {

		// Getting Type 
		var type = this.get(0).tagName.toLowerCase();
			
			//Type Control
			switch(type){
				case 'select':
				generateSelectBox(this , options);
				break;
				
				default:
				
			}
	}
			
	
	 function generateSelectBox (obj, options) {	
					
		//default settings
		var defaults = {
				containerClass: 		'cd_customizer_select_box',
				liClass:				'cd_customizer_select_item',
				selectedClass:			'cd_customizer_selected',
				animationSpeed: 		'fast',
				css:					{
				
					cd_customizer_select_box: {
						margin: 	'0px',
						padding: 	'0px',
						position:	'absolute',
						overflow:	'hidden',
						zIndex: 	'99999'
					},

					cd_customizer_selected: {

					},

					cd_customizer_select_item: {
						display: 			'block',
						position: 			'relative',
						WebkitBoxSizing:	'border-box',
						MozBoxSizing:		'box-border',
						boxSizing:			'border-box'
					}
				
				},
				listboxMaxSize: 		50
				}

			// declare varaibles
			var options;

			//extending options in settings
			options = jQuery.extend({}, defaults, options);
			
				//display none and generate div container
				obj.css('display','none').addClass('cd_cutomized');

								
				var htmlOutput = '<div style="position: relative;"><div class="'+options.containerClass+' closed">';
				

				
					//getting each options	
					obj.children('option').each(function(i)
					{	

						htmlOutput += '<span class="'+options.liClass+'" data-id="'+i+'" data-val="'+$(this).val()+'">'+$(this).text()+'</span>';
					   
					});				
				
				htmlOutput += '</div></div>';
				
				obj.after(htmlOutput);
				

				var lengthOfOptions = obj.find('option').length;
				var itemHeight = $.trim(findStyle('.'+options.liClass, 'height').replace('px', ''));
					
				
				
				$('.'+options.containerClass).css(options.css.cd_customizer_select_box).bind("click", function(event){
					
					if(!$(this).hasClass('opened'))
					$(this).stop(true,true).animate({ height : (lengthOfOptions * itemHeight) +'px' }).addClass('opened').removeClass('closed');
						else
						$(this).animate({ height : itemHeight +'px'}).removeClass('opened').addClass('closed');
	
						
				});
				
				$(document).bind('click', function(e){clickOut(e,options);});

				
								$('.'+options.liClass).css(options.css.cd_customizer_select_item).on("click", function(event){
					
					if(!$(this).hasClass(options.selectedClass)){
						var data = {
							id : $(this).data('id'),
							value : $(this).data('val'),
							text : $(this).text()
						}

						$(this).remove();
						$('.'+options.liClass).removeClass(options.selectedClass);
						$('.'+options.containerClass).prepend('<span class="'+options.liClass+' '+options.selectedClass+'" data-id="'+data.id+'" data-val="'+data.value+'">'+data.text+'</span>');
						obj.find('option:selected').removeAttr('selected');
						$('.'+options.liClass).css(options.css.cd_customizer_select_item);
						console.log(obj.find('option[value="'+data.value+'"]').attr("selected","selected"));
					}
					
				});

				
				$('.'+options.containerClass).children(":first").addClass(options.selectedClass);
				


	
		}
		
		function findStyle(selectortext, attr) {
			var styles = document.styleSheets;
			for(var i=0, len=styles.length; i < len; i++) {
				var sheet = styles[i], rules = sheet.cssRules;
				
				if(rules !== null){
					
					var sheet = styles[i], rules = sheet.cssRules;
					for(var j=0, len2=rules.length; j<len2;j++) {
					
						var rule = rules[j];
						
						if(rule && rule.selectorText == selectortext){ 
							if(rule.style[attr] !== 'undefined')
							return rule.style[attr];
								else
								return false;
						 }
					}

				}
			    
			}
				
		}
		
		function clickOut(e,options) {
			var target = e.target;
			var currentListElements = $('.'+options.containerClass).parent().find('*').andSelf();
			if(jQuery.inArray(target, currentListElements)<0 && $('.'+options.containerClass).hasClass('opened')) {
				$('.'+options.containerClass).click();
			}
			return false;
		}
	

})(jQuery);