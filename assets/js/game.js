$(document).ready(function() {

    //global variables
    //audio Variables
    var shot = new Audio("assets/sounds/shot.wav");
    var lose = new Audio("assets/sounds/lose.mp3")


    var tanks = [

        //tank information
        //hp = hit points
        //ap = attack power
        //cap = counter attack power

        {
            name: 'America',
            visual: 'assets/images/good_guys/america.jpg',
            hp: 125,
            ap: (Math.floor(Math.random() * 40) + 10),
            cap: (Math.floor(Math.random() * 50) + 1),
        },
        {
            name: 'British',
            visual: 'assets/images/good_guys/british.jpg',
            hp: 110,
            ap: (Math.floor(Math.random() * 45) + 10),
            cap: (Math.floor(Math.random() * 55) + 1),
        },
        {
            name: 'Chinese',
            visual: 'assets/images/bad_guys/chinese.jpg',
            hp: 115,
            ap: (Math.floor(Math.random() * 40) + 10),
            cap: (Math.floor(Math.random() * 50) + 1),
        },
        {
            name: 'Russia',
            visual: 'assets/images/bad_guys/russia.jpg',
            hp: 120,
            ap: (Math.floor(Math.random() * 45) + 10),
            cap: (Math.floor(Math.random() * 50) + 1),
        },
        {
            name: 'Player',
            visual: 'assets/images/good_guys/player.jpg',
            hp: "000",
            ap: "AP",
            cap: "CAP",
        },
        {
            name: 'Enemy',
            visual: 'assets/images/bad_guys/enemy.jpg',
            hp: "000",
            ap: "AP",
            cap: "CAP",
        },
    ];

    //player selection variables
    var playerSelect = $(".tank_selected");
    var playerSelect_ap = $(".pla_ap");
    var playerName = $("#pla");

    //enemy selection varaiables
    var enemySelect = $(".enemy_selected");
    var enemySelect_cap = $(".opo_cap");
    var enemyName = $("#opo");

    var unHideTanks = [0, 1, 2, 3, 4, 5];

    //win / loss tallies
    var winNum = 0
    var lossNum = 0

    function addWin() {
        winNum++
        $(".win").html(winNum);
    }

    function addLoss() {
        lossNum++
        $(".loss").html(lossNum);
    }

    //battle reset after defeat
    function lossReload() {
        //show hidden tanks from selections
        for (var i = 0; i < unHideTanks.length; i++) {
            var hiddenPla = $("#" + (unHideTanks[i]));
            var hiddenEne = $("#" + [unHideTanks[i]] + "-" + [unHideTanks[i]]);
            //unhide hidden selections
            hiddenPla.animate({
                opacity: "1.0"
            });
            hiddenEne.animate({
                opacity: "1.0"
            });
        }
        //remove win / loss banner
        $("#win_lose").html("<p></p>");

        //player avatar reset
        playerSelect.attr(
            'src',
            tanks[4].visual,
        );
        //player ap
        playerSelect_ap.html(
            tanks[4].ap,
        );
        //player name display
        playerName.html(
            tanks[4].name,
        );
        //enemy avatar reset
        enemySelect.attr(
            'src',
            tanks[5].visual,
        );
        //player hp
        enemySelect_cap.html(
            tanks[5].cap,
        );
        //player name display
        enemyName.html(
            tanks[5].name,
        );
        $(".pla_hp").html(tanks[4].hp);
        $(".opo_hp").html(tanks[5].hp);
        allSelection();
        attack();
        return false;
    }

    function allSelection() {

        //player selection html load
        $(".btn-player").on("click", function() {
            var player = $(this).attr('value');

            //player / enemy fade (hide) variables
            var hidePlayer = $("#" + [player]);
            var hideEnemy = $("#" + [player] + "-" + [player]);

            //player tank selection
            playerSelect.attr(
                'src',
                tanks[player].visual,
            );
            //player ap
            playerSelect_ap.html(
                tanks[player].ap,
            );
            //player name display
            playerName.html(
                tanks[player].name,
            );
            //hide player choice (and remove from enemy list) when selected
            hidePlayer.animate({
                opacity: "0.02"
            });
            hideEnemy.animate({
                opacity: "0.02"
            });
        });

        //enemy selection html loads
        $(".btn-enemy").on("click", function() {
            //$(".btn-enemy").attr("disabled");
            var enemy = $(this).attr('value');
            //player / enemy fade (hide) variables
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
            );
            //hide enemy choice (and remove from player list) when selected
            hideEnemy.animate({
                opacity: "0.02"
            });
            hidePlayer.animate({
                opacity: "0.02"
            });
        });
    }

    //attack function
    function attack() {
        $(".btn-player").on("click", function() {
            var player = $(this).attr('value');

            var plHp = tanks[player].hp;
            var plAp = tanks[player].ap;
            var plCap = tanks[player].cap;

            $(".pla_hp").html(tanks[player].hp);

            console.log("Attack Function HP(player)= " + plHp)
            console.log("Attack Function AP(player)= " + plAp)
            console.log("Attack Function CAP(player)= " + plCap)

            $(".btn-enemy").on("click", function() {
                //$(".btn-enemy").attr("disabled");
                var enemy = $(this).attr('value');

                var enHp = tanks[enemy].hp;
                var enAp = tanks[enemy].ap;
                var enCap = tanks[enemy].cap;

                $(".opo_hp").html(tanks[enemy].hp);

                console.log("Attack Function HP(enemy)= " + enHp)
                console.log("Attack Function AP(enemy)= " + enAp)
                console.log("Attack Function CAP(enemy)= " + enCap)

                $('btn-attack').attr("disabled");
                $("#btn-attack").on("click", function() {
                    //tank shot wav
                    shot.play();

                    //base hp reduction math set point
                    var enemyResult = 0
                    var playerResult = 0

                    //debugging / value verification
                    //console.log(enemyTank_hp + " " + playerTank_ap);

                    //initial player attack against enemy
                    enemyResult = (enHp - plAp);
                    enHp = enemyResult
                        //enemyResult = (enemyTank_hp - playerTank_ap);
                        //enemyTank_hp = enemyResult

                    //enemy counter attack
                    playerResult = (plHp - enCap);
                    plHp = playerResult
                        //playerResult = (playerTank_hp - enemyTank_cap);
                        //playerTank_hp = playerResult

                    //attack debugging
                    console.log(this);
                    console.log("enHp: " + enHp);
                    console.log("plAp: " + plAp);
                    console.log("enemyResult: " + enemyResult);
                    console.log("plHp: " + plHp);
                    console.log("enCap: " + enCap);
                    console.log("playerResult: " + playerResult);


                    //win / lose alert and tally
                    //loss
                    if (playerResult <= 0 && enemyResult > 0) {
                        addLoss();
                        lose.play();
                        loss();
                    }

                    //win
                    else if (enemyResult <= 0 && playerResult > 0) {
                        $('btn-attack').attr("disabled", "disabled");
                        addWin();
                        win();
                    }

                    //tie
                    else if (playerResult <= 0 && enemyResult <= 0) {
                        tie();
                    };

                    //player's current HP value html push
                    $(".pla_hp").html(playerResult);
                    //enemy's current HP value html push
                    $(".opo_hp").html(enemyResult);

                    //debugging console log
                    //console.log("Player HP(2): " + playerResult);
                    //console.log("Enemy HP(2): " + enemyResult);
                    //console.log("Player AP(2): " + playerTank_ap);
                    //console.log("Enemy CAP(2): " + enemyTank_cap);
                });
            });
        });
    }
    //game run code

    function loss() {
        $("#win_lose").html("<p style='text-shadow: 2px 2px #ff0000;'>GAME OVER!!!</p>");
        //$("#btn-attack").off("click");
        //setTimeout(function() { location.reload(); }, 5000);
        setTimeout(function() { lossReload(); }, 5000);
    }

    function tie() {
        $("#win_lose").html("<p style='text-shadow: 2px 2px #ff0000;'>There was a TIE!!!</p>");
        setTimeout(function() { lossReload(); }, 5000);
    }

    function win() {
        //window.alert("Player Wins!!!");
        //$("#btn-attack").attr("disabled", "disabled");
        $(".btn-player").attr("disabled", "disabled");
        $("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>You WIN, Select Again</p>");
        //allSelection();
        attack();

    }

    allSelection();
    //enemySelection();
    attack();

    //console.log("Enemy HP: " + enemyTank_hp);
    //console.log("Enemy AP: " + enemyTank_ap);
    //console.log("Enemy CAP: " + enemyTank_cap);
    //console.log("Player HP: " + enemyTank_hp);
    //console.log("Player AP: " + playerTank_ap);
    //console.log("Player AP: " + playerTank_cap);

})