import {CharacterBaseParameters} from '../models/Character/CharacterBaseParameters'
import {CharacterDependentParameters} from '../models/Character/CharacterDependentParameters'
import {CharacterSkills} from '../models/Character/CharacterSkills'
import {Character} from '../models/Character/Character'

export const useCharacterExporter = (character: Character) => {
  const exportedObject: any = {
    name: character.name,
    baseParameters: {},
    dependentParameters: {},
    skills: {},
  }

  Object.keys(character.baseParameters).forEach(parameterKey => {
    const key = parameterKey as keyof CharacterBaseParameters
    exportedObject.baseParameters[key] = character.baseParameters[key].value
  })

  Object.keys(character.dependentParameters).forEach(parameterKey => {
    const key = parameterKey as keyof CharacterDependentParameters
    exportedObject.dependentParameters[key] = character.dependentParameters[key].value
  })

  Object.keys(character.skills).forEach(parameterKey => {
    const key = parameterKey as keyof CharacterSkills
    exportedObject.skills[key] = character.skills[key].level
  })

  const download = () => {
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportedObject))

    const a = document.createElement('a')
    a.setAttribute('href', data)
    a.setAttribute('download', 'character.json')

    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return {
    download,
  }
}