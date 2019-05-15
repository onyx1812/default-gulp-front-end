(function(){

	//	Modal module
	//	To HTML add class openModal, attribute data-modal and template with modal ID
	//	Example:
	//	<a href="#" class="openModal" data-modal="modal_id">open modal</a>
	//	<template id="modal_id"> {Some content} </template>

	$(document).on('click', '.openModal', function(e){
		e.preventDefault();

		var
			modalName = $(this).data('modal'),
			modalContent = $('#'+modalName).html(),
			winWidth = $(window).width();

		if (winWidth>1024) {
			$('html').css({
				'overflow-y': 'hidden',
				'margin-right': '17px',
			});
		} else {
			$('html').css('overflow-y', 'hidden');
		}

		$('#modal').remove();
		$('body').append('<style>#modal{position:fixed; left:0; right:0; bottom:0; top:0; background:rgba(0,0,0, .85); z-index:9999; padding-top:50px; padding-left:15px; padding-right:15px; overflow-y:auto; padding-bottom:15px; display:block;} @media(min-width:1024px){#modal{display:flex !important; align-items:center; justify-content:center;}} #modal .modal-inner{position:relative; background:#fff; padding:30px 15px; margin:0 auto; opacity:0; transition:.3s ease-in-out; transform:translate(0, 1000px); max-width:1170px;} #closeModal{line-height:50px; position:absolute; top:0; right:0; width:50px; height:50px; color:#000; font-size:50px; font-weight:bold; transform:rotate(45deg); background:none; border:none;}</style>');
		$('body').append('<section class="modal" id="modal"><div class="modal-inner"><button id="closeModal">+</button><div class="container">'+modalContent+'</div></div></section>');

		setTimeout(function(){
			$('#modal').fadeIn('fast').addClass('modal-active');
			$('#modal .modal-inner').css({
				'transform': 'translate(0, 0)',
				'opacity': 1,
			});
		}, 100);
	});

	$(document).on('click', '#closeModal', function(e){
		e.preventDefault();

		var winWidth = $(window).width();

		$('#modal .modal-inner').css({
			'transform': 'translate(0, 1000px)',
			'opacity': 0,
		});
		$('#modal').fadeOut('slow', function(){
			$(this).remove();
			if (winWidth>1024) {
				$('html').css({
					'overflow-y': 'auto',
					'margin-right': '0px',
				});
			} else {
				$('html').css('overflow-y', 'auto');
			}
		});
	});

})();