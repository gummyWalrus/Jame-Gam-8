
// You can write more code here

/* START OF COMPILED CODE */

class UI extends Phaser.Scene {

	constructor() {
		super("UI");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// Mana
		const mana = this.add.text(63, 71, "", {});
		mana.text = "100";
		mana.setStyle({ "color": "#2398ecff", "fontSize": "50px" });

		// Potion
		const potion = this.add.tileSprite(47, 49, 32, 32, "mana_potion", 0);
		potion.scaleX = 2;
		potion.scaleY = 2;

		// HP
		const hP = this.add.text(67, 139, "", {});
		hP.text = "100";
		hP.setStyle({ "color": "#c54444ff", "fontSize": "50px" });

		this.mana = mana;
		this.potion = potion;
		this.hP = hP;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	mana;
	/** @type {Phaser.GameObjects.TileSprite} */
	potion;
	/** @type {Phaser.GameObjects.Text} */
	hP;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		this.target = this.scene.get('Level')
	}
	update ()
	{
		this.mana.setText(this.target.mana)
		this.hP.setText(this.target.hp)
		if (this.target.counts.blue > 0) {
			this.potion.setTexture('mana_potion')
			this.potion.tilePositionY = 32 * this.target.counts.blue;
		}
		else if (this.target.counts.red > 0) {
			this.potion.setTexture('heal_potion')
			this.potion.tilePositionY = 32 * this.target.counts.red;
		}
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
