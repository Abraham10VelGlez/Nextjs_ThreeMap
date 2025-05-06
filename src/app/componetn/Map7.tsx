"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';
import Model from './Model';

export function Map7() {

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

                    <Model position={geoToPosition(19.31396247417896, -99.64117143331653, 19.292536964352422, -99.65691804395397)}></Model>

                </Canvas>
            </Map>
        </div>
    </>
}
