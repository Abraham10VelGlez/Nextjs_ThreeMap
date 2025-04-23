"use client"
import * as React from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../css/styles.css'
import { Canvas } from "react-three-map/maplibre";
import { Leva } from 'leva';

export function Map4() {
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
                        scale={100}
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

        </>
    )

}
