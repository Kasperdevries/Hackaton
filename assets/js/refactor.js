/**
 * Created by Kasper on 29-4-2017.
 */
var mainState = {
    preload: function() {
        game.load.image('sky', 'assets/img/sky.png');
        game.load.image('ground', 'assets/img/ground (2).png');
        game.load.image('star', 'assets/img/star.png');
        game.load.spritesheet('dude', 'assets/img/stijn.png', 32, 48);
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        game.world.enableBody = true;

        this.cursor = game.input.keyboard.createCursorKeys();

            // Create Level
        ground = game.add.group();

        var level = [
            '                         ',
            '                         ',
            '              x          ',
            '           xxxxxxx       ',
            '           x             ',
            '           x             ',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            '                        x',
            'xxxxxxxxxxxxxxxx        x',
        ];

        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // // Create a wall and add it to the 'walls' group
                // if (level[i][j] == 'x') {
                //     var cube = game.add.sprite(60+40*j, 60+40*i, 'ground');
                //     this.ground.create(cube);
                //     cube.body.immovable = true;
                // }

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var cube = game.add.sprite(32*j, 32*i, 'ground');
                    ground.create(cube);
                    cube.body.immovable = true;
                }
            }
        }


            // Create Player
        player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    update: function() {
        // Here we update the game 60 times per second

        //  Collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, this.ground);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (this.cursor.left.isDown){
            //  Move to the left
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (this.cursor.right.isDown) {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else{
            //  Stand still
            player.animations.stop();
            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (this.cursor.up.isDown && player.body.touching.down && hitPlatform){
            player.body.velocity.y = -300;
        }
    }
};

// Initialize the game and start our state
var game = new Phaser.Game(800, 608);
game.state.add('main', mainState);
game.state.start('main');