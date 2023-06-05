import { RootState } from "../type"

  export const CharSelector = (state: RootState) =>
  state.charachters
  export const CharArraySelector = (state: RootState) =>
  state.charachters.charArray
  export const SelectedChar = (state: RootState) =>
  state.charachters.selectedChar
