"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function Map3() {
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
                    zoom: 16,
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
                    <object3D
                        scale={30}
                    >
                        {/* AQUI VAN LOS MODELOS, SCENAS Y TODO LO QUE SEA 3D */}
                        <Component_models />
                    </object3D>
                </Canvas>
            </Map>
        </div>
    </>
}

const Component_models = () => {
    return (
        <>
            <Words></Words>
            <Marker></Marker>
        </>
    )

}

const Marker = () => {
    const ref = React.useRef<THREE.Group>(null)
    useFrame((_state, delta) => {
        if (!ref.current) return;
        ref.current.rotation.y += delta;
    })
    return (
        <mesh ref={ref}
            position={[0, 1, 0]}
            scale={0.2}
        >
            <octahedronGeometry
                args={[2, 0, 0]}
            />
            <meshStandardMaterial
                color={'#1B56FD'}
                opacity={0.6}
                transparent={true}
            />
        </mesh>
    )
}

const Words = () => {
    const meshRef = React.useRef<THREE.Mesh>(null);
    const [textGeo, setTextGeo] = React.useState<THREE.BufferGeometry | null>(null);

    React.useEffect(() => {
        const loader = new FontLoader();
        //consultar mas tipos de letras y fuentes en link: https://fonts.google.com/?query=Christian+Robertson
        /// convertidor de fuentes de tiff a .json https://gero3.github.io/facetype.js/
        // loader.load('/fonts/Roboto SemiCondensed_Bold.json', (font) => {
        loader.load('/fonts/Titan One_Regular.json', (font) => {
            const geometry = new TextGeometry('Mi ubicación =)', {
                font: font,
                size: 0.3,
                height: 5, // reduce esto para que no se vea tan "estirado"
                curveSegments: 12,
                bevelEnabled: false,
            });
            geometry.center(); // Centrar el texto
            setTextGeo(geometry);
        });
    }, []);

    if (!textGeo) return null;

    return (
        <mesh
            position={[0, 2, 0]}
            ref={meshRef}
            geometry={textGeo}
            scale={[1, 1, 0]} // Z bajo para hacerlo menos profundo
        >
            <meshStandardMaterial color="#000000" />
        </mesh>
    );
};
