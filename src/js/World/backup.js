



import { Object3D } from 'three'

export default class Venus {
  constructor(options) {
    // Options
    this.time = options.time
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Venus'

    this.createVenus()
  }
  
  createVenus() {
    this.venus = this.assets.models.venus
    this.container.add(this.venus)
    console.log('venus loaded')
    console.log(this.assets.textures);

  }

  setTexture() {
    let texturesArr = [
      this.assets.textures.glitch1,
      this.assets.textures.glitch2,
      this.assets.textures.glitch3,
      this.assets.textures.glitch4,
    ]
  
    for (let textureToShow = 0; textureToShow < texturesArr.length; textureToShow++) {
      if (textureToShow == texturesArr.length) {
        console.log(`textureToShow reset : ${textureToShow}`)
        textureToShow = 0
      }
      // this.assets.models.venus.children[1].material.transparent = true
      this.assets.models.venus.children[1].material.map =
        texturesArr[textureToShow]
    }

    this.setTexture()

  }
}
