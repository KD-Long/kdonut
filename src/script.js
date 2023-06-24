import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

//import typeface from'three/examples/fonts/helvetiker_regular.typeface.json'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'



/**
 * Font loader
 */
const fontLoader = new FontLoader()

fontLoader.load('/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        const textGeometry = new TextGeometry(
            "Kdogpwns",
            {
                font: font,
                size: 0.5,
                height:0.2,
                curveSegments:5,
                bevelEnabled:true,
                bevelThickness:0.03,
                bevelSize:0.02,
                bevelOffset:0,
                bevelSegments:4
            }
        )
        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     -textGeometry.boundingBox.max.x * .5,
        //     -textGeometry.boundingBox.max.y * .5,
        //     -textGeometry.boundingBox.max.z * .5
        // )
        textGeometry.center()

        
        const text = new THREE.Mesh(textGeometry,textMaterial2)
        scene.add(text)

        

    }
    )



/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes helper

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const matcapTex = textureLoader.load('/textures/matcaps/5.png')
const matcapTex2 = textureLoader.load('/textures/matcaps/8.png')

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
//scene.add(cube)
const textMaterial2 = new THREE.MeshMatcapMaterial({matcap:matcapTex2})
const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTex})
const donutGeo = new THREE.TorusGeometry(0.3,0.2,20,45)
const donutMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTex})

const donuts= []

for(let i =0;i<1500;i++){


    const donut = new THREE.Mesh(donutGeo,donutMaterial)


    donut.position.x = (Math.random()-0.5) * 40
    donut.position.y = (Math.random()-0.5) * 40
    donut.position.z = (Math.random()-0.5) * 40

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()
    donut.scale.set(scale,scale,scale)
    donuts.push(donut)
    scene.add(donut)
}
//console.log(donuts)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    donuts.forEach((donut, index)=>{
        //donut.position.x += (Math.random()-.5)*0.01
        donut.rotation.x += index<donuts.length ? 0.003 : -0.003
        donut.rotation.y += index<donuts.length ? 0.003 : -0.003
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()