"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { useFrame, Vector3 } from '@react-three/fiber';
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';
import { Mesh, MathUtils, OrthographicCamera, CameraHelper, DirectionalLight } from "three";
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'



export function Map2() {
    return <>
        <Leva theme={{ sizes: { rootWidth: '340px', controlWidth: '150px' } }} />
        <div id='html_' >
            <Map
                canvasContextAttributes={{
                    antialias: true,
                }}
                initialViewState={{
                    latitude: 19.292536964352422,
                    longitude: -99.65691804395397,
                    zoom: 14,
                    pitch: 70,
                }}
                style={{ width: 1000, height: 1000 }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
                <Canvas
                    camera={{ position: [0, 5, 10], fov: 50 }}
                    shadows
                    latitude={19.292536964352422} longitude={-99.65691804395397}>
                    <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} intensity={Math.PI} />
                    <object3D scale={30}>
                        {/* AQUI VAN LOS MODELOS, SCENAS Y TODO LO QUE SEA 3D */}
                        <Scena_modelos3d></Scena_modelos3d>
                    </object3D>
                </Canvas>
            </Map>
        </div>
    </>
}

// const Cube: React.FC<{ position: Vector3 }> = () => {
//     const ref = React.useRef<Mesh>(null)
//     const [hovered, hover] = React.useState(false)
//     const [clicked, click] = React.useState(false)
//     useFrame((_state, delta) => {
//         if (!ref.current) return;
//         ref.current.rotation.y += delta;
//     })
//     return (
//         <mesh
//             castShadow
//             ref={ref}
//             scale={clicked ? 1.5 : 1}
//             onClick={() => click(!clicked)}
//             onPointerOver={() => hover(true)}
//             onPointerOut={() => hover(false)}>
//             <boxGeometry
//                 args={[1, 1, 1]}
//             />
//             {/* <meshStandardMaterial color={hovered ? 'red' : 'blue'} /> */}
//             <meshStandardMaterial color={hovered ? '#15F5BA' : '#836FFF'}
//                 metalness={1.75}
//                 roughness={0.5}
//             />

//         </mesh>
//     )
// }


// const Toshadow = () => {
//     const ref = React.useRef<Mesh>(null)
//     return (
//         <>
//             <mesh
//                 receiveShadow
//                 ref={ref}
//                 position={[0, -0.5, 0]}
//                 rotation={[-MathUtils.DEG2RAD * 90, 0, 0]}
//             >
//                 <planeGeometry args={[2, 2]} />
//                 {/* <shadowMaterial opacity={0.4} /> */}
//                 <meshStandardMaterial color="red" />
//             </mesh>

//         </>
//     )
// }



const CubeWithShadow = () => {
    const ref = useRef<THREE.Group>(null)

    const [hovered, hover] = React.useState(false)
    const [clicked, click] = React.useState(false)

    useFrame((_state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta;
    })

    return (
        <group ref={ref} position={[0, 0, 0]}>
            <mesh
                castShadow
                position={[0, 0.5, 0]}
                ref={ref}
                scale={clicked ? 1.1 : 1}
                onClick={() => click(!clicked)}
                onPointerOver={() => hover(true)}
                onPointerOut={() => hover(false)}

            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? '#60B5FF' : '#1DCD9F'}
                    metalness={1.75} roughness={1.5}
                />
            </mesh>

            <mesh
                receiveShadow
                position={[0, -0.2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={clicked ? 1.2 : 1}
            >
                <planeGeometry args={[1, 1]} />
                {/* <shadowMaterial opacity={0.8} /> */}
                <meshStandardMaterial
                    color="black"
                    opacity={0.2}
                    transparent={true}
                />
            </mesh>
        </group>
    )
}


const Scena_modelos3d = () => {
    return (
        <>
            <Lights />
            <CubeWithShadow />
            {/* <Toshadow />
            <Cube position={[0, 0.5, 0]} ></Cube> */}
        </>
    )
}

type Props = {
    showCamHelper?: boolean
}

const Lights = ({ showCamHelper }: Props) => {
    const cam = useRef<OrthographicCamera>(null)
    const dirLight = useRef<DirectionalLight>(null)
    const { scene } = useThree()

    useEffect(() => {
        if (showCamHelper && cam.current) {
            const helper = new CameraHelper(cam.current)
            scene.add(helper)
            return () => {
                scene.remove(helper)
                helper.dispose()
            }
        }
    }, [showCamHelper, scene])

    const camSize = 100

    return (
        <>
            <ambientLight intensity={0.2 * Math.PI} />
            <directionalLight
                ref={dirLight}
                castShadow
                position={[2.5, 50, 5]}
                intensity={2.5 * Math.PI}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            >
                {/* attach=shadow-camera se encarga de usar esta cámara para sombras */}
                <orthographicCamera
                    ref={cam}
                    attach="shadow-camera"
                    args={[-camSize, camSize, camSize, -camSize, 0.1, 100]}
                />
            </directionalLight>

            {/* Luces adicionales */}
            <pointLight position={[50, 5, 10]} intensity={Math.PI} decay={2 / Math.PI} />
            <pointLight position={[-50, 5, 10]} intensity={Math.PI} decay={2 / Math.PI} />
            <pointLight position={[0, 5, 0]} intensity={Math.PI} decay={2 / Math.PI} />
        </>
    )
}