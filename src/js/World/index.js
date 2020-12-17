import {AxesHelper, Object3D, CatmullRomCurve3, Vector2, BufferGeometry, LineBasicMaterial, Line, Vector3, FontLoader, TextGeometry} from 'three'

import AmbientLightSource from './AmbientLight'
import PointLightSource from './PointLight'
import Venus from './Venus'
import Mouse from '../Tools/Mouse'

const textVenus = ['1','2','3','4','5','6']

export default class World {
  constructor(options) {
    // Set options
    this.time = options.time
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder('World')
      this.debugFolder.open()
    }

    this.setLoader()
  }
  init() {
    this.setAmbientLight()
    this.setPointLight()
    this.setMouse()
    for (let i = 0; i < 6; i++) {
      this.setVenus(i,textVenus[i])
    }


    const curve = new CatmullRomCurve3( [
      new Vector3( -10, -0, -5 ),
      new Vector3( -5, 5, -10),
      new Vector3( 0, 0, -15 ),
      new Vector3( 5, -5, -20 ),
      new Vector3( 10, 0, -25 )
    ] );

    const points = curve.getPoints( 50 );
    const geometry = new BufferGeometry().setFromPoints( points );

    const material = new LineBasicMaterial( { color : 'white' } );

    // Create the final object to add to the scene
    const splineObject = new Line( geometry, material );

    this.container.add(splineObject)
  }
  setLoader() {
    this.loadDiv = document.querySelector('.loadScreen')
    this.loadModels = this.loadDiv.querySelector('.load')
    this.progress = this.loadDiv.querySelector('.progress')

    if (this.assets.total === 0) {
      this.init()
      this.loadDiv.remove()
    } else {
      this.assets.on('ressourceLoad', () => {
        this.progress.style.width = this.loadModels.innerHTML = `${
          Math.floor((this.assets.done / this.assets.total) * 100) +
          Math.floor((1 / this.assets.total) * this.assets.currentPercent)
        }%`
      })

      this.assets.on('ressourcesReady', () => {
        setTimeout(() => {
          this.init()
          this.loadDiv.style.opacity = 0
          setTimeout(() => {
            this.loadDiv.remove()
          }, 550)
        }, 1000)
      })
    }
  }
  setAmbientLight() {
    this.ambientlight = new AmbientLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.ambientlight.container)
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setVenus(position,text) {
    this.venus = new Venus({
      time: this.time,
      assets: this.assets,
      debug: this.debugFolder,
      mouse: this.mouse,
      position : position,
      text : text
    })
    this.container.add(this.venus.container)
  }

  setMouse() {
    this.mouse = new Mouse()
  }

}
