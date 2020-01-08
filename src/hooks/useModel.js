import { useEffect } from 'react'
import { random } from 'lodash'

export function useModel(dataRef, gameName, hostName, numOfPlayers) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let simpleKey = ""
  for (let i = 0; i < 6; i++) {
    simpleKey += alphabet.charAt(random(0, 25))
  }

  const data = {
    gameName,
    hostName,
    numOfPlayers,
    simpleKey,
    masterGoal: "master goal",
    players: [
      {
        name: "Jackson",
        goals: [
          ["goal 1", false], //tuples
          ["goal 2", false],
          ["goal 3", false],
          ["goal 4", false],
          ["goal 5", false],
        ]
      },
      {
        name: "Brian",
        goals: [
          ["goal 1", false], //tuples
          ["goal 2", false],
          ["goal 3", false],
          ["goal 4", false],
          ["goal 5", false],
        ]
      },
    ]
  }

  useEffect(async () => {
    await dataRef.add(data)
  }, [dataRef])

  return { simpleKey, data }
}