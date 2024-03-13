class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, patrolMinX, patrolMaxX) {
        // Assume 'enemy' is the key for the texture when the enemy is facing right
        super(scene, x, y, 'enemy')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)

        // The enemy's patrol range
        this.patrolMinX = patrolMinX
        this.patrolMaxX = patrolMaxX

        // The enemy's movement speed
        this.patrolSpeed = 100
        this.body.velocity.x = this.patrolSpeed

        // The keys for the enemy textures
        this.textureRight = 'enemy'
        this.textureLeft = 'enemy2'

        // The default facing direction
        this.currentFacing = 'right'
    }



    update() {
        if (this.body.velocity.x < 0 && this.currentFacing !== 'left') {
            this.setTexture(this.textureLeft)
            this.currentFacing = 'left';
        } else if (this.body.velocity.x > 0 && this.currentFacing !== 'right') {
            this.setTexture(this.textureRight)
            this.currentFacing = 'right'
        }

        // Reverse direction 
        if (this.x <= this.patrolMinX && this.currentFacing === 'left') {
            this.body.velocity.x = this.patrolSpeed
            this.currentFacing = 'right'
        } else if (this.x >= this.patrolMaxX && this.currentFacing === 'right') {
            this.body.velocity.x = -this.patrolSpeed
            this.currentFacing = 'left'
        }
    }
}
