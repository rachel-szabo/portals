import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import { EffectComposer } from 'postprocessing'

function App() {

  return (
    <Canvas gl={{ localClippingEnabled: true }} shadows camera={{ position: [-0.15, 0, 7], fov: 40}}>
        <Experience/>
      {/* <EffectComposer/> */}
      
    </Canvas>
    
  )
}

export default App
