function loadImage(size, container, r, scale) {
  const src = images[r].replace('dcss', 'dcss' + scale);
  const imgstr = '<img style="margin-bottom: 5px; border: 1px solid black;" class="main visible" src="' + src + '"></img>';
  const img2 = container.append(imgstr);
  const img = $(".main");
//  img.css('width', '512px');
//  img.css('height', '512px');
  //const size2 = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.5) - 5;
//  img.css('width', size + 'px');
//  img.css('height', size + 'px');
  //img[0].width = window.innerWidth - 5;
  //img[0].height = window.innerHeight - 5;
	return img;
}

function lis(container2) {
  const size2 = Math.floor(Math.max(window.innerWidth, window.innerHeight) * 0.5) - 5;
  const size = Math.min(256, size2);
  const container = $("<div class='page'/>");
  container2.append(container);
  for (let i = 0; i < 1; i++) {
    const r1 = Math.floor(Math.random() * images.length);
    const r2 = Math.floor(Math.random() * images.length);
    //for (let j = 0; j < 3; j++) {
//    container.append("<h3>Swipe best image</h3>");
		const div1 = $("<div class='ic top' />");
		//const arrow1 = "<h1 class='arrow left'>←</h1>";
		const arrow1 = $("<img src='images/right-arrow.svg' class='arrow up'></img>");
		const like1 = $("<img src='images/like.svg' class='like up'></img>");
//    arrow1[0].style.width = size + 'px';
    //arrow1[0].style.height = Math.floor(0.1 * size) + 'px';
		container.append(div1);
    div1.append(like1);
    div1.append(arrow1);
		const img1 = loadImage(size, div1, r1, '16x');

		const div2 = $("<div class='ic bottom' />");
		//const arrow2 = "<h1 class='arrow right'>→</h1>";
		const arrow2 = $("<img src='images/right-arrow.svg' class='arrow down'></img>");
		const like2 = $("<img src='images/like.svg' class='like down'></img>");
//    arrow2[0].style.width = size + 'px';
    //arrow2[0].style.height = Math.floor(0.1 * size) + 'px';
		container.append(div2);
    const img2 = loadImage(size, div2, r2, '16x');
		div2.append(arrow2);
		div2.append(like2);
//    for (let j = 0; j < 1; j++) {
//      const scale =
//        j === 0 ?
//          '16x' :
//            (j === 1 ? '4x' : '');
//      loadImage(r, scale);
//  }
//    $("body").append('<br/>');
  }
}

function main() {
  //$("body").append("Hello world!<br/>");
  //loadImage();
  //$("body")
  const body = $("body");
  // body.empty();
//  body.css('width', '100%');
//  body.css('height', '100%');
//  body.css('overflow', 'hidden');
//  const maindiv = $("<div class='swiper mySwiper' />");
//  const wrapper = $("<div class='slider-wrapper' />");
	const wrapper = $("#wrapper");
//  body.append(maindiv);
//  maindiv.append(wrapper);
	const containers = [];
  const maxi = 5;
  for (let i = 0; i < maxi; i++) {
    const container = $("<div class='swiper-slide' ></div>");
    wrapper.append(container);
    lis(container);
		containers.push(container);
  }

	const myPlugin = function({ swiper, extendParams, on }) {
      extendParams({
        debugger: false,
      });

   		on('slideChangeTransitionEnd', () => {
        const container = $(swiper.slides[swiper.previousIndex]); // containers[(swiper.previousIndex + maxi - 1) % maxi];
        container.empty();
        lis(container);
				console.log('slideChangeTransitionEnd', swiper.previousIndex, '->', swiper.activeIndex);
      });
//       on('slideNextTransitionEnd', () => {
//        const container = containers[(swiper.previousIndex - 1) % maxi];
//        container.empty();
//        lis(container);
//        console.log('slideNextTransitionEnd', swiper.previousIndex, '->', swiper.activeIndex);
//      });

			on('slideChange', () => {
//        if (!swiper.params.debugger) return;
//        if (swiper.previousIndex > 0) {
//          const container = containers[(swiper.previousIndex - 1) % maxi];
//          container.empty();
//          lis(container);
//        }
//        setTimeout(() => {
//          $("up down").addClass("hidden");
//        }, 2000);
        console.log(
          'slideChange',
          swiper.previousIndex,
          '->',
          swiper.activeIndex
        );
      });
	};
  const swiper = new Swiper(".mySwiper", {
		modules: [myPlugin],
		direction: "vertical",
		loop: true
	});
  console.log(swiper);
  //setInterval(lis, 2000);
}
$(main);
