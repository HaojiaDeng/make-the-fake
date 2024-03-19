class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene")
    }
    preload(){
        this.load.image('BG2',"./assets/BG2.png")
    }

    create() {
        let menuConfig = {
            fontFamily: "Lucida Console", 
            fontSize: "16px",
            color: "#ffffff" 
        }
        this.BG = this.add.tileSprite(0, 0, 640, 480, 'BG2').setOrigin(0, 0)
        this.instructionText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY-50,
        `"Attention, soldier!
        Welcome to the field exercise.
        
        Your mission is to traverse enemy-occupied terrain undetected—ghillie suit on, weapons hold. Remember, movement increases visibility, so keep it stealthy. Navigate using arrow keys and hit the deck with Control to crawl. Crawling reduces your detection radius.
        
        Stay sharp, stay silent, stay alive.
        Good luck, have fun. Dismissed!"
        
         `
            , {
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 40, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);


        menuConfig.fontSize = "16px"
        this.add.text(500, 400, "Press 'B' to get back to the Menu page", menuConfig).setOrigin(0.5)
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            this.scene.start('menuScene')
            this.sound.play('press')
        }
    }
}