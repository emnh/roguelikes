function loadImage(size, container, r, scale) {
  const src = images[r].replace('dcss', 'dcss' + scale);
  const imgstr = '<img style="margin-bottom: 5px; border: 1px solid black;" class="main" src="' + src + '"></img>';
  const img2 = container.append(imgstr);
  const img = $(".main");
//  img.css('width', '512px');
//  img.css('height', '512px');
  //const size2 = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.5) - 5;
  img.css('width', size + 'px');
  img.css('height', size + 'px');
  //img[0].width = window.innerWidth - 5;
  //img[0].height = window.innerHeight - 5;
	return img;
}

function lis(container) {
  const size2 = Math.floor(Math.max(window.innerWidth, window.innerHeight) * 0.5) - 5;
  const size = Math.min(256, size2);
  for (let i = 0; i < 1; i++) {
    const r1 = Math.floor(Math.random() * images.length);
    const r2 = Math.floor(Math.random() * images.length);
    //for (let j = 0; j < 3; j++) {
		container.append("<h3>Swipe best image</h3>");
		const div1 = $("<div class='ic' style='width: 100%;' />");
		//const arrow1 = "<h1 class='arrow left'>←</h1>";
		const arrow1 = $("<img src='images/right-arrow.svg' class='arrow left'></img>");
    arrow1[0].style.width = size + 'px';
    arrow1[0].style.height = Math.floor(0.25 * size) + 'px';
		container.append(div1);
		const img1 = loadImage(size, div1, r1, '16x');
    container.append(arrow1);

		const div2 = $("<div class='ic'/>");
		//const arrow2 = "<h1 class='arrow right'>→</h1>";
		const arrow2 = $("<img src='images/right-arrow.svg' class='arrow right'></img>");
    arrow2[0].style.width = size + 'px';
    arrow2[0].style.height = Math.floor(0.25 * size) + 'px';
		container.append(div2);
    const img2 = loadImage(size, div2, r2, '16x');
		container.append(arrow2);
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
  body.empty();
//  body.css('width', '100%');
//  body.css('height', '100%');
//  body.css('overflow', 'hidden');
  const maindiv = $("<div class='swiper mySwiper' />");
  const wrapper = $("<div class='slider-wrapper' />");
  body.append(maindiv);
  maindiv.append(wrapper);
  for (let i = 0; i < 3; i++) {
    const container = $("<div class='swiper-slide' />");
    wrapper.append(container);
    lis(container);
  }
  const swiper = new Swiper(".mySwiper", {});
  console.log(swiper);
  //setInterval(lis, 2000);
}
$(main);
