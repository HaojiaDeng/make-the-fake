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
        this.load.atlas('flares', 'assets/flare.png', 'assets/flare.json')
    }

    create() {
        this.add.tileSprite(0, 0, 1280, 720, 'map').setOrigin(0, 0)
        //add player
        this.player = new Player(this, 30, 360).setOrigin(0, 0).setScale(2)
        this.physics.world.setBounds(0, 0, 1280, 720)
        this.cameras.main.setBounds(0, 0, 1280, 720)
        //add images
        this.add.image(640, 0, 'barrier').setOrigin(0.5, 0)
        this.add.image(640, 675, 'barrier').setOrigin(0.5, 0)
        this.add.image(500,500,'campfire')
        
        this.tower1 = this.physics.add.staticSprite(70, 480, 'tower').setOrigin(0.5, 0).setScale(0.4)
        this.tower2 = this.physics.add.staticSprite(70, 100, 'tower').setOrigin(0.5, 0).setScale(0.4)
        this.tower3 = this.physics.add.staticSprite(1100, 40, 'tower').setOrigin(0.5, 0).setScale(0.4)
        this.tent1 = this.physics.add.staticSprite(600, 430, 'tent').setOrigin(0.5, 0).setScale(2).setOffset(0,70)
        this.tent2 = this.physics.add.staticSprite(600, 330, 'tent').setOrigin(0.5, 0).setScale(2).setOffset(0,70)
        this.tree1 = this.physics.add.staticSprite(720, 330, 'tree').setOrigin(0.5, 0).setScale(2).setOffset(0,140)
        this.tree3 = this.physics.add.staticSprite(820, 330, 'tree').setOrigin(0.5, 0).setScale(2).setOffset(0,140)
        this.tree4 = this.physics.add.staticSprite(920, 330, 'tree').setOrigin(0.5, 0).setScale(2).setOffset(0,140)
        this.log1 = this.physics.add.staticSprite(1030, 330, 'log').setOrigin(0.5, 0).setScale(1.3).setOffset(0,50)
        this.log2 = this.physics.add.staticSprite(1150, 430, 'log').setOrigin(0.5, 0).setScale(1.3).setOffset(0,50)
        this.jeep1 = this.physics.add.staticSprite(880, 90, 'jeep').setOrigin(0.5, 0).setScale(1.3).setOffset(0,35)
        this.jeep2 = this.physics.add.staticSprite(720, 90, 'jeep').setOrigin(0.5, 0).setScale(1.3).setOffset(0,35)
        this.physics.add.collider(this.player, [this.tower3, this.tent1, this.tent2, this.tree1, this.tree3, this.tree4, this.log1, this.log2, this.jeep1, this.jeep2])
        //particle effect
        this.particles = this.add.particles('flare')
        const flame = this.add.particles(495, 500, 'flares',
            {
            color: [ 0x040d61, 0xfacc22, 0xf89800, 0xf83600, 0x9f0404, 0x4b4a4f, 0x353438, 0x040404 ],
            lifespan: 1500,
            angle: { min: -90, max: -50 },
            scale: 0.75,
            speed: { min: 10, max: 30 },
            advance: 2000,
            blendMode: 'ADD'
            })
        //adding enemies
        this.StationaryEnemy1 = new StationaryEnemy(this,530,400,'smoke2')
        this.StationaryEnemy2 = new StationaryEnemy(this,1050,60,'smoke2')
        this.enemy1 = new Enemy(this, 150, 100, 100, 500)
        this.enemy2 = new Enemy(this, 1040, 500, 1040, 1200)
        this.enemy3 = new Enemy(this, 100, 640, 100, 350)
        this.exit = new Exit(this,1250,360,'exit')

        //narrativeText
        this.narrativeText = this.add.text(100, 240, 'I need to get to that red flag quietly.', {
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


        // timer
        this.timeText = this.add.text(450, 16, 'Time: 90', {
            fontSize: '32px',
            fill: '#000'
        }).setScrollFactor(0).setDepth(30)
        this.initialTime = 90
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        })
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
            const exitDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exit.x, this.exit.y)
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
            const detectionRange = this.player.isCrouching ? 60 : 110
            if (distance < detectionRange) {
                this.triggerGameOver()
                return
            }
        })
    }
    // Method to handle the game over logic
    triggerGameOver() {
        this.gameOver = true
        this.sound.play('spot')
        let spottedText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'You have been spotted!', {
            fontSize: '48px',
            fill: '#FF0000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0)

    //text animation
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

    
    // keys for restarting or returning to the menu
    handleInput() {
        if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
            this.scene.restart()
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyB)) {
            this.scene.start('menuScene')
        }
    }


    updateTimer() {
        this.initialTime -= 1
        this.timeText.setText('Time: ' + this.initialTime)
    
        if (this.initialTime <= 30) {
            this.timeText.setFill('#FF0000')
            if (!this.isTweensAdded) {
                this.isTweensAdded = true
                this.tweens.add({
                    targets: this.timeText,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                    duration: 500,
                })
            }
        }
    
        if (this.initialTime <= 0) {
            this.timedEvent.remove()
            this.gameOver = true
            this.timeText.setText('Time is out!\nPress (R) to Restart or (B) to get to Menu').setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5, 0.5).setFontSize('18px')
            this.tweens.killTweensOf(this.timeText)
            this.handleGameOver()
        }
    }
    handleGameOver() {
        this.player.body.setVelocity(0, 0)
        this.player.body.moves = false
    }
    
    
    
}    
