Crafty.defineScene("loading", function() {
	successFrame.style.display = 'none';
	const sceenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;
	var loadProgress = 0;
	var loadDelay;

	//***Sprites***
	Crafty.sprite("./images/city.png", {city:[0,0,2280,520]});
	Crafty.sprite("./images/city-back.png", {cityBack:[0,0,1140,242]});
	Crafty.sprite("./images/moon.png", {moon:[0,0,132,132]});
	Crafty.sprite("./images/cloud1.png", {cloud1:[0,0,228,84]});
	Crafty.sprite("./images/cloud2.png", {cloud2:[0,0,172,47]});
	Crafty.sprite("./images/cloud3.png", {cloud3:[0,0,198,86]});
	Crafty.sprite("./images/snow.png", {snow:[0,0,1036,537]});
	Crafty.sprite(138, 78, "./images/planes.png", {planes:[0,0]});
	Crafty.sprite("./images/btn.png", {btn:[0,0,160,160]});
	Crafty.sprite("./images/big.png", {big:[0,0,86,565]});
	Crafty.sprite("./images/middle.png", {middle:[0,0,86,460]});
	Crafty.sprite("./images/small.png", {small:[0,0,86,340]});
	Crafty.sprite(133, 64, "./images/sales.png", {sales:[0,0]});
	Crafty.sprite("./images/ui-sale.png", {uisale:[0,0,19,21]});

	/***Sounds***/
	Crafty.audio.add("hit", "./sound/hit.mp3");
	Crafty.audio.add("spin", "./sound/spin.mp3");
	Crafty.audio.add("collect", "./sound/collect.mp3");

	Crafty.init(sceenWidth, screenHeight, document.getElementById('game'));
	Crafty.background("#1A3E42");

	function loading() {
		if (loadProgress < 100) {
			loadProgress += 2;
			loadBarFill.w = loadProgress * 2.4;
			loadDelay.delaySpeed += 0.1;	
		}
			else {
				loadDelay.cancelDelay(loading);
				if (localStorage.getItem('attempts') != 0) Crafty.enterScene("mainScene")
				else {
					successFrame.style.display = 'block';
					successTitle.textContent = 'упс!'
					successScore.textContent = 'К сожалению все попытки закончились';
					successLives.style.marginTop = '24px';
					successLives.style.fontSize = '18px';
					successLives.textContent = 'Спасибо за игру!';
					successBtn.style.display = 'none';
				} 
				
			}
	}

	var percent = Crafty.e("2D, DOM, Text")
		.attr({w: 192, h: 62})
		.text( function() { return loadProgress + "%"})
		.dynamicTextGeneration(true)
		.textFont({
				family: 'Unbounded-Bold',
				size: '52px',
				lineHeight: '62px'
			})
		.textColor('#FFFFFF')
		.textAlign('center');
	percent.x = sceenWidth/2 - percent.w/2;
	percent.y = screenHeight/2 - percent.h;

	var loadBar = Crafty.e("2D, DOM")
		.attr({w: 240, h: 21})
		.css({
			'background': 'rgba(9, 9, 15, 0.15)',
			'border': '1px solid rgba(186, 245, 246, 0.7)',
			'border-radius': '4px'
		}); 
	loadBar.x = sceenWidth/2 - loadBar.w/2;
	loadBar.y = percent.y + percent.h + 37;

	var loadBarFill = Crafty.e("2D, DOM")
		.attr({w: loadProgress, h: 21, x: loadBar.x + 1, y: loadBar.y + 1})
		.css({
			'background': 'linear-gradient(0deg, #FEB83F, #FEB83F), radial-gradient(74.41% 75.85% at 38.33% -28.85%, #F1D6B6 0%, #FBECE1 100%)',
			'box-shadow': 'inset 1.40816px 1.40816px 1.40816px rgba(224, 242, 255, 0.6), inset -1.40816px -1.40816px 1.40816px rgba(0, 135, 252, 0.25)',
			'border-radius': '2px'
		});

	loadDelay = Crafty.e("Delay").delay(loading, 200, -1);		

})