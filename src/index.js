function loadImage(r, scale) {
  const src = images[r].replace('dcss', 'dcss' + scale);
  const img = $('<img class="main visible" src="' + src + '"></img>');
  img[0].dataset.index = r;
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
    container.append("<div class='results' class='hidden'/>");
    wrapper.append(container);
    lis(container);
		containers.push(container);
  }

	const myPlugin = function({ swiper, extendParams, on }) {
      extendParams({
        debugger: false,
      });

      let first = true;
      let counter = 0;
      let prevWasResults = false;

   		on('slideChangeTransitionEnd', () => {
        if (first) {
          first = false;
          return;
        }
        counter += 1;

        const container = $(swiper.slides[swiper.previousIndex]); // containers[(swiper.previousIndex + maxi - 1) % maxi];

        const imgs = container.find('img.main');
        if (!prevWasResults && imgs.length > 0) {
          let indices = [imgs[0].dataset.index, imgs[1].dataset.index];
          if (swiper.previousIndex < swiper.activeIndex) {
            indices = [indices[1], indices[0]];
          }
          const [upvote, downvote] = indices;
          console.log(imgs[0]);
          console.log(imgs[1]);
          console.log("up", upvote, "down", downvote);
          fetch("https://emh.lart.no/stockpilerpg/vote?imagelikeid=" + upvote + "&imagedownvoteid=" + downvote)
            .then((response) => response.json())
            .then((data) => console.log(data));
        }

        if (counter % 10 == 0) {
          resultsMain($(swiper.slides[swiper.activeIndex]));
          $(".results").removeClass('hidden');
          $(".page").addClass('hidden');
          prevWasResults = true;
        } else {
          $(".results").addClass('hidden');
          $(".page").removeClass('hidden');
          prevWasResults = false;
        }

        relis(container);
				console.log('slideChangeTransitionEnd', swiper.previousIndex, '->', swiper.activeIndex);
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

const resultsMain = function(container) {
  const results = container.find(".results");
  results.empty();
  results.append("<h1>Top 100</h1>");
  fetch("https://emh.lart.no/stockpilerpg/status?top=100")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const ar = data.results;
      for (let i = 0; i < ar.length; i++) {
        const a = ar[i];
        const imgid = a.imgid;
        const diffcount = a.diffcount;
//        console.log(imgid, diffcount);
        const div = $("<div style='display: inline-block;' />");
        div.addClass("result");
        const img = loadImage(imgid, '4x');
        img.removeClass("main");
        img[0].style.width = '64px';
        img[0].style.height = '64px';
        results.append(div);
        div.append(img);
        const like1 = $("<img src='images/like-cropped.svg'></img>");
        like1[0].style.width = '16px';
        like1[0].style.height = '16px';
        div.append(like1);
        div.append(diffcount);
      }
    });
};

$(main);
