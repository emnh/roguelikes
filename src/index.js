function loadImage(r, scale) {
  const src = images[r].replace('dcss', 'dcss' + scale);
  const img = $('<img style="margin-bottom: 5px; border: 1px solid black;" class="main visible" src="' + src + '"></img>');
	return img;
}

function lis(container2) {
  const container = $("<div class='page'/>");
  container2.append(container);
  for (let i = 0; i < 1; i++) {
    const r1 = Math.floor(Math.random() * images.length);
    const r2 = Math.floor(Math.random() * images.length);
		const div1 = $("<div class='ic top' />");
		const arrow1 = $("<img src='images/right-arrow-cropped.svg' class='arrow up'></img>");
		const like1 = $("<img src='images/like-cropped.svg' class='like up'></img>");
		container.append(div1);
    div1.append(like1);
    div1.append(arrow1);
		const img1 = loadImage(r1, '16x');
    div1.append(img1);

		const div2 = $("<div class='ic bottom' />");
		const arrow2 = $("<img src='images/right-arrow-cropped.svg' class='arrow down'></img>");
		const like2 = $("<img src='images/like-cropped.svg' class='like down'></img>");
		container.append(div2);
    const img2 = loadImage(r2, '16x');
    div2.append(img2);
		div2.append(arrow2);
		div2.append(like2);
  }
}

function relis(container2) {
    const r1 = Math.floor(Math.random() * images.length);
    const r2 = Math.floor(Math.random() * images.length);
		const ctop = container2.find(".ic.top");
    const cbottom = container2.find(".ic.bottom");
    ctop.find("img.main").remove();
    cbottom.find("img.main").remove();
		const img1 = loadImage(r1, '16x');
    ctop.append(img1);
    const img2 = loadImage(r2, '16x');
    cbottom.prepend(img2);
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
        //container.empty();
        relis(container);
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
		loop: true,
    navigation: {
      nextEl: ".up",
      prevEl: ".down",
    },
    keyboard: {
      enabled: true,
    }
	});
  console.log(swiper);
  //setInterval(lis, 2000);
}
$(main);
