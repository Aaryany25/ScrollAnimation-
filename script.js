var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

   var currentIndex= 0;
  var  maxIndex = 1048;
const images = [];
let ImageLoaded = 0;
function preloader() {
  for (var i = 1; i <= maxIndex; i++) {
    // const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const imgUrl = `./frames/frame_${i.toString().padStart(4,"0")}.jpeg`
  
    const img = new Image();

    img.src = imgUrl;
    
    img.onload = () => {
      ImageLoaded++;
      
      if (ImageLoaded === maxIndex) {
        
        
        loadImage(frames.currentIndex);
        
        startAnimation();
      }
    };
    images.push(img);
    
  }
}

function loadImage(index) {
 
  if (index >= 0 && index <= maxIndex) {
    const img = images[index];
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ScaleX = canvas.width / img.width;
    const ScaleY = canvas.height / img.height;
    const scale = Math.max(ScaleX, ScaleY);
    // to get the imgae to fit the screen of the canvas
    const NewWidth = img.width * scale;
    const NewHeight = img.height * scale;
    //To get the Image on the center of the canvas
    const offsetX = (canvas.width - NewWidth) / 2;
    const offsetY = (canvas.height - NewHeight) / 2;

    //Clear the Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Smooth the Image Qaulity
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    //Draw the Image
    context.drawImage(img, offsetX, offsetY, NewWidth, NewHeight);
    //Next Frame
    frames.currentIndex = index;
    
    
  }
}
function startAnimation() {
   let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
    
      scrub: 2,
      // markers: true,
    },
  });
  tl.to(frames, {
    currentIndex : frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}

    //         function startAnimation(){
    //             let tl = gsap.timeline({
    //                 scrollTrigger:{
    //                 trigger: ".parent",   
    //                 start:"top top",
    //                 scrub:3,
    //                 markers:false
    //             }
    //             })

    //                 tl.to(frames,{
    //  currentIndex : frames.maxIndex,
    //  onUpdate: function(){
    //  loadImage(Math.floor(frames.currentIndex))
    //  }
    //  })

    //         }
preloader();
