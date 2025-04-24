"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { useFrame, useThree, Vector3 } from '@react-three/fiber';
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';
import { MathUtils } from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { Suspense } from 'react';
export function Map5() {
    return <>
        <Leva theme={{ sizes: { rootWidth: '340px', controlWidth: '150px' } }} />
        <div id='html_' >
            <Map
                canvasContextAttributes={{ antialias: true, }}
                initialViewState={{
                    latitude: 19.292536964352422,
                    longitude: -99.65691804395397,
                    zoom: 15,
                    pitch: 60,
                }}
                style={{ width: 1000, height: 1000 }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
                <Canvas
                    latitude={19.292536964352422} longitude={-99.65691804395397}>
                    <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} intensity={Math.PI} />

                    <Suspense fallback={null}>
                        <Cube position={[0, 0, 0]} />
                    </Suspense>


                </Canvas>
            </Map>
        </div>
    </>
}

const Cube: React.FC<{ position: Vector3 }> = () => {

    const [hovered, setHovered] = React.useState(false)
    const textRef = React.useRef<THREE.Mesh>(null); // Hace que el texto siempre mire a la cámara 4
    const [textGeo, setTextGeo] = React.useState<THREE.BufferGeometry | null>(null);
    const { camera } = useThree(); // Hace que el texto siempre mire a la cámara 3

    React.useEffect(() => {
        const loader = new FontLoader();
        loader.load('/fonts/Titan One_Regular.json', (font) => {
            const geometry = new TextGeometry('Centro de Toluca', {
                font: font,
                size: 0.3,
                height: 0.01,
                curveSegments: 12,
                bevelEnabled: false,
            });
            geometry.center();
            setTextGeo(geometry);
        });
    }, []);
    // Hace que el texto siempre mire a la cámara2
    useFrame(() => {
        if (textRef.current) {
            textRef.current.lookAt(camera.position);
        }
    });

    if (!textGeo) return null;

    return (
        <group>
            <mesh
                position={[0, 15, 0]}
                ref={textRef} // Hace que el texto siempre mire a la cámara 1
                geometry={textGeo}
                scale={[10, 10, 0]} // Z bajo para hacerlo menos profundo
            >
                <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh
                position={[0, 0, 0]}
                rotation={[0, MathUtils.degToRad(45), 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[10, 10, 10]} />
                <meshStandardMaterial color={hovered ? '#14C38E' : '#B8F1B0'} />
            </mesh>
        </group>
    )
}
