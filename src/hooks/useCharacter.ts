import {useRef} from "react"
import {Character} from "../models/Character/Character"

export const useCharacter = (name: string) => {
  const character = useRef(new Character(name))
  return character.current
}