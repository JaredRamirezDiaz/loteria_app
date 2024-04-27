
import React, { useEffect, useState } from 'react'
import { CARDS } from '../Utils/Constants'
import { AnimatePresence, motion } from 'framer-motion'




export default function HomePage() {
    const [activeCard, setActiveCard] = useState(null)
    const [showedCards, setShowedCards] = useState([])
    const [deck, setDeck] = useState(CARDS)
    const [audio, setAudio] = useState(null)


    useEffect(() => {
        if (activeCard!=null) {

            const audio = new Audio(`pistas/${activeCard?.audioName}`)
            console.log(audio)
            audio.play()
            setAudio(audio)
            
            

        }

    }, [activeCard])


    const handleRepeatAudio = () => {
        const audio = new Audio(`pistas/${activeCard?.audioName}`)
        console.log(audio)
        audio.play()
    }

    const takeNewCard = () => {
        setActiveCard(null)

        //set timeout to show the card
        setTimeout(() => {
            setShowedCards([...showedCards, activeCard])

            const randomCard = Math.floor(Math.random() * deck.length)
            const newCard = deck[randomCard]
            const newDeck = deck.filter(card => card.id !== newCard.id)

            setActiveCard(newCard)
            setDeck(newDeck)
        }, 500)


    }



    return (
        <motion.div
            style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',

            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 20,
                    alignItems: 'center',
                    width: '100%',
                    height: '60px',
                }}
            >
                <button onClick={takeNewCard}>Siguiente carta ({deck.length})</button>
                <button onClick={handleRepeatAudio}>🔊</button>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 'calc(100vh - 60px)',
                    
                }}
            >

                <AnimatePresence
                >
                    {activeCard && (
                        <motion.div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
                                padding: '0 20px 20px 20px',
                            }}
                            key={activeCard.id}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            exit={{ x: -300, opacity: 0, transition: { duration: 0.1 } }}
                        >

                            <h2>{activeCard.title}</h2>
                            <img src={`images/${activeCard.fileName}`} alt={activeCard.title} />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

        </motion.div>
    )
}

