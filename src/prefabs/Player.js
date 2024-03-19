class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCollideWorldBounds(true)
        
        // Player properties
        this.isCrouching = false // Initial state - not crouching
        this.speed = 50 // Default speed when standing

        // Define default and crouching speed values
        this.defaultSpeed = 40
        this.crouchSpeed = 25 // Speed while crouching

        this.textAnimating = false
        
        // Player controls
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.crouchKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL) 
        this.statusText = scene.add.text(10, 10, 'Status: Standing', {
            fontSize: '16px',
            fill: '#FFFFFF'
        }).setScrollFactor(0).setVisible(true)


        scene.tweens.add({
            targets: this.statusText,
            alpha: { start: 0, from: 1, to: 0 }, 
            duration: 2000, 
            ease: 'Expo.easeInOut', 
            repeat: 0, 
            yoyo: true, 
            onStart: () => { this.statusText.setVisible(true); },
            onComplete: () => { this.statusText.setVisible(false); }
        })

        this.setTexture('stand')
        this.setScale(2.5)
        this.footstepSound = scene.sound.add('footstep', { loop: false })
        
    }



    preload(){
        this.load.image('stand', './assets/stand2.png')
        this.load.image('down', './assets/down.png')
        this.load.audio('footstep','./assets/footstep.mp3')
    }

    // Method to make the player crouch
    crouch() {
        if (!this.isCrouching) {
            this.isCrouching = true
            this.speed = this.crouchSpeed 
            this.statusText.setText('Status: Crouching')
            this.setTexture('down').setScale(1.2)
            
        }
    }

    // Method to make the player stand up
    standUp() {
        if (this.isCrouching) {
            this.isCrouching = false
            this.speed = this.defaultSpeed 
            this.statusText.setText('Status: Standing') 
            this.setTexture('stand').setScale(2.5)
        }
    }

    // Update method to handle player input
    update() {
        // Toggle between crouching and standing with the Control key
        if (this.crouchKey.isDown && !this.isCrouching) {
            this.crouch()
        } else if (this.crouchKey.isUp && this.isCrouching) {
            this.standUp()
        }

        // Move the player with arrow keys
        if (this.cursors.left.isDown) {
            this.x -= this.speed / 60
        } else if (this.cursors.right.isDown) {
            this.x += this.speed / 60
        }

        if (this.cursors.up.isDown) {
            this.y -= this.speed / 60
        } else if (this.cursors.down.isDown) {
            this.y += this.speed / 60
        }
        if (this.isMoving() && !this.footstepSound.isPlaying) {
            this.footstepSound.play()
        }
    }


    isMoving() {
        return this.cursors.left.isDown || this.cursors.right.isDown || 
               this.cursors.up.isDown || this.cursors.down.isDown;
    }

    startTextAnimation() {
        if (!this.textAnimating) {
            this.textAnimating = true
            this.scene.tweens.add({
                targets: this.statusText,
                alpha: { from: 1, to: 0 },
                duration: 2000,
                ease: 'Expo.easeInOut',
                repeat: -1, 
                yoyo: true,
                onStart: () => {
                    this.statusText.setVisible(true);
                }
            })
        }
    }
    
}
