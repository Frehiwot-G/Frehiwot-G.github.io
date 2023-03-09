const slidercontainer=document.querySelector('.slider-container')
const downbutton=document.querySelector('.down-button')
const upbutton=document.querySelector('.up-button')
const leftslider=document.querySelector('.left-slider')
const rightslider=document.querySelector('.right-slider')
const slidelength=rightslider.querySelectorAll('div').length

let activeslideindex=0

leftslider.style.top=`-${(slidelength-1)*100}vh`

upbutton.addEventListener('click',() => changedslider('up'))
downbutton.addEventListener('click',() => changedslider('down'))

const changedslider=(direction)=> {
    const slideheight=slidercontainer.clientHeight
    if(direction==='up'){
        activeslideindex++
        if(activeslideindex > slidelength-1){
            activeslideindex=0
        }
    }
    else if(direction==='down'){
            activeslideindex--
            if(activeslideindex < 0){
                activeslideindex=slidelength-1
            }

        }
    
    rightslider.style.transform=`translateY(-${activeslideindex*slideheight}px)`
    leftslider.style.transform=`translateY(${activeslideindex*slideheight}px)`
    } 
