import { Float, RoundedBox, ContactShadows, Cloud, MeshPortalMaterial } from "@react-three/drei";
import * as THREE from 'three'
import { useState } from "react";

function Portal({children, positionX, ...props}) {

    const [multFactor, setMultFactor] = useState(1)
    const [portalPosX, setPortalPosX] = useState(0)

    return <>
        {/* <Float floatIntensity={0.8} rotationIntensity={0.1} > */}
            <group scale={multFactor} onPointerEnter={() => {setMultFactor(1.15)}} onPointerLeave={() => {setMultFactor(1)}}>
            <RoundedBox args={[2, 3, 0.07]} position={[portalPosX,0.05,0]}>
                <MeshPortalMaterial>
                    {children}
                    {/* <Cloud position={[0,2,-17.1]} opacity={0.3} speed={0.3} width={10} depth={1} segments={20}/> */}
                </MeshPortalMaterial>

            </RoundedBox>

            <RoundedBox args={[2.2, 3.3, 0.06]} transparent>
                <meshStandardMaterial color={'black'}/>
            </RoundedBox>
            </group>
        
    </>
}
