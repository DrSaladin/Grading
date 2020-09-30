(function () {
  'use strict';


  $(document).ready(function() {
   $("#lightSlider").lightSlider({
      item: 6,
      auto: false,
      slideMargin: 10,
      slideMove: 1,
      loop: true,
      controls: true,
      speed: 600,
      pager: false,
      keyPress: true,
      mode: 'slide',
      responsive: [{
      breakpoint: 400,
      settings: {
         item: 1,
         slideMove: 1,
         slideMargin: 6,
       }
     }]
   });
 });

 $(document).ready(function() {
   $("#lightSliderGoods").lightSlider({
      item: 5,
      auto: false,
      slideMargin: 10,
      slideMove: 1,
      loop: true,
      controls: false,
      speed: 600,
      pager: false,
      keyPress: true,
      mode: 'slide',
   });
 });

  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
      document
          .querySelector('html')
          .classList
          .add('is-ios');
  }
  var $root = $('html, body');
  var body = $('.body');

  var upBtn = $('#js-upBtn');
  if (upBtn.length) {
    upBtn.on('click', function () {
      $root.animate({
          scrollTop: 0
      }, 500);
      return false;
    });
  }
  
  $(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        body.addClass('body--scrolled');
    } else {
        body.removeClass('body--scrolled');
    }
  });

  var sliderList = $('#js-sliderList');
    
  if (sliderList.length) {
    var sliderNextCircle = $('#js-sliderCircle');

    var sliderTimeout = 0;
    var slideTime = 5000;
    sliderList.on('init', function (event, slick) {
      sliderNextCircle.addClass('circle--active');
      sliderTimeout = setTimeout(function() {
        sliderList.slick('slickNext');
      },slideTime);      
    });

    sliderList.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      sliderNextCircle.removeClass('circle--active');
      clearTimeout(sliderTimeout);
    });
    
    sliderList.on('afterChange', function(event, slick, currentSlide){
      sliderNextCircle.addClass('circle--active');
      sliderTimeout = setTimeout(function() {
        sliderList.slick('slickNext');
      },slideTime);    
    });

    sliderList.slick({
      dots: true,
      infinite: true,
      draggable: false,
      speed: 500,
      autoplay: false,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '#js-sliderPrev',
      nextArrow: '#js-sliderNext'
    });
  }


  var subcategoryScroll = $('#js-subcategory-swipe');
  if (subcategoryScroll.length) {
      subcategoryScroll.overlayScrollbars({
          overflowBehavior: {
              x: "scroll",
              y: "hidden"
          },
          className: "os-theme-dark",
          scrollbars : {
            dragScrolling: true,
            touchSupport: true,
          },
          callbacks: {
            onInitialized: function () {
              var tabsContainer = subcategoryScroll.find('.os-viewport');
              tabsContainer.on('mousewheel DOMMouseScroll', function (event) {
                event.preventDefault();
                var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail)));
                $(this).scrollLeft($(this).scrollLeft() - (delta * 30));
              });

              var x,left,down;

              tabsContainer.mousedown(function(e){
                e.preventDefault();
                down=true;
                x=e.pageX;
                left=$(this).scrollLeft();
              });

              tabsContainer.mousemove(function(e){
                if(down){
                  var newX=e.pageX;
                  tabsContainer.scrollLeft(left-newX+x);
                  if (Math.abs(newX-x) > 5) {
                    tabsContainer.on('click.prevent',function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      tabsContainer.off('click.prevent');
                    });
                  }
                }
              });
              tabsContainer.mouseup(function(e){down=false;});
              tabsContainer.mouseout(function(e){down=false;});
            }
          }
      });
  }


  var navBurger = $('#js-navBurger');
  var navShadow = $('#js-navShadow');
  var nav = $('#js-nav');
  var navItem = nav.find('.js-navItem');
  var navSubSection = nav.find('.js-navSubSection');

  $.each(navSubSection, function (i) {
      var navSubBack = $(this).find('.js-navSubBack');
      navSubBack.on('click', function() {
        $(this).closest('.js-subNav').removeClass('nav__sub--showed');
      });

    });

    $.each(navItem, function (i) {
        var item = $(this);
        var thisSection = item.find('.js-navSection');
        var thisSubnav = item.find('.js-subNav');
        var subNavBack = item.find('.js-subNavBack');

        function showSubmenu (){
            nav.addClass('nav--active');
            navItem.removeClass('nav__item--active');
            item.addClass('nav__item--active');
        }

        function closeSubmenu () {
            nav.removeClass('nav--active');
            navItem.removeClass('nav__item--active');
        }

        thisSection.on('click', function() {
            if (window.matchMedia("(min-width: 1170px)").matches) {
                if (thisSubnav.length) {
                    showSubmenu ();
                } else {
                    closeSubmenu ();
                }
            } else {
                if (thisSubnav.length) {
                    thisSubnav.addClass('nav__sub--showed');
                }
            }
        });

        if (subNavBack.length) {
            subNavBack.on('click', function() {
                thisSubnav.removeClass('nav__sub--showed');
            });
        }

        thisSection.on('mouseenter', function() {
            if (window.matchMedia("(min-width: 1170px)").matches) {
                if (thisSubnav.length) {
                    showSubmenu ();
                } else {
                    closeSubmenu ();
                }
            }
        });

        nav.on('mouseleave', function() {
            if (window.matchMedia("(min-width: 1170px)").matches) {
                closeSubmenu ();
            }
        });
    });

    navBurger.on('click', function() {
        $(this).toggleClass('page-header__burger--active');
        nav.toggleClass('nav--showed');
        navShadow.toggleClass('nav__shadow--showed');
        body.toggleClass('overflow-tablet');
    });

    navShadow.on('click', function () {
      navShadow.removeClass('nav__shadow--showed');
      nav.removeClass('nav--showed');
      navBurger.removeClass('page-header__burger--active');
      body.removeClass('overflow-tablet');
    });

    var search = $('#js-search');
    var searchSelect = $('#js-searchSelect');
    if (searchSelect.length) {
        searchSelect.selectize({
            plugins: ['typing_mode'],
            usePlaceholder: true,
            create: true,
            createOnBlur: true,
            addPrecedence: true,
            labelField: 'name',
            valueField: 'value',
            optgroupField: 'optgroup',
            searchField: ['name', 'value'],
            sortField: [
                { field: "optgroup", direction: "asc" }
            ],
            render: {
                option_create: function(data, escape) {
                    var addString = 'Ищем:';
                    return '<div class="create">' + addString + ' <strong>' + escape(data.input) + '</strong>&hellip;</div>';
                },
            },
            onDropdownOpen: function ($dropdown) {
                $dropdown.overlayScrollbars({
                    overflowBehavior: {
                        x: "hidden",
                        y: "scroll"
                    },
                    className: null
                });
                var dropdownInstance = $dropdown.overlayScrollbars();
                $(window).on('keydown.dropdownListener', function (event) {
                    if (event.keyCode === 40 || event.keyCode === 38) {
                        dropdownInstance.scroll({ el: $dropdown.find('.option.active, .create'), axis: 'y', margin : 5  }, 100);
                    }
                });
            },
            onDropdownClose: function ($dropdown) {
                $(window).off('keydown.dropdownListener');
            },
            onItemAdd: function (value, $item) {
                if (this.options[value].optgroup) {
                    $item.closest('form').submit();
                }
                $(document).on('keydown.searchEnter', function(e) {
                    if (e.keyCode == 13) {
                        $item.closest('form').submit();
                    }
                });
            }
        });


  var faqForm = $('#js-faqForm');
  if (faqForm.length) {
    faqForm.validate({
      errorPlacement: function(error,element) {
        return true;
      },
      errorElement: 'span',
      rules: {
        name: {
          required: true
        },
        email: {
          email: true,
          required: true
        },
        message: {
          required: true
        }
      },
      submitHandler: function(form) {
        grecaptcha.execute();
      }
    });
  }

  var marks = $('#js-marks');
  if (marks.length) {
    marks.slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      variableWidth: true
  
    });
  }

  $(document).off('click.stepperUp').on('click.stepperUp','.js-stepperUp', function(event) {
    var stepper = $(event.target).closest('.js-stepper');
    var input = stepper.find('.js-stepperInput');
    input.val(+input.val()+1);
    input.trigger('change');
  });
  $(document).off('click.stepperDown').on('click.stepperDown','.js-stepperDown', function(event) {
    var stepper = $(event.target).closest('.js-stepper');
    var input = stepper.find('.js-stepperInput');
    if (+input.val()>=2) {
      input.val(+input.val()-1);
    } else {
      input.val('');
    }
    input.trigger('change');
  });

  function phoneSymbols(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^A-Za-z\d\+\(\)-\s]/g)){
				this.value = this.value.replace(/[^A-Za-z\d\+\(\)-\s]/g, "");
			}
		});
	
		return false;
	}

	function onlyNumbers(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^\d]/g)){
				this.value = this.value.replace(/[^\d]/g, "");
			}
		});
	
		return false;
	}

	function onlyLetters(el) {

		el.on("change keyup input click", function(){
			if(this.value.match(/[^A-Za-zА-Яа-я-\s]/g)){
				this.value = this.value.replace(/[^A-Za-z-\s]/g, "");
			}
		});
	
		return false;
	}

	var textInput = $('.js-text-input');
	if (textInput.length) {
		onlyLetters(textInput);
	}

	var numericInput = $('.js-numeric-input');
	if (numericInput.length) {
		onlyNumbers(numericInput);
  }
  
  var stepperInput = $('.js-stepperInput');
  if (stepperInput.length) {
		onlyNumbers(stepperInput);
  }

	var phoneInput = $('.js-phone-input');
	if (phoneInput.length) {
		phoneSymbols(phoneInput);
  }

  var productPopUpClose = $('#js-productPopUpClose');
  var productPopUp = $('#js-mainProduct-popUp');
  var productPopUpContinue = $('#js-productPopUpContinue');
  productPopUpClose.on('click', function () {
    productPopUp.removeClass('product-pop-up--active');
  });

  productPopUpContinue.on('click', function () {
    productPopUp.removeClass('product-pop-up--active');
  });


  var popUpSend = $('.popUp-send');
  var popUpConfirm = $('.popUp-confirm');

  var popUpSendDel = $('.popUp-send__del');
  var popUpConfirmDel = $('.popUp-confirm__del');
  var popUpConfirmBtn = $('.popUp-confirm__btn');

  popUpSendDel.on('click', function (event) {
    event.preventDefault();
    popUpSend.removeClass('popUp-send--active');
    body.removeClass('overflow');
  });
  popUpConfirmDel.on('click', function () {
    popUpConfirm.removeClass('popUp-confirm--active');
    body.removeClass('overflow');
  });
  popUpConfirmBtn.on('click', function () {
    popUpConfirm.removeClass('popUp-confirm--active');
    body.removeClass('overflow');
  });


  var popUpPrint = $('.popUp-print');
  var popUpPrintDel = $('.popUp-print__del');
  var popUpPrintBtn = $('.popUp-print__btn');

  popUpPrintDel.on('click', function () {
    popUpPrint.removeClass('popUp-print--active');
    body.removeClass('overflow');
  });
  popUpPrintBtn.on('click', function () {
    popUpPrint.removeClass('popUp-print--active');
    body.removeClass('overflow');
  });


    var menuTitle = $('.js-menuTitle');
    var menuList = $('.js-menuList');
    menuTitle.on('click', function (event) {
        $(this).toggleClass('menu__title--active');
        menuList.toggleClass('menu__list--active');
    });


})();
