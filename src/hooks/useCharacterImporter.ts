import {Character} from "../models/Character/Character"
import {CharacterBaseParameters} from "../models/Character/CharacterBaseParameters"
import {CharacterDependentParameters} from "../models/Character/CharacterDependentParameters"
import {CharacterSkills} from "../models/Character/CharacterSkills"

export const useCharacterImporter = (ref: React.RefObject<HTMLInputElement>, character: Character) => {

  const change = (e: Event) => {
    if (!ref.current) {
      return
    }

    const files = ref.current.files

    if (!files) {
      return
    }

    if (files.length < 1) {
      return
    }

    const file = files[0]

    const reader = new FileReader()
    reader.onload = read
    reader.readAsText(file)

    ref.current.value = ''
  }

  const read = (e: ProgressEvent<FileReader>) => {
    if (!e.target) {
      alert('Не удается прочитать файл')
      return
    }

    const jsonStr = e.target.result as string

    try {
      setCharacterFields(jsonStr)
    } catch (e) {
      alert('Файл не соответствует формату')
    }
  }

  const setCharacterFields = (jsonStr: string) => {
    const json = JSON.parse(jsonStr)

    character.name = json.name

    Object.keys(json.baseParameters).forEach((parameterKey: any) => {
      const key = parameterKey as keyof CharacterBaseParameters
      character.baseParameters[key].value = json.baseParameters[key]
    })

    Object.keys(json.dependentParameters).forEach((parameterKey: any) => {
      const key = parameterKey as keyof CharacterDependentParameters
      character.dependentParameters[key].value = json.dependentParameters[key]
    })

    Object.keys(json.skills).forEach((parameterKey: any) => {
      const key = parameterKey as keyof CharacterSkills
      character.skills[key].level = json.skills[key]
    })
  }

  const upload = () => {
    if (!ref.current) {
      alert('Не удается выбрать файл')
      return
    }

    ref.current.click()
    ref.current.onchange = change
  }

  return {
    upload,
    change,
  }
}