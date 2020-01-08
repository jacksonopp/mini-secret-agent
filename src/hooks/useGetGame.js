import { useEffect } from 'react'

export function useGetGame(snapshot, callback) {
  useEffect(() => {
    // console.log("snamshot 0", snapshot[0])
    const game = snapshot[0] ? snapshot[0].data() : { message: "invalid key" }
    callback(game)
  }, [snapshot]);

}
