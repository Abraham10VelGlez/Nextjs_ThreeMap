"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';
// import { Suspense } from 'react';
export function Map6() {
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

                  


                </Canvas>
            </Map>
        </div>
    </>
}


