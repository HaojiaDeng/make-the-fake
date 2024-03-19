`
Credits:
sound of footstep found from a free-copyright website:
 https://opengameart.org/content/42-snow-and-gravel-footsteps
The 2 images of background&the log image&the jeep image are created by  DALL·E 3(AI)

Phaser's major components used:
physics: somehow the addcollider() function failed. I cannot find out the way to fix that.
cameras: I use the camera.pan() function to create a cutscene.
particle effects: I use it to create fire particle to make it more visually interesting
text objects
the tween manager: I use it to make texts with special effect.
timers: there is a countdown in game to make it more challenging
`



let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:{
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu,Tutorial,Play]
}

let game = new Phaser.Game(config)

let keyH, keyP, keyRight,keyLeft,keyUp,keyDown,keyControl,keyR,keyB