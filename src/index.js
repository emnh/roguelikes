function loadImage() {
  const r = Math.floor(Math.random() * images.length);
  const src = images[r];
  const imgstr = '<img class="main" src="' + src + '"></img>';
  const img2 = $("body").append(imgstr);
  const img = $(".main");
  img.css('width', '256px');
  img.css('height', '256px');
  //img[0].width = window.innerWidth - 5;
  //img[0].height = window.innerHeight - 5;
}

function lis() {
  $("body").empty();
  for (let i = 0; i < 2; i++) {
    for (let i = 0; i < 2; i++) {
      loadImage();
    }
    $("body").append('<br/>');
  }
}

function main() {
  //$("body").append("Hello world!<br/>");
  //loadImage();
  //$("body")
  const body = $("body");
  body.css('width', '100%');
  body.css('height', '100%');
  body.css('overflow', 'hidden');
  setInterval(lis, 2000);
}
$(main);
