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
    infinite: false
  });
  $(".slider-circle").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: false
  });
  $(".slider-news").slick({
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    centerMode: false,
    variableWidth: true
  });
  $(".slider-related-news").slick({
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});
function reSlick(selector){
  $(selector).slick('unslick');
  setTimeout(()=>{
    $(selector).slick({
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      infinite: false
    });
  }, 10)
}

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
    let interval = setInterval(()=>{
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

window.onload = ()=>{
  if(document.querySelector('.tab-list-slider')){
    const menu = document.querySelector('.tab-list-slider'),
    menuScroll = menu.querySelector('.tabs-scroll'),
    buttonsWrapper = menu.querySelector('.options-wrapper'),
    more = menu.querySelector('.more')
    btnMore = more.querySelector('button')
    let viewportWidth,
    containerWidth,
    itemsWidth,
    maxScroll

    // Show .btn.active when is hidden by scroll
    menu.querySelector('.btn.active').scrollIntoView();
    
    function updateSize(){
      viewportWidth = window.innerWidth
      containerWidth = menuScroll.offsetWidth
      itemsWidth = menuScroll.scrollWidth
      if(itemsWidth > containerWidth){
        more.style.display = 'flex';
        buttonsWrapper.style.paddingRight = '24px';
      }else{
        more.style.display = 'none';
        buttonsWrapper.style.paddingRight = '0';
      }
      maxScroll = itemsWidth - menuScroll.offsetWidth
    }

    updateSize()

    btnMore.addEventListener('click', ()=>{
      //console.log(`Scroll actual: ${menuScroll.scrollLeft} - Máximo scroll: ${maxScroll}`)
      let scrollAmount = 0
      let distance = 100
      let step = 10
      var slideTimer = setInterval(function(){
        menuScroll.scrollLeft += step;
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
      }, 25);
    })

    menuScroll.addEventListener('scroll', ()=>{
      //console.log(`Scroll actual: ${menuScroll.scrollLeft} - Máximo scroll: ${maxScroll}`)
      if(menuScroll.scrollLeft >= (maxScroll - 10)){
        more.style.opacity = 0
        btnMore.style.pointerEvents = 'none'
      }else{
        more.style.opacity = 1
        btnMore.style.pointerEvents = 'auto'
      }
    })
  }
  window.addEventListener("resize", function () {
      updateSize()
    },true
  );

  // Set selected status on bet buttons
  if(document.querySelector('.bet-team')){
    const buttons = document.querySelectorAll('.bet-team')
    for(let button of Object.values(buttons)){
      button.addEventListener('click', ()=>{
        let parentItem = button.closest(".bet-item")
        if(button.classList.contains('selected')){
          button.classList.remove('selected')
          // Handle Esports check icon
          parentItem.classList.remove('has-selected')
          parentItem.classList.remove('has-selected-right')
        }else{
          let parentOptions = button.closest(".bet-options").querySelectorAll('.bet-team')
          for(let option of Object.values(parentOptions)){
            option.classList.remove('selected')
          }
          button.classList.add('selected')
          // Handle Esports check icon
          parentItem.classList.add('has-selected')
          if(parentItem.querySelector('.bet-team:last-child').classList.contains('selected')){
            parentItem.classList.add('has-selected-right')
          }else{
            parentItem.classList.remove('has-selected-right')
          }
        }
      })
    }
  }

  //Accordeons
  if(document.querySelector('.accord-btn')){
    const accordButtons = document.querySelectorAll('.accord-btn')
    for(let button of Object.values(accordButtons)){
      button.addEventListener('click', (e)=>{
        let clickedItem = button.closest('.accord-item')
        let allItems = button.closest('.accordeon').querySelectorAll('.accord-item')
        if(clickedItem.classList.contains('active')){
          clickedItem.classList.remove('active')
        }else{
          for(let item of Object.values(allItems)){
            if(item == clickedItem){
              item.classList.add('active')
            }else{
              item.classList.remove('active')
            }
          }
        }
      })
    }
    const contentFlows = document.querySelectorAll('.accordeon .flow')
    for(let flow of Object.values(contentFlows)){
      flow.style.marginTop = `-${flow.offsetHeight}px`
    }
  }
}