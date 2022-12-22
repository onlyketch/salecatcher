	var successFrame = document.querySelector(".success");
	var successTitle = document.querySelector(".success__title");
	var successScore = document.querySelector(".success__score");
	var successLives = document.querySelector(".success__lives");
	var successBtn = document.querySelector(".success__btn");

	if ( localStorage.getItem('user_id') == null) {
		localStorage.setItem('user_id', 'Dave');
		localStorage.setItem('attempts', 3);
		localStorage.setItem('bestscore', 0);
		localStorage.setItem('gift', false);
	}


	successBtn.addEventListener("click", function() {
		if (localStorage.attempts != 0) Crafty.enterScene("mainScene")
	});

	Crafty.enterScene("loading");



