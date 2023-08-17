import { Html, Text, CameraControls, Cloud, Float, 
         ContactShadows, RoundedBox,      
         MeshPortalMaterial, MeshReflectorMaterial,            
         Environment, useTexture 
        } 
    from "@react-three/drei";

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
    const sphereRef = useRef()

    const map = useTexture('/textures/mayanUtopia.jpg')
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
              0,1,10,
              0,0,0,
              true
            )
          }
    }, [active])

    useFrame((_state, delta) => {
        const worldOpen = active 
        easing.damp(sphereRef.current, 'position-y', worldOpen ? 1 : 5, 0.5, delta)
    })

    return <>

        {/* ATMOSPHERE /SHADOW + LIGHT */}
        
        <ambientLight/>
        <pointLight position={[0,60,90]} castShadow/>
        <ContactShadows position={[0,-2,0]} opacity={3} scale={11.5} blur={2} far={10} resolution={256} color="#000000" />



        {/* CONTROLS */}

        <CameraControls 
            ref={controlsRef}
            maxPolarAngle={Math.PI/2} 
            minPolarAngle={Math.PI/3.5} 
            maxAzimuthAngle={Math.PI/2.7} 
            minAzimuthAngle={-Math.PI/2.7} 
            minDistance={3} 
            maxDistance={9}
        />



        {/*  THE THREE PORTALS + THEIR CONTENTS   */}
            
        <Portal 
            name='ONE' 
            portalPosX={-2.8} 
            portalPosZ={0} 
            portalRotationY={Math.PI/8}
            cloudColor='black'
            active={active}
            setActive={setActive}
            cloudPosY={2.5}
            cloudPosZ={-20.1}
        >

            <ambientLight/>
            <pointLight position={[-10, 10, 5]}/>

            <mesh position={[0,0,-3]} ref={sphereRef}>
                <sphereGeometry args={[1,64,64]} />
                <meshStandardMaterial color='red'/>
            </mesh>

            <Text
                position={[-2,0,-3]}
                fontSize={0.4}  
                font="/fonts/HeartWave Regular.ttf"
                color={'black'}
                maxWidth={1.2}
                textAlign="right"
            >
                Hi how
                are you?
            </Text>

            <Text
                position={[2,0,-3]}
                fontSize={0.4}  
                font="/fonts/HeartWave Regular.ttf"
                color={'black'}
                maxWidth={1.2}
                textAlign="left"
            >
                Pretty good and you?
            </Text>
            
            <gridHelper position={[0, -1.2, 0]} args={[170,170, 'black', 'black']}/>
        </Portal>


        <Portal 
            name='TWO' 
            portalPosX={0} 
            portalPosZ={0.5}
            cloudColor='red'
            active={active}
            setActive={setActive}
            cloudPosY={0.4}
            cloudPosZ={-20.1}
        >
                <ambientLight/>
                <Perlin colorA={'black'} colorB={'#6adc99'} colorC={'#0b0b38'} />

                <Text
                    position={[0,0,-2.8]}
                    fontSize={0.15}  
                    font="/fonts/HeartWave Regular.ttf"
                    color={'black'}
                    maxWidth={25}
                    textAlign="center" 
                >
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                                                    Go into a room to decide you didn't want to be in there anyway drink from the toilet
                                                    Walk on a keyboard skid on floor, crash into wall so tickle my belly at your own peril i will pester for food when you're in the kitchen even if it's salad . Leave hair everywhere cat walks in keyboard yet sit on human they not getting up ever. I just saw other cats inside the house and nobody ask me before using my litter box claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? stuff and things meow loudly just to annoy owners hunt by meowing loudly at 5am next to human slave food dispenser so throw down all the stuff in the kitchen munch on tasty moths. Sit by the fire attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently so if it fits, i sits but cat slap dog in face sit by the fire try to jump onto window and fall while scratching at wall. Rub face on owner crusty butthole when in doubt, wash and poop on grasses need to chase tail. Eat owner's food ð•„ð”¼ð•†ð•Ž. Bawl under human beds stretch out on bed iâ€™m so hungry iâ€™m so hungry but ew not for that for cough hairball, eat toilet paper and kitty power. Lick arm hair nyaa nyaa but chew iPad power cord, for sleep. Murf pratt ungow ungow pretend you want to go out but then don't hiss at vacuum cleaner. Hey! you there, with the hands cats woo. Cattt catt cattty cat being a cat brown cats with pink ears, when in doubt, wash chase ball of string for intently sniff hand.

                                                    Eat too much then proceed to regurgitate all over living room carpet while humans eat dinner destroy couch give me some of your food give me some of your food give me some of your food meh, i don't want it. Kitty pounce, trip, faceplant you didn't see that no you didn't definitely didn't lick, lick, lick, and preen away the embarrassment the door is opening! how exciting oh, it's you, meh. Bleghbleghvomit my furball really tie the room together. Always ensure to lay down in such a manner that tail can lightly brush human's nose purr while eating it's 3am, time to create some chaos kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff make plans to dominate world and then take a nap for present belly, scratch hand when stroked for shake treat bag. Chew master's slippers relentlessly pursues moth ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss so meow or fart in owners food cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Kitty. I want to go outside let me go outside nevermind inside is better sit on human they not getting up ever. Climb a tree, wait for a fireman jump to fireman then scratch his face sitting in a box enslave the hooman for get video posted to internet for chasing red dot or present belly, scratch hand when stroked. Unwrap toilet paper attack curtains hate dog i see a bird i stare at it i meow at it i do a wiggle come here birdy and cats are fats i like to pets them they like to meow back. Weigh eight pounds but take up a full-size bed see owner, run in terror. Eat owner's food run up and down stairs. Weigh eight pounds but take up a full-size bed. Nap all day whatever and take a big fluffing crap ðŸ’© really likes hummus. Scamper human is behind a closed door, emergency! abandoned! meeooowwww!!! stretch out on bed and pee in human's bed until he cleans the litter box. Eat an easter feather as if it were a bird then burp victoriously, but tender twitch tail in permanent irritation hide head under blanket so no one can see. Toy mouse squeak roll over. Furrier and even more furrier hairball run as fast as i can into another room for no reason suddenly go on wild-eyed crazy rampage cat jumps and falls onto the couch purrs and wakes up in a new dimension filled with kitty litter meow meow yummy there is a bunch of cats hanging around eating catnip yet scratch me there, elevator butt but stare out cat door then go back inside. Fight own tail meow meow yet meowsiers yet eat too much then proceed to regurgitate all over living room carpet while humans eat dinner. Sleeping in the box destroy couch, yet allways wanting food and spread kitty litter all over house and meow. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now, ignore the squirrels, you'll never catch them anyway have my breakfast spaghetti yarn. Try to jump onto window and fall while scratching at wall sniff other cat's butt and hang jaw half open thereafter meow meow you are my owner so here is a dead rat. Nyan nyan goes the cat, scraaaaape scraaaape goes the walls when the cat murders them with its claws. Eat all the power cords murf pratt ungow ungow.

                                                    Snuggles up to shoulders or knees and purrs you to sleep hiiiiiiiiii feed me now always hungry jump five feet high and sideways when a shadow moves purr like a car engine oh yes, there is my human slave woman she does best pats ever that all i like about her hiss meow . Scratch leg; meow for can opener to feed me cats secretly make all the worlds muffins cough furball thug cat . Experiences short bursts of poo-phoria after going to the loo ooh, are those your $250 dollar sandals? lemme use that as my litter box lick sellotape or toilet paper attack claws fluff everywhere meow miao french ciao litterbox but catch mouse and gave it as a present if it smells like fish eat as much as you wish making sure that fluff gets into the owner's eyes. I could pee on this if i had the energy need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me and run off table persian cat jump eat fish. Loves cheeseburgers i is playing on your console hooman jump on fridge but claw drapes making bread on the bathrobe. Good now the other hand, too intently stare at the same spot. Jump on human and sleep on her all night long be long in the bed, purr in the morning and then give a bite to every human around for not waking up request food, purr loud scratch the walls, the floor, the windows, the humans sleeps on my head meowsiers murf pratt ungow ungow make meme, make cute face need to chase tail. Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss ask to be pet then attack owners hand, so human give me attention meow chew master's slippers for catching very fast laser pointer, cough hairball on conveniently placed pants more napping, more napping all the napping is exhausting.
                </Text>
        </Portal>


        <Portal 
            name='THREE' 
            portalPosX={2.8} 
            portalPosZ={0}
            portalRotationY={-Math.PI/8}
            cloudColor='#00C0F0'
            active={active}
            setActive={setActive}
            cloudPosY={6}
            cloudPosZ={-17.1}
        >
            <ambientLight/>

            {/* <Environment 
                position={[0,2,0]} 
                background={{height:30, radius:30, scale:100}} 
                files='textures/mayanUtopia.hdr' 
                blur={0}
                resolution={256}

            ></Environment> */}
            <mesh position={[0,-2,0]} castShadow={false}>
                <sphereGeometry args={[6,64,64]}  castShadow={false}/>
                <meshBasicMaterial map={map} side={THREE.BackSide}  castShadow={false}/>
            </mesh>

        </Portal>

        <Perlin colorA={'white'} colorB={'white'} colorC={'#bbccff'}/>

    </>
}




