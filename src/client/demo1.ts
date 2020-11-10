import * as THREE from '/build/three.module.js'
import StatsVR from './statsvr.js'
import { VRButton } from '/jsm/webxr/VRButton'

const scene: THREE.Scene = new THREE.Scene()

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.xr.enabled = true
document.body.appendChild(renderer.domElement)

document.body.appendChild(VRButton.createButton(renderer))

const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100, 10, 10),
    new THREE.MeshBasicMaterial({
        color: 0x008800,
        wireframe: true
    })
)
floor.rotation.x = Math.PI / -2
floor.position.y = -0.001
scene.add(floor)

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const statsVR = new StatsVR(camera)
//change default statsvr position
statsVR.setX(0)
statsVR.setY(0)
statsVR.setZ(-2)

function render() {

    statsVR.update()

    renderer.render(scene, camera)

}

renderer.setAnimationLoop(render)