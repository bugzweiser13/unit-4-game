$(document).ready(function() {

    //player and enemy selection functions

    function tankSelection() {
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
                ap: 25,
                cap: 15,
            },
            {
                name: 'British',
                visual: 'assets/images/good_guys/british.jpg',
                hp: 110,
                ap: 15,
                cap: 35,
            },
            {
                name: 'Chinese',
                visual: 'assets/images/bad_guys/chinese.jpg',
                hp: 115,
                ap: 20,
                cap: 20,
            },
            {
                name: 'Russia',
                visual: 'assets/images/bad_guys/russia.jpg',
                hp: 120,
                ap: 20,
                cap: 30,
            },

        ];

        //select from array
        $.each(tanks, function(i, value) {
            var tankChoice = $("<button>")
            tankChoice.text(tanks[i]);
        });

        //player selection variables
        var playerSelect = $(".tank_selected");
        var playerSelect_hp = $("#pla_hp");

        //player selection data / image load
        $(".btn-tank").on("click", function() {
            var player = $(this).attr('value');
            console.log("Player var= " + player);

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

        });
    }

    function enemySelect() {
        //enemy data variables
        var enemies = [

            //tank information
            //hp = hit points
            //ap = attack power
            //cap = counter attack power

            {
                name: 'America',
                visual: 'assets/images/good_guys/america.jpg',
                hp: 125,
                ap: 25,
                cap: 15,
            },
            {
                name: 'British',
                visual: 'assets/images/good_guys/british.jpg',
                hp: 110,
                ap: 15,
                cap: 35,
            },
            {
                name: 'Chinese',
                visual: 'assets/images/bad_guys/chinese.jpg',
                hp: 115,
                ap: 20,
                cap: 20,
            },
            {
                name: 'Russia',
                visual: 'assets/images/bad_guys/russia.jpg',
                hp: 120,
                ap: 20,
                cap: 30,
            },

        ];

        //select from array
        $.each(enemies, function(i, value) {
            var enemyChoice = $("<button>")
            enemyChoice.text(enemies[i]);
        });

        //enemy selection varaiables
        var enemySelect = $(".enemy_selected");
        var enemySelect_hp = $("#opo_hp");

        //enemy selection data / image load
        $(".btn-choice").on("click", function() {
            var enemy = $(this).attr('value');
            console.log("Enemy var= " + enemy);

            enemySelect.attr(
                'src',
                enemies[enemy].visual,
            );
            enemySelect_hp.html(
                enemies[enemy].hp,
                console.log("HP: " + enemies[enemy].hp),
                console.log("AP: " + enemies[enemy].ap),
                console.log("CAP: " + enemies[enemy].cap)
            );

        });
    }


    //game run code
    tankSelection();
    enemySelect();
})