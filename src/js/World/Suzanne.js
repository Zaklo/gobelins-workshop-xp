// import { Object3D } from 'three'

// export default class Suzanne {
//   constructor(options) {
//     // Options
//     this.time = options.time
//     this.assets = options.assets
//     // this.textureToShow = 0

//     // Set up
//     this.container = new Object3D()
//     this.container.name = 'Suzanne'
//     this.textureToShow = 0

//     // this.createSuzanne()
//     // this.setMovement()
//     // this.setTexture(0)
//     window.setInterval(() => {
//       this.setTexture(this.textureToShow)
//       this.textureToShow++
//       if (this.textureToShow >= 4) {
//         this.textureToShow = 0
//       } else {
//         this.textureToShow += 1
//       }
//     }, 1000)
//   }

//   createSuzanne() {
//     this.suzanne = this.assets.models.suzanne.scene
//     this.container.add(this.suzanne)
//   }
//   setMovement() {
//     this.time.on('tick', () => {
//       this.suzanne.rotation.y += 0.005
//     })
//   }

//   setTexture(textureToShow) {
//     let texturesArr = [
//       this.assets.textures.sable,
//       this.assets.textures.flower,
//       this.assets.textures.t3,
//     ]
//     this.assets.models.suzanne.scene.children[0].material.transparent = true
//     this.assets.models.suzanne.scene.children[0].material.map =
//       // texturesArr[textureToShow]
//       this.assets.textures.flower
//   }
// }
