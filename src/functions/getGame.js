import { useEffect } from 'react'

export function getGame(snapshot) {
  const game = snapshot[0] ? snapshot[0].data() : {}
  return game
}