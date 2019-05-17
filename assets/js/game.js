$(document).ready(function() {

    //Global Variables

    var shot = new Audio("assets/sounds/shot.wav");
    var lose = new Audio("assets/sounds/lose.mp3")

    //tank data variables
    var tanks = [

        //tank information
        //hp = hit points
        //ap = attack power
        //cap = counter attack power

        {
            name: 'America',
            visual: 'assets/images/good_guys/america.jpg',
            hp: 125,
            ap: (Math.floor(Math.random() * 20) + 1),
            cap: (Math.floor(Math.random() * 25) + 1),
        },
        {
            name: 'British',
            visual: 'assets/images/good_guys/british.jpg',
            hp: 110,
            ap: (Math.floor(Math.random() * 25) + 1),
            cap: (Math.floor(Math.random() * 30) + 1),
        },
        {
            name: 'Chinese',
            visual: 'assets/images/bad_guys/chinese.jpg',
            hp: 115,
            ap: (Math.floor(Math.random() * 20) + 1),
            cap: (Math.floor(Math.random() * 25) + 1),
        },
        {
            name: 'Russia',
            visual: 'assets/images/bad_guys/russia.jpg',
            hp: 120,
            ap: (Math.floor(Math.random() * 25) + 1),
            cap: (Math.floor(Math.random() * 30) + 1),
        },

    ];

    //select player from array
    $.each(tanks, function(i, value) {
        var tankChoice = $("<button>")
        tankChoice.text(tanks[i]);
    });

    //player selection variables
    var playerSelect = $(".tank_selected");
    var playerSelect_ap = $(".pla_ap");
    var playerName = $("#pla");
    var playerTank_hp = [];
    var playerTank_ap = [];
    var playerTank_cap = [];

    //select enemy from array
    $.each(tanks, function(i, value) {
        var enemyChoice = $("<button>")
        enemyChoice.text(tanks[i]);
    });

    //enemy selection varaiables
    var enemySelect = $(".enemy_selected");
    var enemySelect_cap = $(".opo_cap");
    var enemyName = $("#opo");
    var enemyTank_hp = [];
    var enemyTank_ap = [];
    var enemyTank_cap = [];

    //function tankSelection() {
    function playerSelection() {
        //player selection data / image load
        $(".btn-player").on("click", function() {
            var player = $(this).attr('value');
            //debugging console log
            console.log("Player Value= " + player);
            var hidePlayer = $("#" + [player]);
            var hideEnemy = $("#" + [player] + "-" + [player]);

            //page loads, player information
            //player tank selection
            playerSelect.attr(
                'src',
                tanks[player].visual,
            );
            //player hp
            playerSelect_ap.html(
                tanks[player].ap,
            );
            //player name display
            playerName.html(
                tanks[player].name,
                //debugging console log
                console.log("Name is: " + tanks[player].name),
            );

            //player attribute push to outside array
            playerTank_hp.push(
                tanks[player].hp,
            );
            playerTank_ap.push(
                tanks[player].ap,
            );
            playerTank_cap.push(
                tanks[player].cap,
            );

            //hide player choice (and remove from enemy list) when selected
            hidePlayer.animate({
                opacity: "0.02"
            });
            hideEnemy.animate({
                opacity: "0.02"
            });
            $(".btn-player").attr("disabled", "disabled");
            $(".pla_hp").html(tanks[player].hp);
            //debugging console log
            console.log("Player HP: " + tanks[player].hp);
        });

    }

    function enemySelection() {
        //enemy selection data / image load
        $(".btn-enemy").on("click", function() {
            $(".btn-enemy").attr("disabled");
            var enemy = $(this).attr('value');
            //debugging console log
            console.log("Enemy Value= " + enemy);
            //tank hide variables
            var hideEnemy = $("#" + [enemy] + "-" + [enemy]);
            var hidePlayer = $("#" + [enemy]);

            //page loads, enemy information
            enemySelect.attr(
                'src',
                tanks[enemy].visual,
            );
            enemySelect_cap.html(
                tanks[enemy].cap,
            );
            enemyName.html(
                tanks[enemy].name,
                //debugging console log
                console.log("Name is: " + tanks[enemy].name),
            );
            enemyTank_hp.push(
                tanks[enemy].hp,
            );
            enemyTank_ap.push(
                tanks[enemy].ap,
            );
            enemyTank_cap.push(
                tanks[enemy].cap,
            );
            hideEnemy.animate({
                opacity: "0.02"
            });
            hidePlayer.animate({
                opacity: "0.02"
            });
            $(".btn-enemy").attr("disabled", "disabled");
            $(".opo_hp").html(tanks[enemy].hp);
            //debugging console log
            console.log("Enemy HP: " + tanks[enemy].hp);
        });
    }
    // playerSelection();
    // enemySelection();
    //}

    //add win or loss functions
    function addWin() {
        var win = 0
        win++
        $(".win").html(win)
    }

    function addLoss() {
        var loss = 0
        loss++
        $(".loss").html(loss)
    }

    //attack function
    function attack() {
        $("#btn-attack").on("click", function() {
            //tank shot wav
            shot.play();
            console.log(enemyTank_hp + " " + playerTank_ap);

            //base hp reduction math set point
            var enemyResult = 0
            var playerResult = 0

            //initial player attack against enemy
            enemyResult = (enemyTank_hp - playerTank_ap);
            enemyTank_hp = enemyResult

            //enemy counter attack
            playerResult = (playerTank_hp - enemyTank_cap);
            playerTank_hp = playerResult

            //win / lose alert and tally
            if (playerResult <= 0) {
                //window.alert("Player Loses!!!");
                $("#win_lose").html("<p style='text-shadow: 2px 2px #ff0000;'>GAME OVER!!!</p>");
                $("#btn-attack").off("click");
                addLoss();
                lose.play();
                setTimeout(function() { location.reload(); }, 5000);

            };
            if (enemyResult <= 0) {
                //window.alert("Player Wins!!!");
                $("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>You Win Select Again</p>");
                addWin();
                enemySelection();

            } else(playerResult, enemyResult <= 0); {
                //window.alert("Player Wins!!!");
                $("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>TIE</p>");
                addWin();
                enemySelection();
            };

            //player's current HP value html push
            $(".pla_hp").html(playerResult);
            //enemy's current HP value html push
            $(".opo_hp").html(enemyResult);

            //debugging console log
            console.log("Player HP: " + playerResult);
            console.log("Enemy HP: " + enemyResult);
            console.log("Player AP: " + playerTank_ap);
            console.log("Enemy CAP: " + enemyTank_cap);
        });
    }
    //game run code
    playerSelection();
    enemySelection();
    //tankSelection();
    attack();





    //enemySelect();
    //attackCommand();
})