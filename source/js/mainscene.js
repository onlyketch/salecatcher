
Crafty.defineScene("mainScene", function() {

	successFrame.style.display = 'none';
	const sceenWidth = document.body.clientWidth;
	const screenHeight = document.body.clientHeight;
	const stamps = ["big", "middle", "small"];
	var gameOver = false;
	var gameScore = 0;
	var gameStart = false;
	var stampDelay;


	function startGame() {
		if (gameStart) {
			stampDelay = Crafty.e("Delay").delay(createStamp, 2000, -1);
			plane.gravity("floor");
		}
	}

	function createStamp() {
		const saleYPos = [220, 200, 160, 180, 240, 260, 250];
		const saleXPos = [140, 160, 120, 100, 180];
		if (!gameOver) {		
			Crafty.e("Stamp");
			var saleYPosRnd = Crafty.math.randomElementOfArray(saleYPos);
			var saleXPosRnd = Crafty.math.randomElementOfArray(saleXPos);
			Crafty.e("Sale").place(mainContainer.w + saleXPosRnd, mainContainer.y + ( mainContainer.h - saleYPosRnd));
		}
	}

	function planeFall() {
		if (!gameOver) {
			plane.vy = 0;
			plane.pauseAnimation();
			Crafty.audio.play("hit", 1, 0.5);
			gameOver = true;
			stampDelay.cancelDelay(createStamp);
			town.css({'animation-play-state': 'paused'});
			townBack.css({'animation-play-state': 'paused'});
			dataUpdate();		
		}
	}

	function dataUpdate() {
		var attempts = localStorage.getItem('attempts');
		var bestScore = localStorage.getItem('bestscore');
		if ( attempts > 0 ) {
			attempts -= 1;
			localStorage.attempts = attempts;
			if (gameScore > bestScore) localStorage.bestscore = gameScore;
			
			if ( attempts != 0) {
				setTimeout(function() {
					successFrame.style.display = 'block';
					successScore.textContent = 'Ты собрал скидок: ' + gameScore;
					successLives.textContent = 'Осталось попыток: ' + attempts;
				}, 500);
			} else {
				setTimeout(function() {
					successFrame.style.display = 'block';
					successTitle.textContent = 'упс!';
					successScore.textContent = 'Все попытки закончились';
					successLives.textContent = 'Твой лучший счет: ' + localStorage.getItem('bestscore');
					successBtn.disabled = true;
					successBtn.style.background = '#C2BCBC';
				}, 500);
			}

		} else {
			localStorage.gift = true;
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
			this.addComponent("2D, DOM");
			this.w = mainContainer.w;
			this.h = 242;
			this.x = mainContainer.x;
			this.y = mainContainer.y + (mainContainer.h - this.h - 36);
			this.z = 5;
			this.css({
				'background': 'url("./images/city-back.png") repeat-x',
				'background-size': '1140px 242px',
				'backround-position': '0% 1140px',
				'animation': 'townBackScroll linear 16s infinite'
			});
		}
	})

	Crafty.c("town", {
		init: function() {
			this.addComponent("2D, DOM");
			//this.w = 1140;
			this.w = mainContainer.w;
			this.h = 260;
			this.x = mainContainer.x;
			this.y = mainContainer.y + (mainContainer.h - this.h);
			this.z = 10;
			this.css({
				'background': 'url("./images/city.png") repeat-x',
				'background-size': '1140px 260px',
				'backround-position': '0% 1140px',
				'animation': 'townScroll linear 12s infinite'
			});
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
			this.addComponent("2D, DOM, planes, SpriteAnimation, Collision, Gravity, Jumper");
			this.w = 69;
			this.h = 39;
			this.x = mainContainer.x + 90;
			this.y = mainContainer.y + 110;
			this.z = 20;
			this.origin("center");
			this.reel("prop", 50, [[0,0], [1,0]]);
			this.animate("prop", -1);
			this.checkHits("Solid");
			this.gravityConst(550);
			this.jumpSpeed(260);
		},
		events: {
			"HitOn": function() {
				planeFall();
			},
			"CheckJumping": function() {
				this.canJump = true;
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
				if (!gameStart) {
					gameStart = true;
					startGame();
				}
				if (!gameOver) {
					Crafty.audio.play("spin", 1, 0.4);
					plane.jump();
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
				if (!gameOver) this.x = this.x - 3;
				if (this.x <= mainContainer.x - this.w) {
					this.destroy();
				}
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
			this.checkHits("Plane");
		},
		place: function(x,y) {
			this.x = x;
			this.y = y;
		},
		events: {
			"UpdateFrame": function() {
				if (!gameOver) this.x = this.x - 3;
				if (this.x <= mainContainer.x - this.w) this.destroy();
			},
			"HitOn": function() {
				Crafty.audio.play("collect", 1, 0.5);
				gameScore += 1;
				if (gameScore < 13) {
					progressBarFill.w += 10;
				}
				this.destroy();
			}			
		}
	})

	Crafty.c("ProgressBar", {
		init: function() {
			this.addComponent("2D, DOM");
			this.w = 120;
			this.h = 20;
			this.x = mainContainer.x + 24;
			this.y = mainContainer.y + 28;
			this.z = 35;
			this.css({'background': 'rgba(9, 9, 15, 0.15)',
					  'border': '1px solid rgba(186, 245, 246, 0.7)',
					  'border-radius': '6px'	

			});
		}
	})

	Crafty.c("ProgressBarText", {
		init: function() {
			this.addComponent("2D, DOM, Text");
			this.x = progressBar.x + (progressBar.w - 22);
			this.y = progressBar.y + 5;
			this.z = 37;
			this.text(function() { return gameScore});
			this.dynamicTextGeneration(true);
			this.textFont({
				family: 'Unbounded-Bold',
				size: '12px',
				lineHeight: '14px'
			})
			this.textColor('#204043');
		}
	})

	Crafty.c("ProgressBarImg", {
		init: function() {
			this.addComponent("2D, DOM, uisale");
			this.w = 12;
			this.h = 13;
			this.x = progressBarText.x - 15;
			this.y = progressBar.y + 4;
			this.z = 37;
		}
	})

	Crafty.c("ProgressBarFill", {
		init: function() {
			this.addComponent("2D, DOM");
			this.x = progressBar.x + 1;
			this.y = progressBar.y + 1;
			this.w = 0;
			this.h = 20;
			this.z = 36;
			this.css({
				'background': 'linear-gradient(0deg, #FFFFFF, #FFFFFF), radial-gradient(74.41% 75.85% at 38.33% -28.85%, #EEDDE5 0%, #E1ECFB 100%)',
				'box-shadow': 'inset 1.71428px 1.71428px 1.71428px rgba(224, 242, 255, 0.6), inset -1.71428px -1.71428px 1.71428px rgba(0, 135, 252, 0.25)',
				'border-radius': '6px'
			}); 
		}
	})

	Crafty.init(sceenWidth, screenHeight, document.getElementById('game'));
	Crafty.background("#1A3E42");

	var mainContainer = Crafty.e("2D, DOM")
	.attr({w: sceenWidth, h: 420, x: 0})
	.css({'background': '#87D8D9', 'overflow': 'hidden'});
	mainContainer.y = screenHeight/2 - mainContainer.h/2;

	//***_background objects_***
	var townBack = Crafty.e("cityShadow");
	var town = Crafty.e("town");


	var moon = Crafty.e("2D, DOM, moon")
	.attr({ y: mainContainer.y + 50, x: mainContainer.x + 150, w: 40, h: 40 });	

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
	var progressBar = Crafty.e("ProgressBar");
	var progressBarText = Crafty.e("ProgressBarText");
	Crafty.e("ProgressBarImg");
	var progressBarFill = Crafty.e("ProgressBarFill");


	//***_Plane_***
	var plane = Crafty.e("Plane");
})