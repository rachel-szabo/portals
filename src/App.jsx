import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { EffectComposer } from 'postprocessing'
import { useProgress, Html } from '@react-three/drei'
import { Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'

function Loader () {
  const { active, progress, errors, item, loaded, total } = useProgress()
  console.log(item)
  
  return <Html center>
        <div wrapperClass='loadingScreen'>
          {progress} % loaded
        </div>
      </Html>
}


function App() {

  return <>
    <Canvas gl={{ localClippingEnabled: true }} shadows camera={{ position: [-0.15, 0, 7], fov: 40}}>
      <Suspense fallback={<Loader/>}>
        <Experience/>
      </Suspense>
      {/* <EffectComposer/> */}
      
    </Canvas>
    <LoadingScreen/>
  </>
}

export default App
