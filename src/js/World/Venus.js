import {
    DoubleSide,
    ImageUtils,
    MeshBasicMaterial,
    NearestFilter,
    Object3D,
    RepeatWrapping,
    TextureLoader,
    BoxGeometry,
    Mesh,
    ShaderMaterial,
    TextGeometry,
    LoadingManager,
    FontLoader
} from 'three'

export default class Venus {
    constructor(options) {
        // Options
        this.time = options.time
        this.assets = options.assets
        this.canvas = document.getElementsByTagName('canvas')[0]
        this.debug = options.debug
        this.params = {direction: 1}
        this.mouse = options.mouse
        this.halfCanvasX = this.canvas.width / 2
        this.position = options.position
        this.text = options.text

        // Set up
        if (this.debug) {
            this.setDebug()
        }
        this.container = new Object3D()
        this.container.name = 'Venus'
        this.initVenus()
        this.createVenus()
        this.setMovement()
        // this.setTexture(0)
        // window.setInterval(() => {
        //   let textureToShow = Math.floor(Math.random() * Math.floor(6))
        //   this.setTexture(textureToShow)

        //   // console.log(textureToShow)
        // }, 500)
    }

    setDebug() {
        this.debugFolder = this.debug.addFolder('Rotation')
        this.debugFolder.open()
        this.debugFolder
            .add(this.params, 'direction')
            .step(1)
            .min(-1)
            .max(1)
            .name('Direction')
    }

    initVenus() {
        // console.log(this.canvas);
        let canvasRef = this.canvas
        let statueRef = this.assets.models.venus
        let dir
        let time = 0
    }

    update() {
        requestAnimationFrame(update)
    }


    createVenus() {
        this.venus = this.assets.models.venus.clone()
        // console.log(this.venus);
        this.venus.position.y = -2.5

        if (this.position % 2 === 0) {
            this.venus.position.x = 4
        } else {
            this.venus.position.x = -4
        }
        this.venus.rotation.y += 40
        this.venus.position.z = -this.position * 7

        const loader = new FontLoader();

        loader.load( 'src/fonts/volk.json', function ( font ) {

            const geometry = new TextGeometry( 'Hello three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelOffset: 0,
                bevelSegments: 5
            } );
        } );

        this.venus.scale.x = 0.25
        this.venus.scale.y = 0.25
        this.venus.scale.z = 0.25

        // this.venus.rotation.y = 120
        this.container.add(this.venus)
        this.setTexture(0)
        // this.assets.models.venus.children[1].material.alphaTest = 0.5
        // this.assets.models.venus.children[1].material.map = ImageUtils.loadTexture(this.assets.textures.glitch1)
    }

    setRotation(mouseDirection) {
        switch (mouseDirection) {
            case left:
                for (let i = 0; i < 50; i++) {
                    this.venus.rotation.x += i

                }
                break;
            case right:
                for (let i = 0; i < 50; i++) {
                    this.venus.rotation.x -= i

                }
                break;
            default:
                break;
        }
    }

    setTexture(textureToShow) {
        const venusText = this.assets.models.venus.children[0].material
        let texturesArr = [
            '../../textures/glitch1.png',
            this.assets.textures.glitch2,
            this.assets.textures.glitch3,
            this.assets.textures.glitch4,
            this.assets.textures.sable,
        ]

        let manager = new LoadingManager();
        let textureLoader = new TextureLoader(manager);
        let texture;
        texture = textureLoader.load(texturesArr[0].src);

        let material = new ShaderMaterial({
            uniforms: {
                time: {value: 1.0},
                rez: {type: "v2", value: [1000, 1000]},
                photo: {type: "t", value: texture},
            },
            vertexShader: require("../../shaders/screen.vert"),
            fragmentShader: require("../../shaders/screen.frag"),
        })

        console.log(this.assets.textures.glitch2)

        // const texture = new TextureLoader().load( this.venusText );
        this.venusText = new MeshBasicMaterial({map: this.assets.textures.glitch2, transparent: true});

        //this.venusText.material.opacity = 0.5;

        const geometry = new BoxGeometry(40, 40, 40);
        const cube = new Mesh(geometry, this.venusText);
        this.container.add(cube)
    }


    setMovement() {
        this.time.on('tick', () => {
            // console.log(this.mouse.getMousePos());
            // let velocity = this.mouse.getMousePos().x < this.halfCanvasX ? -1 : 1
            // this.venus.rotation.y += 0.05 * this.params.direction
            // this.venus.rotation.y += 0.05 * direction
            // this.venus.rotation.y += 0.005 * velocity

            // moité - valeur de x / -10000

            const half = this.halfCanvasX
            const x = this.mouse.getMousePos().x
            const velocity = half - x
            // console.log({velocity, x, half});

            const angle = this.venus.rotation.y + velocity / -10000
            // this.venus.rotation.y = Math.min(Math.max(angle, -0.8), 0.6)


            this.venus.rotation.y = velocity / 1000

        })
    }
}


