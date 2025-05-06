import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

type GLTFResult = THREE.Group & {
    nodes: {
        [key: string]: THREE.Mesh | THREE.SkinnedMesh
    }
    materials: {
        [key: string]: THREE.Material
    }
    animations: THREE.AnimationClip[]
}

export default function Model({ position }: { position: [number, number, number] }) {
    const group = useRef<THREE.Group>(null!)
    const gltf = useLoader(GLTFLoader, 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf') as unknown as GLTFResult

    const mixer = useRef<THREE.AnimationMixer>()

    useEffect(() => {
        if (gltf.animations.length && group.current) {
            mixer.current = new THREE.AnimationMixer(group.current)
            gltf.animations.forEach((clip) => {
                const action = mixer.current!.clipAction(clip)
                action.play()
            })
        }


    }, [gltf])

    useFrame((state, delta) => {
        mixer.current?.update(delta)
    })
    return (
        <group position={position} ref={group} dispose={null}>
            <group rotation={[0, 10, 0]} scale={100}>
                <primitive object={gltf.scene} />
            </group>
        </group>
    )
}
