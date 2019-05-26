$(document).ready(function() {

    //global variables
    //audio Variables
    var shot = new Audio("assets/sounds/shot.wav");
    var lose = new Audio("assets/sounds/lose.mp3");
    var streakSound = new Audio("assets/sounds/streak.mp3");

    var tanks = [

        //tank information
        //hp = hit points
        //ap = attack power
        //cap = counter attack power

        {
            name: 'America',
            visual: 'assets/images/good_guys/america.jpg',
            hp: 125,
            ap: (Math.floor(Math.random() * 35) + 5),
            cap: (Math.floor(Math.random() * 30) + 5),
        },
        {
            name: 'British',
            visual: 'assets/images/good_guys/british.jpg',
            hp: 110,
            ap: (Math.floor(Math.random() * 40) + 5),
            cap: (Math.floor(Math.random() * 35) + 5),
        },
        {
            name: 'Chinese',
            visual: 'assets/images/bad_guys/chinese.jpg',
            hp: 115,
            ap: (Math.floor(Math.random() * 35) + 5),
            cap: (Math.floor(Math.random() * 30) + 5),
        },
        {
            name: 'Russia',
            visual: 'assets/images/bad_guys/russia.jpg',
            hp: 120,
            ap: (Math.floor(Math.random() * 40) + 5),
            cap: (Math.floor(Math.random() * 35) + 5),
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
    var player;
    var plAp;
    var plHp;

    //enemy selection varaiables
    var enemySelect = $(".enemy_selected");
    var enemySelect_cap = $(".opo_cap");
    var enemyName = $("#opo");
    var enemy;
    var enHp;
    var enCap;

    //array to help unhide used tanks
    var unHideTanks = [0, 1, 2, 3, 4, 5];

    //win / loss tallies
    var winNum = 0;
    var lossNum = 0;
    var tieNum = 0;
    var streak = 0;

    function addWin() {
        winNum++
        streak++

        //streak debugging
        console.log("streak= " + streak);

        $(".win").text(winNum);
        battleWin();
    }

    function addLoss() {
        lossNum++
        $(".loss").text(lossNum);
        battleLoss();
    }

    function addTie() {
        tieNum++
        $(".tie").text(tieNum);
        battleTie();
    }

    //player selection html load / hide
    $(".btn-player").on("click", function() {
        player = $(this).attr('value');

        plHp = tanks[player].hp;
        plAp = tanks[player].ap;
        //var plCap = tanks[player].cap;

        //player button debugging
        //console.log(this);

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
        //player scoreboard HP projection
        $(".pla_hp").html(tanks[player].hp);
    });

    //enemy selection html load / hide
    $(".btn-enemy").on("click", function() {
        enemy = $(this).attr('value');

        enHp = tanks[enemy].hp;
        //var enAp = tanks[enemy].ap;
        enCap = tanks[enemy].cap;

        //enemy button debugging
        //console.log(this);

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
        //enemy HP scoreboard prjection
        $(".opo_hp").html(tanks[enemy].hp);
    });

    //battle attack commands
    $("#btn-attack").on("click", function() {

        //tank shot wav
        shot.play();

        //base hp reduction math set point
        var enemyResult = 0
        var playerResult = 0

        //initial player attack against enemy
        enemyResult = (enHp - plAp);
        enHp = enemyResult

        //enemy counter attack
        playerResult = (plHp - enCap);
        plHp = playerResult

        //repeats upon attack click until either val falls to 0 or below

        //attack debugging
        //console.log(this);
        //console.log("enHp: " + enHp);
        //console.log("plAp: " + plAp);
        //console.log("enemyResult: " + enemyResult);
        //console.log("plHp: " + plHp);
        //console.log("enCap: " + enCap);
        //console.log("playerResult: " + playerResult);


        //win / lose alert and tally
        //loss
        if (playerResult <= 0 && enemyResult > 0) {
            $('.btn-player').prop("disabled", true);
            $('.btn-enemy').prop("disabled", true);
            $('#btn-attack').attr("disabled", "disabled");
            lose.play();
            addLoss();
        }

        //win
        else if (enemyResult <= 0 && playerResult > 0) {
            $('#btn-attack').attr("disabled", "disabled");
            $('.btn-player').prop("disabled", true);
            addWin();
        }

        //tie
        else if (playerResult <= 0 && enemyResult <= 0) {
            $('#btn-attack').attr("disabled", "disabled");
            addTie();
        };

        //player's current HP value html push
        $(".pla_hp").html(playerResult);
        //enemy's current HP value html push
        $(".opo_hp").html(enemyResult);
    });

    //battle outcome functions
    function battleLoss() {
        $("#win_lose").html("<p style='text-shadow: 2px 2px #ff0000;'>GAME OVER!!!</p>");
        setTimeout(function() {
            $('#btn-attack').prop("disabled", true);
            reload();
        }, 5000);
    }

    function battleTie() {
        $("#win_lose").html("<p style='text-shadow: 2px 2px #ff0000;'>There was a TIE!!!</p>");
        setTimeout(function() {
            $('#btn-attack').prop("disabled", true);
            reload();
        }, 5000);
    }

    function battleWin() {
        if (streak >= 3) {
            $("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>YOU ARE THE CHAMPION!!!</p>");
            streakSound.play();

            //reset scoreboard HP
            setTimeout(function() {
                //$("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>YOU ARE THE CHAMPION!!!</p>");
                $('#btn-attack').prop("disabled", false);
                $(".pla_hp").html(tanks[4].hp);
                $(".opo_hp").html(tanks[5].hp);
            }, 2500);
            $("#win_lose").empty();
            reload();
        } else {
            $("#win_lose").html("<p style='text-shadow: 2px 2px #01ff2b;'>You WIN, Select Again</p>");

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
            setTimeout(function() {
                $("#win_lose").empty();
                $('#btn-attack').prop("disabled", false);
            }, 2500);
        }

    }

    //battle reset after defeat
    function reload() {

        //show hidden tanks from previouse selections
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
        $("#win_lose").empty();
        streak = 0;
        plHp = 0;
        enCap = 0;

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

        //reset scoreboard HP
        $(".pla_hp").html(tanks[4].hp);
        $(".opo_hp").html(tanks[5].hp);

        //enable buttons
        $('#btn-attack').prop("disabled", false);
        $('.btn-player').prop("disabled", false);
        $('.btn-enemy').prop("disabled", false);

    }
})