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
    this.setTexture(0)
    window.setInterval(() => {
      let textureToShow = Math.floor(Math.random() * Math.floor(6))
      this.setTexture(textureToShow)

      console.log(textureToShow)
    }, 500)
  }
  createVenus() {
    this.venus = this.assets.models.venus
    this.container.add(this.venus)
    this.assets.models.venus.children[1].material.transparent = true
    this.assets.models.venus.children[1].material.map = this.assets.textures.flower
  }

  setTexture(textureToShow) {
    let texturesArr = [
      this.assets.textures.sable,
      this.assets.textures.flower,
      this.assets.textures.t2,
      this.assets.textures.flower,
      this.assets.textures.t3,
    ]
    this.assets.models.venus.children[1].material.transparent = true
    this.assets.models.venus.children[1].material.map =
      texturesArr[textureToShow]
    // this.assets.textures.flower
  }
}
