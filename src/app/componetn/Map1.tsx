"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
// import { Canvas, useFrame, Vector3 } from '@react-three/fiber'; /// TRABAJA BIEN SIN EMBARGO LOS MODELOS 3D SALEN SOBRE EL MAPA Y NO SE QUEDAN DE FORMA ESTATICA O GEOREFERENCIADA
import { useFrame, Vector3 } from '@react-three/fiber';
import { Canvas } from "react-three-map/maplibre";/// PERMITE A LOS MODELOS 3D ESTAR DE FORMA ESTATICA O GEOREFERENCIADA
import { Leva } from 'leva';
import { Mesh } from "three";

export function Map1() {
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
                    // style={{
                    //     position: 'absolute',
                    //     top: 0,
                    //     left: 0,
                    //     width: '100%',
                    //     height: '100%',
                    //     pointerEvents: 'none',
                    // }}
                    // style={{ pointerEvents: 'none' }}
                    latitude={19.292536964352422} longitude={-99.65691804395397}>
                    <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} intensity={Math.PI} />

                    <object3D scale={100}>
                        <Cube position={[15, 0, 0]} />
                    </object3D>
                </Canvas>
            </Map>
        </div>
    </>
}

const Cube: React.FC<{ position: Vector3 }> = () => {
    const ref = React.useRef<Mesh>(null)
    const [hovered, hover] = React.useState(false)
    const [clicked, click] = React.useState(false)
    useFrame((_state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.x += delta;
        ref.current.rotation.z -= delta;
    })

    return (
        <mesh
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={() => click(!clicked)}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'red' : 'blue'} />
        </mesh>
    )
}