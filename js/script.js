function play() {

    $("#start").hide();

    $("#background").append("<div id='player' class='anima1'></div>");
    $("#background").append("<div id='enemy1' class='anima2'></div>");
    $("#background").append("<div id='enemy2'></div>");
    $("#background").append("<div id='friend' class='anima3'></div>");
    $("#background").append("<div id='scoreboard'></div>");

    var canShoot = true;
    var end = false;
    var points = 0;
    var saved = 0;
    var lost = 0;
    var game = {};
    var velocity = 5;
    var positionY = parseInt(Math.random() * 334);
    var KEY = {
        UP: 38,
        DOWN: 40,
        SPACE: 32,
    }
    

    game.press = [];

    $(document).keydown(function (e) {
        game.press[e.which] = true;
    });
    $(document).keyup(function (e) {
        game.press[e.which] = false;
    });

    game.timer = setInterval(loop, 30);

    function loop() {

        moviment();
        movePlayer();
        moveEnemy1();
        moveEnemy2();
        moveFriend();
        impact();
        scoreboard();
    }

    function moviment() {

        left = parseInt($("#background").css("background-position"));
        $("#background").css("background-position", left - 1);

    }


    function movePlayer() {

        if (game.press[KEY.UP]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top", top - 10);
            if (top <= 0) {
                $("#player").css("top", top + 10);
            }
        }

        if (game.press[KEY.DOWN]) {

            var top = parseInt($("#player").css("top"));
            $("#player").css("top", top + 10);
            if (top >= 430) {
                $("#player").css("top", top - 10);
            }
        }

        if (game.press[KEY.SPACE]) {
            shoot();
        }
    }

    function moveEnemy1() {

        positionX = parseInt($("#enemy1").css("left"));
        $("#enemy1").css("left", positionX - velocity);
        $("#enemy1").css("top", positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", positionY);

        }
    }

    function moveEnemy2() {
        positionX = parseInt($("#enemy2").css("left"));
        $("#enemy2").css("left", positionX - 3);

        if (positionX <= 0) {
            $("#enemy2").css("left", 775);

        }
    }

    function moveFriend() {

        positionX = parseInt($("#friend").css("left"));
        $("#friend").css("left", positionX + 1);

        if (positionX > 906) {
            $("#friend").css("left", 0);
        }
    }

    function shoot() {

        if (canShoot == true) {

            canShoot = false;

            topo = parseInt($("#player").css("top"))
            positionX = parseInt($("#player").css("left"))
            shootX = positionX + 200;
            topShot = topo + 37;
            $("#background").append("<div id='shot'></div>");
            $("#shot").css("top", topShot);
            $("#shot").css("left", shootX);

            var timeShoot = window.setInterval(shooting, 30);

        }

        function shooting() {
            positionX = parseInt($("#shot").css("left"));
            $("#shot").css("left", positionX + 15);

            if (positionX > 900) {

                window.clearInterval(timeShoot);
                timeShoot = null;
                $("#shot").remove();
                canShoot = true;

            }
        }
    }

    function impact() {
        var impact1 = ($("#player").collision($("#enemy1")));
        var impact2 = ($("#player").collision($("#enemy2")));
        var impact3 = ($("#shot").collision($("#enemy1")));
        var impact4 = ($("#shot").collision($("#enemy2")));
        var impact5 = ($("#player").collision($("#friend")));
        var impact6 = ($("#enemy2").collision($("#friend")));

        if (impact1.length > 0) {

            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));
            explosion1(enemy1X, enemy1Y);

            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", positionY);
        }


        if (impact2.length > 0) {

            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            explosion2(enemy2X, enemy2Y);

            $("#enemy2").remove();
            reposEnemy2();
        }

        if (impact3.length > 0) {

            points = points + 100;
            enemy1X = parseInt($("#enemy1").css("left"));
            enemy1Y = parseInt($("#enemy1").css("top"));

            explosion1(enemy1X, enemy1Y);
            $("#shot").css("left", 950);

            positionY = parseInt(Math.random() * 334);
            $("#enemy1").css("left", 694);
            $("#enemy1").css("top", positionY);

        }

        if (impact4.length > 0) {

            points = points + 50;
            enemy2X = parseInt($("#enemy2").css("left"));
            enemy2Y = parseInt($("#enemy2").css("top"));
            $("#enemy2").remove();

            explosion2(enemy2X, enemy2Y);
            $("#shot").css("left", 950);

            reposEnemy2();

        }

        if (impact5.length > 0) {

            saved++;
            reposFriend();
            $("#friend").remove();
        }

        if (impact6.length > 0) {

            lost++;
            friendX = parseInt($("#friend").css("left"));
            friendY = parseInt($("#friend").css("top"));
            explosion3(friendX, friendY);
            $("#friend").remove();

            reposFriend();

        }

    }

    function explosion1(enemy1X, enemy1Y) {
        $("#background").append("<div id='explosion1'></div");
        $("#explosion1").css("background-image", "url(../game/imgs/explosao.png)");
        var div = $("#explosion1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({
            width: 200,
            opacity: 0
        }, "slow");

        var explosionTime = window.setInterval(cleanExplosion1, 1000);

        function cleanExplosion1() {

            div.remove();
            window.clearInterval(explosionTime);
            explosionTime = null;
        }
    }


    function explosion2(enemy2X, enemy2Y) {

        $("#background").append("<div id='explosion2'></div");
        $("#explosion2").css("background-image", "url(../game/imgs/explosao.png)");
        var div2 = $("#explosion2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({
            width: 200,
            opacity: 0
        }, "slow");

        var explosionTime2 = window.setInterval(cleanExplosion2, 1000);

        function cleanExplosion2() {

            div2.remove();
            window.clearInterval(explosionTime2);
            explosionTime2 = null;

        }
    }

    function explosion3(friendX, friendY) {
        $("#background").append("<div id='explosion3' class='anima4'></div");
        $("#explosion3").css("top", friendY);
        $("#explosion3").css("left", friendX);
        var explosionTime3 = window.setInterval(cleanExplosion3, 1000);

        function cleanExplosion3() {
            $("#explosion3").remove();
            window.clearInterval(explosionTime3);
            explosionTime3 = null;

        }

    }


    function reposEnemy2() {

        var timeImpact4 = window.setInterval(repos4, 5000);

        function repos4() {
            window.clearInterval(timeImpact4);
            timeImpact4 = null;

            if (end == false) {
                $("#background").append("<div id=enemy2></div");
            }
        }
    }

    function reposFriend() {

        var timeFriend = window.setInterval(repos6, 6000);

        function repos6() {
            window.clearInterval(timeFriend);
            timeFriend = null;

            if (end == false) {

                $("#background").append("<div id='friend' class='anima3'></div>");

            }

        }

    }

    function scoreboard() {
	
        $("#scoreboard").html("<h2> Pontos: " + points + " Salvos: " + saved + " Perdidos: " + lost + "</h2>");
        
    }

}