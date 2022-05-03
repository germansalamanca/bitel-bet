$(document).on('ready', function() {
  $(".slider-promo").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false
        }
      }
    ]
  });
  $(".slider-ring").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  });
  $(".slider-circle").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
  });
});

function openPopup(popupSelector){
  const popup = document.querySelector(popupSelector)
  popup.style.display = 'flex'
  document.querySelector('body').classList.add('overlayed')
}

function closePopup(element, e){
  if(typeof element === 'string'){
    const popup = document.querySelector(element)
    popup.style.display = 'none'
    document.querySelector('body').classList.remove('overlayed')
  }else{
    const box = element.querySelector('.popup-box')
    if(! box.contains(e.target)){
      element.style.display = 'none'
      document.querySelector('body').classList.remove('overlayed')
    }
  }
}

function showTabContent(tabButton, tabContentSelector, tabsGroupClass){
  if(!tabButton.classList.contains('active')){
    const tabButtons = document.querySelectorAll(`.tab.${tabsGroupClass}`)
    for(let button of Object.values(tabButtons)){
      button.classList.remove('active')
      tabButton.classList.add('active')
    }
    const tabContent = document.querySelector(tabContentSelector)
    const contents = document.querySelectorAll(`.tab-content.${tabsGroupClass}`)
    for(let content of Object.values(contents)){
      content.classList.remove('active')
      tabContent.classList.add('active')
    }
  }
}

