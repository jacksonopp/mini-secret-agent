import { useEffect, useState } from 'react'
import { random } from 'lodash'
import { useFirestore } from '../firebase/firestore'
import { each } from 'async'

export function useGetPrompts() {
  // get random prompt numbers
  const [promptIds, setPromptIds] = useState([])
  const [prompts, setPrompts] = useState([])

  useEffect(() => {
    const ids = []
    for (let i = 0; i < 5; i++) {
      let randomNumber = random(0, 99)
      if (!ids.includes(randomNumber)) {
        ids.push(randomNumber)
      } else {
        i--
      }
    }
    setPromptIds(ids)
  }, []);

  // get the prompts using the random ids
  const { collectionRef: promptRef } = useFirestore("prompts")

  const dbPrompts = []
  async function getPrompts() {
    each(
      promptIds,
      async id => {
        try {
          const dbPrompt = await promptRef.doc(`${id}`).get()
          dbPrompts.push({ goalName: await dbPrompt.get("prompt"), isCompleted: false })
          if (dbPrompts.length === 5) {
            setPrompts(dbPrompts)
          }
        } catch (error) {
          console.log(error)
        }
      }
    )
  }

  useEffect(() => {
    getPrompts()
  }, [promptRef])
  return { prompts }
}