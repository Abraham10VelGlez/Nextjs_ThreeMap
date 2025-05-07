"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva, levaStore, useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { FC, useEffect, useState } from "react";
import { Coordinates, CoordinatesProps, NearCoordinates } from "react-three-map";
import { Vector3, ColorRepresentation } from 'three';

enum CoordinatesType {
    NearCoordinates = 'NearCoordinates',
    Coordinates = 'Coordinates',
}

export function Map4() {
    useControls({
        overlay: {
            value: false,
        },
    });

    const { green, purple, scale } = useControls({
        scale: 1,
        blue: {
            value: [-0.1261, 51.508775],
            pad: 6,
            step: 0.000001,
        },
        green: {
            value: [-0.1261, 51.508775],
            pad: 6,
            step: 0.000001,
        },
        purple: {
            value: [-0.1261, 51.508756],
            pad: 6,
            step: 0.000001,
        },
    })

    useEffect(() => {
        levaStore.setValueAtPath('overlay', false, true);
    }, [])

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
                    // longitude:  blue[0],
                    // latitude:  blue[1],
                    zoom: 16,
                    pitch: 70,
                    //bearing: 0,
                }}
                style={{ width: 1000, height: 1000 }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            >
                <Canvas shadows latitude={19.292536964352422} longitude={-99.65691804395397}>
                    <hemisphereLight args={["#ffffff", "#60666C"]} position={[1, 4.5, 3]} intensity={Math.PI} />
                    <MyBox scale={scale} position={[2, 0, 0]} color="blue" />
                    <CoordsControl
                        longitude={green[0]}
                        latitude={green[1]}
                    >
                        <MyBox scale={scale} position={[-2, 0, 0]} color="green" />
                    </CoordsControl>
                    <CoordsControl
                        longitude={purple[0]}
                        latitude={purple[1]}
                    >
                        <MyBox scale={scale} color="purple" />
                    </CoordsControl>

                </Canvas>
            </Map>
        </div >
    </>
}


const CoordsControl: FC<CoordinatesProps> = (props) => {
    const { coords } = useControls({
        coords: {
            value: CoordinatesType.Coordinates,
            options: CoordinatesType
        }
    })

    return <>
        {coords === CoordinatesType.Coordinates && <Coordinates {...props} />}
        {coords === CoordinatesType.NearCoordinates && <NearCoordinates {...props} />}
    </>
}

const MyBox = ({
    position = [0, 0, 0],
    color,
    scale: initialScale,
}: {
    position?: Vector3;
    scale: number;
    color: ColorRepresentation;
}) => {
    const [hovered, setHovered] = useState(false);
    const scale = hovered ? initialScale * 1.5 : initialScale;
    const height = 7;

    return (
        <group position={position}>
            <mesh
                position={[0, scale * height * 0.5, 0]}
                scale={[scale, scale, scale]}
                //onClick={() => setHovered(!hovered)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[1, height, 1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
};
