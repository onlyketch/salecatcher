Crafty.defineScene("testScene", function() {
    successFrame.style.display = 'none';

	Crafty.init(500, 500, document.getElementById('game'));
	Crafty.background("#1A3E42");

	Crafty.sprite(138, 78, "./images/planes.png", {planes:[0,0]});
	Crafty.sprite("./images/btn.png", {btn:[0,0,160,160]});

		Crafty.c("Plane", {
		init: function() {
			this.addComponent("2D, Canvas, planes, SpriteAnimation, Collision, Gravity, Motion");
			this.w = 69;
			this.h = 39;
			this.x = 90;
			this.y = 110;
			this.z = 20;
			this.origin("center");
			this.rotation = this.rotation - 2;
			this.reel("prop", 50, [[0,0], [1,0]]);
			this.animate("prop", -1);
			this.checkHits("Solid");
			this.speed = 100;
			this.vy = 0;
		}
	})

		Crafty.c("Button", {
		init: function() {
			this.addComponent("2D, DOM, btn, Mouse");
			this.w = 80;
			this.h = 80;
			this.x = 200;
			this.y = 400;
			this.z = 35;

			this.css({'cursor': 'pointer'});

			this.bind('Click', function(e) {
					plane.speed = -plane.speed;
					plane.vy = plane.speed;
					// if (flightDirection == -1) flightDirection = 1;
					// else if (flightDirection == 1) flightDirection = -1;
					// else flightDirection = 1;
			})
		}
	})

	var plane = Crafty.e("Plane");
	var btn = Crafty.e("Button");



})