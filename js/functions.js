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

function openPopup(popupSelector, display = 'flex'){
  const popup = document.querySelector(popupSelector)
  popup.style.display = display
  document.querySelector('body').classList.add('overlayed')
  setTimeout(()=>{
    popup.classList.add('active')
    popup.style.opacity = 1;
  }, 10)
}

function closePopup(element, e){
  // If the function receives a string selector like '#main-menu-wrapper'
  if(typeof element === 'string'){
    const popup = document.querySelector(element)
    //popup.style.display = 'none'
    document.querySelector('body').classList.remove('overlayed')
    popup.classList.remove('active')
    popup.style.opacity = 0
    // setTimeout(()=>{
    //   console.log('is: ' + popup.style.opacity)
    // }, 100)
    let interval = setInterval(()=>{
      console.log(window.getComputedStyle(popup).opacity)
      if(window.getComputedStyle(popup).opacity <= 0){
        popup.style.display = 'none'
        clearInterval(interval)
      }
    }, 10)
  }else{
    const box = element.querySelector('.popup-box')
    // On click outside the popup
    if(! box.contains(e.target)){
      document.querySelector('body').classList.remove('overlayed')
      element.style.opacity = 0
      let interval = setInterval(()=>{
        if(window.getComputedStyle(element).opacity <= 0){
          element.style.display = 'none'
          clearInterval(interval)
        }
      }, 10)
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

