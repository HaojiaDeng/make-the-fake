class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.cutsceneOver = false
    }

    preload() {
        this.load.image('map', './assets/map.png')
        this.load.image('stand', './assets/stand2.png')
        this.load.image('down', './assets/down.png')
        this.load.image('enemy', './assets/enemy.png')
        this.load.image('enemy2', './assets/enemy2.png')
        this.load.audio('spot','./assets/explosion.wav')
        this.load.image('barrier','./assets/barrier.png')
        this.load.image('tower','./assets/tower3.png')
        this.load.image('tent','./assets/tent.png')
        this.load.image('campfire','./assets/campfire.png')
        this.load.image('tent2','./assets/tent2.png')
        this.load.image('jeep','./assets/jeep.png')
        this.load.image('smoke','./assets/smoke.png')
        this.load.image('smoke2','./assets/smoke2.png')
        this.load.image('tree','./assets/tree1.png')
        this.load.image('log','./assets/log.png')
        this.load.audio('footstep','./assets/footstep.mp3')
        this.load.image('exit','./assets/exit.png')
        
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 720, 'map').setOrigin(0, 0);
        this.player = new Player(this, 30, 360).setOrigin(0, 0).setScale(2)
        this.physics.world.setBounds(0, 0, 1280, 720)
        this.cameras.main.setBounds(0, 0, 1280, 720)
        this.add.image(640, 0, 'barrier').setOrigin(0.5, 0)
        this.add.image(640, 675, 'barrier').setOrigin(0.5, 0)
        this.tower1 = new tower(this, 70, 480, 'tower')
        this.tower1.setOrigin(0.5, 0).setScale(0.4)
        this.tower2 = new tower(this, 70, 100, 'tower')
        this.tower2.setOrigin(0.5, 0).setScale(0.4)
        this.tower3 = new tower(this, 1100, 40, 'tower')
        this.tower3.setOrigin(0.5, 0).setScale(0.4)
        // collider FAILED!
        this.physics.add.collider(this.player, this.tower1)
        this.physics.add.collider(this.player, this.tower2)
        this.tent1 = new tent(this, 600, 430, 'tent')
        this.tent1.setOrigin(0.5, 0).setScale(2)
        this.tent2 = new tent(this, 600, 330, 'tent')
        this.tent2.setOrigin(0.5, 0).setScale(2)
        this.physics.add.collider(this.player, this.tent1)
        this.physics.add.collider(this.player, this.tent2)
        this.add.image(500,450,'campfire').setOrigin(0.5, 0).setScale(2.0)
        this.tree1 = new tree(this, 720, 330, 'tree')
        this.tree1.setOrigin(0.5, 0).setScale(2)
        this.physics.add.collider(this.player, this.tree1)
        
        this.tree3 = new tree(this, 820, 330, 'tree')
        this.tree3.setOrigin(0.5, 0).setScale(2)
        this.physics.add.collider(this.player, this.tree3)
        this.tree4 = new tree(this, 920, 330, 'tree')
        this.tree4.setOrigin(0.5, 0).setScale(2)
        this.physics.add.collider(this.player, this.tree4)
        this.jeep1 = new jeep(this, 880, 90, 'jeep')
        this.physics.add.collider(this.player, this.jeep1)
        this.jeep1.setOrigin(0.5, 0).setScale(1.7)
        this.jeep2 = new jeep(this, 720, 90, 'jeep')
        this.physics.add.collider(this.player, this.jeep2)
        this.jeep2.setOrigin(0.5, 0).setScale(1.7)

        this.log1 = new log(this, 1030, 330, 'log')
        this.physics.add.collider(this.player, this.log1)
        this.log2 = new log(this, 1150, 430, 'log')
        this.physics.add.collider(this.player, this.log2)

        this.StationaryEnemy1 = new StationaryEnemy(this,530,400,'smoke2')
        this.StationaryEnemy2 = new StationaryEnemy(this,1050,60,'smoke2')
        this.enemy1 = new Enemy(this, 150, 100, 100, 500)
        this.enemy2 = new Enemy(this, 1040, 500, 1040, 1200)
        this.enemy3 = new Enemy(this, 100, 640, 100, 350)
        this.exit = new Exit(this,1250,360,'exit')

        //narrativeText
        this.narrativeText = this.add.text(100, 240, 'I need to get to the exit quietly.', {
            fontSize: '16px',
            fill: '#FFFFFF',
            padding: { x: 10, y: 5 },
            wordWrap: { width: 800 }
        }).setScrollFactor(0).setDepth(30)
        
    
         //Cutscene
        this.cameras.main.pan(this.physics.world.bounds.width, 360, 10000, 'Power2', true, (camera, progress) => {
            if (progress === 1) {
                this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
                this.cutsceneOver = true
                this.narrativeText.setVisible(false)
                this.player.statusText.setVisible(true)
                this.player.statusText.setDepth(10)
                this.player.startTextAnimation()
            }
        })
    
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
    
        // Create an empty group to store enemies
        this.enemies = this.add.group()
        this.gameOver = false
    }
    

    update() {
        // update player and enemy states
        if (!this.gameOver && !this.success && this.cutsceneOver) {
            this.player.update()
            this.enemy1.update()
            this.enemy2.update()
            this.enemy3.update()
    
            //condition
            const exitDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exit.x, this.exit.y);
            if (exitDistance <= 75) {
                this.success = true
                this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Congrats!\nPress (R) to Restart or (B) to get to Menu', {
                    fontSize: '16px'
                }).setOrigin(0.5).setScrollFactor(0)
            } else {
                // Check if the player is detected by any enemy
                this.checkEnemiesDetection()
            }
        } 
    
        // Regardless of the game state, handle player input for restart or return to menu
        this.handleInput()
    }
    
    // Method to check if the player is detected by any enemy
    checkEnemiesDetection() {
        let enemies = [this.StationaryEnemy1, this.StationaryEnemy2, this.enemy1, this.enemy2, this.enemy3]
        enemies.forEach((enemy) => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y)
            const detectionRange = this.player.isCrouching ? 60 : 150
            if (distance < detectionRange) {
                this.triggerGameOver()
                return
            }
        })
    }
    
    // Method to handle the game over logic
// Method to handle the game over logic
triggerGameOver() {
    this.gameOver = true;
    this.sound.play('spot');
    let spottedText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You have been spotted!', {
        fontSize: '48px',
        fill: '#FF0000',
        fontStyle: 'bold'
    }).setOrigin(0.5).setScrollFactor(0)

  
    this.tweens.add({
        targets: spottedText,
        x: { from: this.cameras.main.centerX - 200, to: this.cameras.main.centerX },
        y: { from: this.cameras.main.centerY - 200, to: this.cameras.main.centerY },
        scale: { start: 0, from: 0.5, to: 1 },
        angle: 360,
        duration: 2000,
        ease: 'Cubic.easeOut',
    })
    let restartText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 60, 'Press (R) to Restart or (B) to get to Menu', {
        fontSize: '16px',
        fill: '#FFFFFF'
    }).setOrigin(0.5).setScrollFactor(0)
}

    
    // Method to handle player input for restarting or returning to the menu
    handleInput() {
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.scene.restart()
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
            this.scene.start('menuScene')
        }
    }
    
}    
