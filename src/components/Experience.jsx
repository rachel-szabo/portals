import { Html, Text, CameraControls, Sky, Cloud, Float, ContactShadows, RoundedBox, MeshPortalMaterial, Environment, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, {useRef, useState, useEffect, useMemo} from "react";
import * as THREE from 'three'
import { easing } from 'maath'
import { useControls } from 'leva'
import './Experience.css'
import Perlin from "./Perlin";

export default function Experience () {

    const [active, setActive] = useState(null)
    const controlsRef = useRef()

    // const map = useTexture('/textures/anime_art_style_inside_of_a_cosy_cafe_on_a_50m_wid.jpg')

    // const map = useTexture('/textures/mayanUtopia.hdr')

    const scene = useThree((state) => state.scene)

    useEffect(() => {
        if(active) {
            const targetPos = new THREE.Vector3()
            scene.getObjectByName(active).getWorldPosition(targetPos)
            
            controlsRef.current.setLookAt(
              0,0,4,                                    //the pos of our camera
              targetPos.x, targetPos.y, targetPos.z,    //the pos of our target
              true                                      //if we animate it or not
            )
          } else {
            controlsRef.current.setLookAt(
              0,0,10,
              0,0,0,
              true
            )
          }
    }, [active])

    return <>
        
        <Sky 
            distance={20000} 
            sunPosition={[-10, 10, 0]} 
            blur={0}
            inclination={100} 
            azimuth={1}
        />
        <ambientLight/>
        <ContactShadows position={[0,-2,0]} opacity={3} scale={11.5} blur={2} far={10} resolution={256} color="#000000" />

        <CameraControls 
            ref={controlsRef}
            maxPolarAngle={Math.PI/2} 
            minPolarAngle={Math.PI/3.5} 
            maxAzimuthAngle={Math.PI/2.7} 
            minAzimuthAngle={-Math.PI/2.7} 
            minDistance={3} 
            maxDistance={9}
        />
            
        <Portal 
            name='ONE' 
            portalPosX={-2.8} 
            portalPosZ={0} 
            portalRotationY={Math.PI/8}
            cloudColor='black'
            active={active}
            setActive={setActive}
            cloudPosY={2}
        >
            <mesh position={[0,0,-3]}>
                <sphereGeometry args={[1,64,64]} />
                <meshNormalMaterial/>
            </mesh>
            <ContactShadows position={[0,-1.2,-3]} opacity={0.7} scale={2.5} blur={3} far={7} resolution={256} color="#204004" />
            <gridHelper position={[0, -1.2, 0]} args={[400,400, 'black', 'black']}/>
        </Portal>

        <Portal 
            name='TWO' 
            portalPosX={0} 
            portalPosZ={0.5}
            cloudColor='red'
            active={active}
            setActive={setActive}
            cloudPosY={-1}
        >
                <ambientLight/>
                {/* <mesh scale={0.6} position={[0,0.5,-8]} rotation-x={0.5}>
                    <cylinderGeometry args={[0, 3, 4, 8, 64]}/>
                    <meshStandardMaterial wireframe color='red'/>
                </mesh> */}
                <Perlin colorB={'#6adc99'} colorC={'#0b0b38'} />
        </Portal>

        <Portal 
            name='THREE' 
            portalPosX={2.8} 
            portalPosZ={0}
            portalRotationY={-Math.PI/8}
            cloudColor='blue'
            active={active}
            setActive={setActive}
            cloudPosY={2}
        >
            <ambientLight/>

            {/* <Html 
                as="div" 
                center 
                distanceFactor={10}
                wrapperClass="portalDiv"
                clip
                position={[0,0,-2]}
                anchorY={top}
            >
                 <p>Hello</p> 
            </Html> */}

            <Environment position={[0,2,0]} background files='textures/mayanUtopia.hdr' blur={0}/>
        </Portal>

        <Perlin colorB={'white'} colorC={'black'}/>
        
    </>
}

const Portal = ({children, portalPosX, portalPosZ, cloudColor, name, portalRotationY, active, setActive, cloudPosY, ...props}) => {

    const [multFactor, setMultFactor] = useState(1)
    const portalRef = useRef()

    useFrame((_state, delta) => {
        const worldOpen = active === name
        easing.damp(portalRef.current, 'blend', worldOpen ? 1 : 0, 0.2, delta)
    })

    return <>
        <Float floatIntensity={0.9} rotationIntensity={0} >

        <group 
            scale={multFactor} 
            // onPointerEnter={() => {THREE.MathUtils.mapLinear(setMultFactor(1), setMultFactor(1.15))}} 
            // onPointerLeave={() => {setMultFactor(1)}}
            onDoubleClick={() => setActive(active === name ? null : name)}
            rotation-y={portalRotationY}
            position-z={portalPosZ}
        >
            <Text
                fontSize={0.4}  
                position={[0,2,0.051]}
                anchorY={'top'}
                color={cloudColor}
                position-x={portalPosX}
                font="/fonts/HeartWave Regular.ttf"
            >
                {name}
            </Text>
            
            <RoundedBox 
                args={[2, 3, 0.07]} 
                position={[portalPosX,0.05,0]}
                name={name}
            >
                <MeshPortalMaterial ref={portalRef}>
                    {children}
                    <Cloud 
                        position={[0, cloudPosY, -17.1]} 
                        color={cloudColor} 
                        opacity={0.5} 
                        speed={0.2} 
                        width={10} 
                        depth={2.7} 
                        segments={10}
                    />
                </MeshPortalMaterial>
            </RoundedBox>

            <RoundedBox args={[2.2, 3.3, 0.01]} position-x={portalPosX}>
                <meshStandardMaterial color={'black'}/>
            </RoundedBox>
        </group>
        </Float>
    </>
}