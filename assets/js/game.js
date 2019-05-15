$(document).ready(function() {

    //Global Variables
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
            ap: 20,
            cap: 15,
        },
        {
            name: 'British',
            visual: 'assets/images/good_guys/british.jpg',
            hp: 110,
            ap: 10,
            cap: 35,
        },
        {
            name: 'Chinese',
            visual: 'assets/images/bad_guys/chinese.jpg',
            hp: 115,
            ap: 10,
            cap: 25,
        },
        {
            name: 'Russia',
            visual: 'assets/images/bad_guys/russia.jpg',
            hp: 120,
            ap: 20,
            cap: 30,
        },

    ];

    //select player from array
    $.each(tanks, function(i, value) {
        var tankChoice = $("<button>")
        tankChoice.text(tanks[i]);
    });

    //player selection variables
    var playerSelect = $(".tank_selected");
    var playerSelect_hp = $(".pla_hp");
    var playerName = $("#pla");

    //select enemy from array
    $.each(tanks, function(i, value) {
        var enemyChoice = $("<button>")
        enemyChoice.text(tanks[i]);
    });

    //enemy selection varaiables
    var enemySelect = $(".enemy_selected");
    var enemySelect_hp = $(".opo_hp");
    var enemyName = $("#opo");

    function tankSelection() {
        function playerSelection() {
            //player selection variables
            //var playerSelect = $(".tank_selected");
            //var playerSelect_hp = $(".pla_hp");
            //var playerName = $("#pla");

            //select player from array
            //$.each(tanks, function(i, value) {
            //    var tankChoice = $("<button>")
            //    tankChoice.text(tanks[i]);
            //});

            //player selection data / image load
            $(".btn-tank").on("click", function() {
                var player = $(this).attr('value');
                console.log("Player var= " + player);
                var hidePlayer = $("#" + [player])
                playerSelect.attr(
                    'src',
                    tanks[player].visual,
                );
                playerSelect_hp.html(
                    tanks[player].hp,
                    console.log("HP: " + tanks[player].hp),
                    console.log("AP: " + tanks[player].ap),
                    console.log("CAP: " + tanks[player].cap)
                );
                playerName.html(
                    tanks[player].name,
                    console.log("Name is: " + tanks[player].name),
                );
                hidePlayer.animate({
                    opacity: "0.02"
                });

            });
        }

        function enemySelection() {
            //select enemy from array
            //$.each(tanks, function(i, value) {
            //    var enemyChoice = $("<button>")
            //    enemyChoice.text(tanks[i]);
            //});

            //enemy selection data / image load
            $(".btn-choice").on("click", function() {
                var enemy = $(this).attr('value');
                var hideEnemy = $("#" + [enemy])
                console.log("Enemy var= " + enemy);

                enemySelect.attr(
                    'src',
                    tanks[enemy].visual,
                );
                enemySelect_hp.html(
                    tanks[enemy].hp,
                    console.log("HP: " + tanks[enemy].hp),
                    console.log("AP: " + tanks[enemy].ap),
                    console.log("CAP: " + tanks[enemy].cap)
                );
                enemyName.html(
                    tanks[enemy].name,
                    console.log("Name is: " + tanks[enemy].name),
                );
                hideEnemy.animate({
                    opacity: "0.02"
                });

            });
        }
        playerSelection();
        enemySelection();
    }

    //attack command
    function attack() {
        $("#btn-attack").on("click", function() {
            //random number generator from button click
            //var attackRandom = Math.floor(Math.random() * 20) + 1;
            var attackRandom1 = (tanks[player].hp-- - tanks[enemy].ap);
            console.log("The Attack Button Has Been Clicked: " + attackRandom1);

        });
    }
    //game run code

    tankSelection();
    //enemySelect();
    attack();
})