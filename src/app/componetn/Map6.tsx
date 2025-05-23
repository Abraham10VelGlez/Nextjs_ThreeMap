"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';
// import { Suspense } from 'react';
export function Map6() {

    const geoToPosition = (latitude: number, longitude: number, centerLat: number, centerLng: number) => {
        const scale = 100000; // ajusta a tu escala de escena
        const x = (longitude - centerLng) * scale;
        const z = (latitude - centerLat) * -scale;
        return [x, 10, z];
    }

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

                    <mesh position={geoToPosition(19.292237055650876, -99.65116356875802, 19.292536964352422, -99.65691804395397)}>
                        <torusGeometry args={[10, 3, 16, 100]} />
                        <meshStandardMaterial color={'#836FFF'} />
                    </mesh>

                    <mesh position={geoToPosition(19.290490928757578, -99.65658261315416, 19.292536964352422, -99.65691804395397)}>
                        <torusGeometry args={[10, 3, 16, 100]} />
                        <meshStandardMaterial color={'#836FFF'} />
                    </mesh>


                    <mesh position={geoToPosition(19.2952524458973, -99.66548887609744, 19.292536964352422, -99.65691804395397)}>
                        <torusGeometry args={[10, 3, 16, 100]} />
                        <meshStandardMaterial color={'#FF3EA5'} />
                    </mesh>

                    <mesh position={geoToPosition(19.295493095684098, -99.65703015356156, 19.292536964352422, -99.65691804395397)}>
                        <torusGeometry args={[10, 3, 16, 100]} />
                        <meshStandardMaterial color={'#FF3EA5'} />
                    </mesh>

                </Canvas>
            </Map>
        </div>
    </>
}