
    const sceenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;
	var flightDirection = 0;
	const stamps = ["big", "middle", "small"];
	var gameOver = false;
	var startGame = true;

	function createStamp() {
	    if (!gameOver && startGame) {
	    	Crafty.e("Stamp");
			setInterval(function() {
				Crafty.e("Stamp");
			}, 3000);
		}
	}

	function planeFall() {
		if (!gameOver) {
			Crafty.audio.play("hit", 1);
			flightDirection = 0;
			gameOver = true;
			plane.pauseAnimation();
			plane.gravity("floor");
		}

	}

	Crafty.init(sceenWidth, screenHeight, document.getElementById('game'));
	Crafty.background("#1A3E42");

	//***_sprites_***
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

	/*Sounds*/
	Crafty.audio.add("hit", "./sound/hit.mp3");
	Crafty.audio.add("spin", "./sound/spin.mp3");

	var mainContainer = Crafty.e("2D, DOM")
		.attr({w: sceenWidth, h: 420, x: 0})
		.css({'background': '#87D8D9', 'overflow': 'hidden'});
	mainContainer.y = screenHeight/2 - mainContainer.h/2;

	//***_background objects_***
	Crafty.e("cityShadow");
	Crafty.e("town");


	var moon = Crafty.e("2D, DOM, moon, Mouse")
		.attr({ y: mainContainer.y + 27, x: mainContainer.x + 125, w: 40, h: 40 });	

	var cloud1 = Crafty.e("2D, DOM, cloud1")
		.attr({ y: mainContainer.y + 17, x: mainContainer.x + 16, w: 65, h: 24 });

	var cloud2 = Crafty.e("2D, DOM, cloud2")
		.attr({ y: mainContainer.y + 6, x: mainContainer.w - 197, w: 48, h: 13 });

	var cloud3 = Crafty.e("2D, DOM, cloud3")
		.attr({ y: mainContainer.y + 14, x: mainContainer.w - 65, w: 58, h: 25 });

	Crafty.e("Snow");

	Crafty.e("floor");
	Crafty.e("ceiling");

	//***_UI objects_***
    Crafty.e("Button");


	//***_Plane_***
	var plane = Crafty.e("Plane");

	createStamp();
