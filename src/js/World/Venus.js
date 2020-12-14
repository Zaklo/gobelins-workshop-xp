
import { DoubleSide, ImageUtils, MeshBasicMaterial, NearestFilter, Object3D, RepeatWrapping, TextureLoader, BoxGeometry, Mesh } from 'three'

export default class Venus {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.debug = options.debug
    this.params = { direction: 1 }
    this.mouse = options.mouse
    this.halfCanvasX = this.canvas.width / 2

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

    // this.canvas.addEventListener('mousemove', (event) => {
    //   dir = event.clientX
    //   if (dir < halfCanvasX) {
    //     dir = 'left'
    //     while (dir === 'left' && time <= 50) {
    //       time += 0.05
    //       statueRef.rotation.y -= time
    //     }
    //   }  

    //   if (dir > halfCanvasX) {
    //     dir = 'right'
    //     while (dir === 'right' && time <= 50) {
    //       time += 0.5
    //       statueRef.rotation.y += time
    //     }
    //   }
    //   console.log(dir);

    // })
  }

  update() {
    requestAnimationFrame(update)
  }

  createVenus() {
    this.venus = this.assets.models.venus
    // console.log(this.venus);
    this.venus.position.y = -2.5
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
    const venusText = this.assets.models.venus.children[1].material
    let texturesArr = [
      '../../textures/glitch1.png',
      this.assets.textures.glitch2,
      this.assets.textures.glitch3,
      this.assets.textures.glitch4,
      this.assets.textures.sable,
    ]

    console.log(this.assets.textures.glitch2)

    // const texture = new TextureLoader().load( this.venusText );
    this.venusText = new MeshBasicMaterial( { map: this.assets.textures.glitch2, transparent: true } );
    console.log(this.venusText)
    const geometry = new BoxGeometry(40, 40, 40);
    const cube = new Mesh(geometry, this.venusText);
    this.container.add(cube)
    // console.log(this.assets.models.venus.children[1].material);
    // let alphaMap = new TextureLoader().load(this.assets.textures.glitch1);
    // venusText.alphaMap = alphaMap;
    // venusText.alphaMap.magFilter = NearestFilter;
    // venusText.alphaMap.wrapT = RepeatWrapping;
    // venusText.alphaMap.repeat.y = 1;
    // venusText.transparent = true
    // venusText.alphaTest = 0.5
    // venusText.side = DoubleSide
    // venusText.map =
    //   texturesArr[textureToShow]
    // this.assets.textures.flower
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

      const angle = this.venus.rotation.y + velocity  / -10000
      // this.venus.rotation.y = Math.min(Math.max(angle, -0.8), 0.6)
      
      
      this.venus.rotation.y = velocity / 1000

    })
  }
}


