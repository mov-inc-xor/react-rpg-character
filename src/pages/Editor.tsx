import React from "react"

import '../scss/index.scss'

import {useCharacter} from "../hooks/useCharacter"
import TextField from "../components/TextField/TextField"
import {Observer} from 'mobx-react'

import {Skill} from "../models/Character/Skill"
import {CharacterSkills} from "../models/Character/CharacterSkills"
import {CharacterBaseParameters} from "../models/Character/CharacterBaseParameters"
import {CharacterDependentParameters} from "../models/Character/CharacterDependentParameters"
import {useCharacterExporter} from "../hooks/useCharacterExporter"
import {useCharacterImporter} from "../hooks/useCharacterImporter"
import Button from "../components/Button/Button"

function Editor() {
  const INITIAL_NAME = ''

  const character = useCharacter(INITIAL_NAME)

  const inputFileRef = React.createRef<HTMLInputElement>()
  const characterImporter = useCharacterImporter(inputFileRef, character)
  const characterExporter = useCharacterExporter(character)

  const baseParametersKeys = Object.keys(character.baseParameters) as Array<keyof CharacterBaseParameters>
  const dependentParametersKeys = Object.keys(character.dependentParameters) as Array<keyof CharacterDependentParameters>
  const skillsKeys = Object.keys(character.skills) as Array<keyof CharacterSkills>

  return (
    <div className='container'>

      <div className='space-between'>
        <span>Уже есть персонаж?</span>
        <input type='file' ref={inputFileRef} hidden/>
        <Button onClick={characterImporter.upload}>Открыть</Button>
      </div>

      <h1 className='name'>{character.name === '' ? 'Редактор персонажа' : character.name}</h1>

      <TextField
        placeholder='Имя'
        value={character.name}
        onChange={(e) => character.name = e.target.value}/>

      <div className='block'>
        <header className='parameters-header-text'>Базовые характеристики:</header>

        {baseParametersKeys.map((key, i) => (
          <div className='space-between' key={i}>
            <span>{character.baseParameters[key].name}:</span>
            <input type='number'
                   value={character.baseParameters[key].value}
                   onChange={(e) => character.baseParameters[key].value = +e.target.value}/>
          </div>
        ))}
      </div>

      <div className='block'>
        <header className='parameters-header-text'>Зависимые характеристики:</header>
        {dependentParametersKeys.map((key, i) => (
          <div className='space-between' key={i}>
            <span>{character.dependentParameters[key].name}</span>
            <span>{character.dependentParameters[key].value}</span>
          </div>
        ))}
        <Button secondary onClick={() => character.damage()}>Нанести урон</Button>
      </div>

      <div className='block'>
        <header className='parameters-header-text'>Скиллы:</header>
        {skillsKeys.map((key, i) => (
          <div className='skill' key={i}>
            <b>{character.skills[key].name}</b>
            <p>{Skill.LEVELS[character.skills[key].level]}</p>
            <Button onClick={() => character.skills[key].train()}>Тренировать</Button>
          </div>
        ))}
      </div>

      <Button primary onClick={characterExporter.download}>Сохранить</Button>

    </div>
  )
}

const withObserver = (children: () => JSX.Element) => {
  return function () {
    return <Observer>{() => children()}</Observer>
  }
}

export default withObserver(Editor)