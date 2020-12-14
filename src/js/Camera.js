import { Object3D, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
  constructor(options) {
    // Set Options
    this.sizes = options.sizes
    this.renderer = options.renderer
    this.debug = options.debug

    // Set up
    this.container = new Object3D()
    this.container.name = 'Camera'

    this.setCamera()
    this.setPosition()
    this.setOrbitControls()
  }
  setCamera() {
    // Create camera
    this.camera = new PerspectiveCamera(
      75,
      this.sizes.viewport.width / this.sizes.viewport.height,
      0.1,
      1000
    )
    this.container.add(this.camera)
    // Change camera aspect on resize
    this.sizes.on('resize', () => {
      this.camera.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      // Call this method because of the above change
      this.camera.updateProjectionMatrix()
    })
  }
  setPosition() {
    // Set camera position
    this.camera.position.x = 0
    this.camera.position.y = 1
    this.camera.position.z = 5
  }
  setOrbitControls() {
    // Set orbit control
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    )
    this.orbitControls.enabled = false
    this.orbitControls.enableKeys = true
    this.orbitControls.zoomSpeed = 1

    if (this.debug) {
      this.debugFolder = this.debug.addFolder('Camera')
      this.debugFolder.open()
      this.debugFolder
        .add(this.orbitControls, 'enabled')
        .name('Enable Orbit Control')
    }
  }
}



// function onMouseMove( event ) {

// 	// calculate mouse position in normalized device coordinates
// 	// (-1 to +1) for both components

// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

// }

// function render() {

// 	// update the picking ray with the camera and mouse position
// 	raycaster.setFromCamera( mouse, camera );

// 	// calculate objects intersecting the picking ray
// 	const intersects = raycaster.intersectObjects( scene.children );

// 	for ( let i = 0; i < intersects.length; i ++ ) {

// 		intersects[ i ].object.material.color.set( 0xff0000 );

// 	}

// 	renderer.render( scene, camera );

// }

// window.addEventListener( 'mousemove', onMouseMove, false );

// window.requestAnimationFrame(render);