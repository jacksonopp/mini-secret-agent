import { useEffect, useState } from 'react'
import { random } from 'lodash'
import { useFirestore } from '../firebase/firestore'

export function useModel() {

  // create simple key
  const [simpleKey, setSimpleKey] = useState("")
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  useEffect(() => {
    let key = ""
    for (let i = 0; i < 6; i++) {
      key += letters.charAt(random(0, 25))
    }
    setSimpleKey(key)
  }, [])



  // get random master prompt
  const [randomMasterId, setRandomMasterId] = useState(0);
  const [masterPrompt, setMasterPrompt] = useState("")
  const { documentSnapshots: dataPrompt } = useFirestore("prompts", { doc: `${randomMasterId}` })
  // generate random id
  useEffect(() => {
    setRandomMasterId(random(1, 99))
  }, [])

  // get prompt data
  async function getMaster() {
    try {
      const prompt = await dataPrompt[0] ? dataPrompt[0].data().prompt : { prompt: null }
      setMasterPrompt(prompt)
      console.log(masterPrompt)
    } catch (error) {
      console.log(error)
    }
  }

  // effect to trigger async
  useEffect(() => {
    getMaster()
  }, [dataPrompt])


  // send game to db
  const { collectionRef: gamesRef } = useFirestore("games")
  function postGame(gameName, hostName, numOfPlayers) {
    const data = {
      gameName,
      hostName,
      numOfPlayers,
      masterPrompt,
      simpleKey
    }
    gamesRef.add(data)
    return data
  }
  return { simpleKey, postGame }
}