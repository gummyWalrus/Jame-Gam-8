
// You can write more code here
var gameOptions = {

  worldDimensions: {
	  width: 3200,
	  height: 3200
  },

  // background color
  bgColor: 0x00008b,

  // player gravity
  playerGravity: 900,

  // player friction when on wall
  playerGrip: 100,

  // player horizontal speed
  playerSpeed: 0,

  // player jump force
  playerJump: 600,

  // player double jump force
  playerDoubleJump: 10,
  atkCost: 10,
  maxMana: 100,
  nocubeMutation: ((!this.hasCube || this.mana <= 0) ? '-nocube' : '')
}


/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		var config = {
			physics: {
				default: 'arcade',
				arcade: {
					debug: false,
					gravity: { y: 600 }
				}
			}
		};
		this.cursors = ""
		Phaser.Scene.call(this, config)
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// map
		const map = this.add.tilemap("map");
		map.addTilesetImage("Tileset", "Tileset");

		// manaPotion
		this.add.tileSprite(463, 137, 32, 32, "mana_potion");

		// manaDrop
		this.add.sprite(389, 127, "blue_flower");

		// layer
		const layer = map.createLayer("Tile Layer 1", ["Tileset"], 0, 0);

		// bg
		const bg = this.add.image(303, 3038, "Background");

		// lists
		const list = [];
		const redList = [];
		const blueList = [];

		this.layer = layer;
		this.bg = bg;
		this.map = map;
		this.list = list;
		this.redList = redList;
		this.blueList = blueList;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layer;
	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Array<any>} */
	list;
	/** @type {Array<any>} */
	redList;
	/** @type {Array<any>} */
	blueList;

	/* START-USER-CODE */

	// Write more your code here

	create() {
    this.pickup = this.sound.add('pickup_1')
    this.run = true;
    this.hp = 100;
    this.blueList = [];
    this.redList = [];
    this.mana = 100;
    this.spawn = true;
    this.hasCube = true;
		this.editorCreate();
    this.bg.depth = -1;
		const mage = this.physics.add.sprite(300, 3000, "float_mage_idle", 0);
    const enn = this.physics.add.sprite(1000, 3000, "Idle", 0);
    const enn2 = this.physics.add.sprite(1000, 2000, "Idle", 0);
    const enn3 = this.physics.add.sprite(2000, 2500, "Idle", 0);
    this.enn = enn;
    this.enn2 = enn2;
    this.enn3 = enn3;
    enn.setSize(100, 100, true);
    enn2.setSize(100, 100, true);
    enn3.setSize(100, 100, true);
    mage.setSize(50, 50, true)
		this.mage = mage;
    this.enn.play('idleSkeleton')
    this.enn2.play('idleSkeleton')
    this.enn3.play('idleSkeleton')
		this.physics.add.collider(this.mage, this.layer);
		this.physics.add.collider(this.enn, this.layer);
		this.physics.add.collider(this.enn2, this.layer);
		this.physics.add.collider(this.enn3, this.layer);
    this.physics.add.overlap(this.mage, this.enn, this.hitPlayer, null, this);
    this.physics.add.overlap(this.mage, this.enn2, this.hitPlayer, null, this);
    this.physics.add.overlap(this.mage, this.enn3, this.hitPlayer, null, this);
    this.hasDamage = true;
		this.mage.play("idleMage"+gameOptions.nocubeMutation);
		this.layer.setCollisionByProperty({ IsSolid: true });
      this.keys = {
      keyA: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      keyE: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    }
		// chargement de la carte
		this.mage.setVelocityX(gameOptions.playerSpeed);

		this.canJump = true;
    this.spawnRed = true;
		this.canDoubleJump = false;

    this.counts = {
      blue: 0,
      red: 0,
    }
		this.physics.world.setBounds(0, 0, 3200, 3200);

		this.cameras.main.setBounds(0, 0, 3200, 3200);
		this.cameras.main.startFollow(this.mage);
		this.cursors = this.input.keyboard.createCursorKeys();
	}
  setHp(n)
  {
    if (n > 100) {
      this.hp = 100;
    } else if (n < 0) {
      this.hp = 0;
    } else this.hp = n
  }
  hitPlayer (bodyA, bodyB) {
    if (this.hasDamage) {
      this.hasDamage = false;
      this.setHp(this.hp - 10);
      this.mage.play('mageHit')
      this.sound.add('attack').play()
      bodyB.play('attackSkeleton')
      setTimeout(()=>{
        bodyB.play('idleSkeleton')
      }, 1000)
      setTimeout(()=>{
      this.mage.setVelocityX(((bodyB.x - bodyA.x) * -10))
      this.mage.setVelocityY(-200)
      }, 500)
    } else setTimeout(() => {
        this.hasDamage = true;
    }, 1000)
  }
  incBlue (n) {
    this.counts.red = 0;
    if (this.counts.blue + n > 3)
      this.counts.blue = 3
    else this.counts.blue += n
  }
  incRed (n) {
    this.counts.red = 0;
    if (this.counts.red + n > 3)
      this.counts.red = 3
    else this.counts.red += n
  }
	setDefaultValues () {
  	}
  skeletonAttack(skeleton)
  {
    if (skeleton.y - 200 < this.mage.y && skeleton.y + 200 >  this.mage.y && Math.abs(skeleton.x - this.mage.x) < 500) {
      if (this.mage.x - skeleton.x < 0)
        skeleton.flipX = true;
    }
  }
  handleSkeletons() {
    this.skeletonAttack(this.enn)
    this.skeletonAttack(this.enn2)
    this.skeletonAttack(this.enn3)
  }
	handleJump () {
    var blockedDown = this.mage.body.blocked.down;
      this.canDoubleJump = false;
      if (this.cursors.down.isDown) {

      }
      else if(this.cursors.left.isDown) {
        this.mage.setVelocityX(-200);
      } else if (this.cursors.right.isDown) {
        this.mage.setVelocity(200, this.mage.body.velocity.y);        
      } else if (this.cursors.up.isDown) {
          if (this.canJump && this.mage.body.blocked.down) {

        	this.mage.setVelocityY(-gameOptions.playerJump);

        	if (this.cursors.left.isDown)
        		this.mage.setVelocity(-200, this.mage.body.velocity.y);
      		this.canJump = false;
      		this.canDoubleJump = true;
    } else {

            if (this.canDoubleJump) {
            this.canDoubleJump = false;
            this.mage.setVelocityY(-gameOptions.playerDoubleJump);
          }
    }      
      } else {
        this.mage.setVelocity(0, 0);
      }

      // hero on the ground
      if (blockedDown) {
        // hero can jump
        this.canJump = true;
      }
    if ((this.canJump && this.mage.body.blocked.down)) {
      this.sound.add('jump').play()
      this.mage.setVelocityY(-gameOptions.playerJump);


      this.canJump = false;


      this.canDoubleJump = true;
    } else {

      if (this.canDoubleJump) {

        this.canDoubleJump = false;

        this.mage.setVelocityY(-gameOptions.playerDoubleJump);
      }
    }
  }
  getMana ()
  {
    return this.mana;
  }
  handleMovemement () {
    if(Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
        this.mage.flipX = true;
        this.mage.play("mageWalk"+gameOptions.nocubeMutation);
    }
    if(Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
        this.mage.flipX = false;
        this.mage.play("mageWalk"+((!this.hasCube || this.mana <= 0) ? '-nocube' : ''));
    }
    if(Phaser.Input.Keyboard.JustDown(this.keys.keyE)) {
      if (this.counts.blue >= 3) {
        this.scene.get('UI').potion.tilePositionY = 0;
        this.mana = 100;
        this.counts.blue = 0;
      } else if (this.counts.red >= 3) {
        this.hp = 100;
        this.counts.red = 0;
      }
    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
      this.mage.play("idleMage"+((!this.hasCube || this.mana <= 0) ? '-nocube' : ''));
      this.mage.setVelocity(0, this.mage.body.velocity.y)
    }
    if(Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
        this.mage.play("idleMage"+((!this.hasCube || this.mana <= 0) ? '-nocube' : ''));
      this.mage.setVelocity(0, this.mage.body.velocity.y)
    }
    if (this.cursors.left.isDown)
      this.mage.setVelocity(-300, this.mage.body.velocity.y);
    else if (this.cursors.right.isDown)
      this.mage.setVelocity(300, this.mage.body.velocity.y);
  }
  handleMagic () {
    this.list.forEach((cube) => {
      if (cube.left)
        cube.cube.setVelocity(-1500, 0);
      else cube.cube.setVelocity(1500, 0);
    })
  }
  setMana(mana) {
    if (mana < 0)
      this.mana = 0;
    else if (mana > gameOptions.maxMana)
      this.mana = gameOptions.maxMana;
    else this.mana = mana;
  }
  destroyEnnemies(bodyA, bodyB) {
    bodyB.play('deathSkeleton')
    setTimeout(() => {
      bodyB.destroy()
    }, 500)
  }
  magicAtk() {
    if (this.mana >= gameOptions.atkCost && this.hasCube) {
          var cube = this.physics.add.sprite(this.mage.x, this.mage.y, 'cube_atk');
          this.sound.add('shoot').play()
          cube.play("cubeAtk")
          this.mage.play("atkMage")
          this.list.push({left: (this.mage.flipX), cube: cube})
          this.setMana(this.mana - gameOptions.atkCost);
          this.hasCube = false;
          this.physics.add.collider(cube, this.enn);
          this.physics.add.collider(cube, this.enn2);
          this.physics.add.collider(cube, this.enn3);
          this.physics.add.overlap(cube, this.enn, this.destroyEnnemies, null, this);
          this.physics.add.overlap(cube, this.enn2, this.destroyEnnemies, null, this);
          this.physics.add.overlap(cube, this.enn3, this.destroyEnnemies, null, this);
          setTimeout(() => {
            this.hasCube = true;
            this.mage.play("idleMage")
          }, 1000);
    }
  }
  spawnBlueLeaves (n) {
    var blue;
    var t_his = this;
    for (let i = 0; i < n; i++) {
      blue = this.physics.add.sprite(Phaser.Math.Between(this.mage.x, this.mage.x+800), this.mage.y - 800, 'blue_flower');
      this.physics.add.overlap(blue, this.mage, function (blueLeave, mage) {
          t_his.incBlue(1)
          t_his.pickup.play()
          let bindex = t_his.blueList.findIndex((blu) => {
            if (blu.sprite === blueLeave)
              return true;
            else return false
          })
          t_his.blueList.splice(bindex, 1);
          blueLeave.destroy()
      });
      this.physics.add.collider(blue, this.layer)
      blue.setGravityY(1);
      this.blueList.push({sprite: blue, xVelocity: 100});
    }
  }
  spawnRedLeaves (n) {
    var red;
    var t_his = this;
    for (let i = 0; i < n; i++) {
      red = this.physics.add.sprite(Phaser.Math.Between(this.mage.x, this.mage.x+800), this.mage.y - 800, 'red_flower');
      this.physics.add.overlap(red, this.mage, function (redLeave, mage) {
          t_his.incRed(1)
          t_his.pickup.play()
          let bindex = t_his.redList.findIndex((red) => {
            if (red.sprite === redLeave)
              return true;
            else return false
          })
          t_his.redList.splice(bindex, 1);
          redLeave.destroy()
      });
      this.physics.add.collider(red, this.layer)
      red.setGravityY(1);
      this.redList.push({sprite: red, xVelocity: 100});
    }
  }
	update ()
	{
    this.handleSkeletons()
  if (this.hp <= 0 || this.mage.y > 3200) {
    this.scene.stop('UI').start('EndScreen').stop('Level')
  }
	this.setDefaultValues();
  if (this.cursors.up.isDown)
      this.handleJump();
  this.handleMovemement();
  if (Phaser.Input.Keyboard.JustUp(this.keys.keyA))
      this.magicAtk()
  this.handleMagic();
  if (this.spawn) {
    this.spawn = !this.spawn
    setTimeout(() => {
        this.spawnBlueLeaves(Phaser.Math.Between(2, 4))
        this.spawn = true;
    }, Phaser.Math.Between(5000, 10000))
  }
  if (this.spawnRed) {
    this.spawnRed = !this.spawnRed
    setTimeout(() => {
        this.spawnRedLeaves(Phaser.Math.Between(2, 4))
        this.spawnRed = true;
    }, Phaser.Math.Between(5000, 30000))
  }
  if (this.run) {
    this.run = false;
  setTimeout(() => {
    this.blueList.forEach((bue) => {
            if (!bue.sprite.body.blocked.down) {
            setTimeout(() => {
              bue.xVelocity = Phaser.Math.Between(-10, 10);
            }, Phaser.Math.Between(0, 200))
          }
      })
    this.blueList.forEach((bue) => {
      if (!bue.sprite.body.blocked.down) {
        bue.sprite.setVelocity(bue.xVelocity, bue.sprite.body.velocity.y);
      }
      })
      this.redList.forEach((bue) => {
            if (!bue.sprite.body.blocked.down) {
            setTimeout(() => {
              bue.xVelocity = Phaser.Math.Between(-10, 10);
            }, Phaser.Math.Between(0, 200))
          }
      })
    this.redList.forEach((bue) => {
      if (!bue.sprite.body.blocked.down) {
        bue.sprite.setVelocity(bue.xVelocity, bue.sprite.body.velocity.y);
      }
      })
    }, 100)
        setTimeout(()=>{
      this.run = true;
    }, 500)
  }
   this.blueList.forEach((bue) => {
      if (!bue.sprite.body.blocked.down)
        bue.sprite.setVelocity(bue.xVelocity, 50);
      })
     this.redList.forEach((bue) => {
      if (!bue.sprite.body.blocked.down)
        bue.sprite.setVelocity(bue.xVelocity, 50);
      })
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
