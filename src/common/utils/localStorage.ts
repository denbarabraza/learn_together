import { RootStateType } from 'store/store'

const KEY = 'packs/cards'

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY)

    if (!serializedState) return undefined

    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: RootStateType) {
  let card = state.card
  let packs = state.packs
  let lsData = { card, packs }

  try {
    const serializedState = JSON.stringify(lsData)

    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    // Ignore
  }
}
