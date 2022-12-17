
Crafty.defineScene("mainScene", function() {

	const sceenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;
	var flightDirection = 0;
	const stamps = ["big", "middle", "small"];
	var gameOver = false;
	var startGame = true;
	var timerId;

	function createStamp() {
		if (!gameOver && startGame) {
			Crafty.e("Stamp");
			timerId = setInterval(function() {
				checkGameOver();
				Crafty.e("Stamp");
			}, 3000);
		}
	}

	function checkGameOver() {
		if (gameOver) {
			clearInterval(timerId);
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

	Crafty.c("Snow", {
		init: function() {
			var posX = Math.floor(Math.random() * 100);
			this.addComponent("2D, DOM, Renderable, snow");
			this.w = 517;
			this.h = 264;
		this.x = mainContainer.x + posX; //26
		this.y = mainContainer.y;
		this.z = 25;

		this.bind('UpdateFrame', function() {
			this.y = this.y + 0.5;
			this.x = this.x - 0.5;
			if ( this.alpha > 0) { 
				this.alpha = this.alpha - 0.0030;
				if (this.y == mainContainer.y + 50) Crafty.e("Snow").css({'animation': 'fadeIn 3s 1'});
			} else {
				this.destroy();
			}

		})
	}
	})

	Crafty.c("cityShadow", {
		init: function() {
			this.addComponent("2D, DOM, cityBack");
			this.x = mainContainer.x;
			this.y = mainContainer.y + (mainContainer.h - this.h - 36);
			this.z = 5;

			this.bind('UpdateFrame', function() {

				if (!gameOver) this.x = this.x - 1;

				if (this.x == -this.w) {
					this.destroy();
				} else if(this.x == -this.w/2) {
					Crafty.e("cityShadow").x = mainContainer.w;
				}				


			})

		}
	})

	Crafty.c("town", {
		init: function() {
			this.addComponent("2D, DOM, city");
			this.w = 1140;
			this.h = 260;
			this.x = mainContainer.x;
			this.y = mainContainer.y + (mainContainer.h - this.h);
			this.z = 10;

			this.bind('UpdateFrame', function() {

				if (!gameOver) this.x = this.x - 2;

				if (this.x == -this.w) {
					this.destroy();
				} else if(this.x == -this.w/2) {
					Crafty.e("town").x = mainContainer.w;
				}


			})

		}	
	})

	Crafty.c("floor", {
		init: function() {
			this.addComponent("2D, DOM, Solid");
			this.w = mainContainer.w;
			this.h = 14;
			this.x = mainContainer.x;
			this.y = mainContainer.y + (mainContainer.h - this.h);
			this.z = 15;
		}
	})

	Crafty.c("ceiling", {
		init: function() {
			this.addComponent("2D, DOM, Solid");
			this.w = mainContainer.w;
			this.h = 14;
			this.x = mainContainer.x;
			this.y = mainContainer.y - this.h;
			this.z = 15;
		}
		
	})

	Crafty.c("Plane", {
		init: function() {
			this.addComponent("2D, DOM, planes, SpriteAnimation, Collision, Gravity");
			this.w = 69;
			this.h = 39;
			this.x = mainContainer.x + 90;
			this.y = mainContainer.y + 110;
			this.z = 20;
			this.origin("center");
			this.rotation = this.rotation - 2;
			this.reel("prop", 50, [[0,0], [1,0]]);
			this.animate("prop", -1);
			this.checkHits("Solid");
		},
		events: {
			"UpdateFrame": function() {
				if (flightDirection == -1) {
					this.y = this.y + 2;
				} else if (flightDirection == 1) {
					this.y = this.y - 2;
				}	
			},
			"HitOn": function() {
				planeFall();
			}
		}
	})

	Crafty.c("Button", {
		init: function() {
			this.addComponent("2D, DOM, btn, Mouse");
			this.w = 80;
			this.h = 80;
			this.x = mainContainer.w - this.w - 30;
			this.y = mainContainer.y + mainContainer.h - this.h - 30;
			this.z = 35;

			this.css({'cursor': 'pointer'});

			this.bind('Click', function(e) {
				if (!gameOver) {
					Crafty.audio.play("spin", 1, 0.8);
					if (flightDirection == -1) flightDirection = 1;
					else if (flightDirection == 1) flightDirection = -1;
					else flightDirection = 1;
				}
			})
		}
	})

	Crafty.c("Stamp", {
		init: function() {
			var rnd = Math.floor(Math.random() * stamps.length);

			this.addComponent("2D, DOM, Collision, Solid, " + stamps[rnd]);
			switch (stamps[rnd]) {
				case "big":
				this.h = 282;
				break;
				case "middle":
				this.h = 230;
				break;
				case "small":
				this.h = 170;
				break;					
			}
			this.w = 43;
			this.x = mainContainer.w;
			this.y = mainContainer.y + (mainContainer.h - this.h - 14);
			this.z = 15;
			this.collision(16,0,27,0,27,6,31,6,31,40,26,39,26,245,18,245,18,39,12,40,12,6,16,6);
		},
		events: {
			"UpdateFrame": function() {
				if (!gameOver) this.x = this.x - 2;
				if (this.x <= mainContainer.x - this.w) this.destroy();
			}
		}
	})

	Crafty.c("Sale", {
		init: function() {
			this.addComponent("2D, DOM, sales, SpriteAnimation, Collision");
			this.w = 65;
			this.h = 32;
			this.origin("center");
			this.z = 20;
			this.reel("wings", 200, [[0,0], [1,0]]);
			this.animate("wings", -1);
		},
		place: function(x,y) {
			this.x = x;
			this.y = y;
		}
	})

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
	Crafty.sprite(133, 64, "./images/sales.png", {sales:[0,0]});

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
	moon.bind("Click", function() {
		Crafty.enterScene("mainScene");
	})	

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
	Crafty.e("Sale").place(mainContainer.x + 250, mainContainer.y + 200);

	createStamp();
})