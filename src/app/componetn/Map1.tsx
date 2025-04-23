"use client"

import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas, useFrame, Vector3 } from '@react-three/fiber';
import { Leva } from 'leva';
import { Mesh } from "three";

export function Map1() {
    return <>
        <Leva theme={{ sizes: { rootWidth: '340px', controlWidth: '150px' } }} />
        <div id='html_'>
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
                // mapStyle="https://api.maptiler.com/maps/streets/style.json?key=TStVyyIZui04u4D9gGHQ"
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
                <Canvas style={{ pointerEvents: 'none' }} latitude={51} longitude={0}>
                    <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} intensity={Math.PI} />
                    <object3D>
                        {/* <mesh>
                            <boxGeometry args={[1, 1, 1]} />
                            <meshStandardMaterial />
                        </mesh> */}
                        <Cube position={[0, 0, 0]}></Cube>
                    </object3D>
                </Canvas>
            </Map>
        </div>
    </>
}


const Cube: React.FC<{ position: Vector3 }> = () => {
    const ref = React.useRef<Mesh>(null)
    // Hold state for hovered and clicked events
    const [hovered, hover] = React.useState(false)
    const [clicked, click] = React.useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
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