import * as THREE from 'three'
import { LayerMaterial, Noise } from "lamina"
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export default function Perlin ({colorA, colorB, colorC, ...props}){

    const perRef = useRef()

    useFrame((state, delta) => {
        delta /= 4
        perRef.current.offset.x += (Math.random() * 4) * Math.sin(delta * 8)
        perRef.current.offset.y -= delta * 1
        perRef.current.offset.z += Math.sin(delta / 10) * ((Math.random() * 2 ) - (delta*delta))
    })

    return <>

        <mesh>
            <sphereGeometry args={[200,64,64]}/>
            <LayerMaterial
                side={THREE.BackSide}
            >
                <Noise
                    ref={perRef} 
                    type='perlin' 
                    scale={0.0095}
                    colorA={colorA}
                    colorB={colorB}
                    colorC={colorC}
                    colorD={colorA}
                    mapping='local'
                    offset={[5.5,-1.9,-0.5]}
                    strength={16}
                >
                </Noise>
            </LayerMaterial>
        </mesh>
    </>
}