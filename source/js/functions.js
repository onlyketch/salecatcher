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
				if (this.x <= mainContainer.x - this.w) {
					this.destroy();
				}				

		}
	}
})