// PORTAL COMPONENT ********

const Portal = ({children, portalPosX, portalPosZ, portalRotationY, cloudColor, cloudPosY, cloudPosZ, name, active, setActive, ...props}) => {

    const [multFactor, setMultFactor] = useState(1)
    const portalRef = useRef()

    useFrame((_state, delta) => {
        const worldOpen = active === name
        easing.damp(portalRef.current, 'blend', worldOpen ? 1 : 0, 0.18, delta)
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
                    position={[0,2,0.025]}
                    anchorY={'top'}
                    color={cloudColor}
                    position-x={portalPosX}
                    font="/fonts/HeartWave Regular.ttf"
                >
                    {name}
                </Text>
                
                <RoundedBox 
                    args={[2, 3, 0.079]} 
                    position={[portalPosX,0.05,0]}
                    name={name}
                >
                    <MeshPortalMaterial ref={portalRef}>
                        {children}
                        <Cloud 
                            position={[0, cloudPosY, cloudPosZ]} 
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

                {/* <RoundedBox 
                    args={[2, 3, 0.02]} 
                    position={[portalPosX, 0.05, 0.03]}
                    // transparent
                    // opacity={0.5}
                >
                    <MeshReflectorMaterial 
                        transparent
                        blur={[0,0]}
                        mixStrength={1}
                        mixContrast={1}
                        mirror={1}
                        resolution={1024}
                        opacity={0.8}
                    />
                </RoundedBox> */}
            </group>
        </Float>
        
    </>
}