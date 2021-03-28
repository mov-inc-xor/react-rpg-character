import {CharacterSkills} from "./CharacterSkills"
import {action, computed, makeObservable, observable} from "mobx"
import {CharacterBaseParameters} from "./CharacterBaseParameters"
import {CharacterDependentParameters} from "./CharacterDependentParameters"

export class Character {

  @observable private _name: string

  @observable private readonly _baseParameters: CharacterBaseParameters

  @observable private readonly _dependentParameters: CharacterDependentParameters

  @observable private readonly _skills: CharacterSkills

  constructor(name: string) {
    makeObservable(this)

    this._name = name
    this._baseParameters = new CharacterBaseParameters()
    this._dependentParameters = new CharacterDependentParameters(this._baseParameters)
    this._skills = new CharacterSkills(this._baseParameters)
  }

  @computed
  public get name(): string {
    return this._name
  }

  public set name(name) {
    this._name = name.trimLeft()
  }

  public get baseParameters(): CharacterBaseParameters {
    return this._baseParameters
  }

  public get dependentParameters(): CharacterDependentParameters {
    return this._dependentParameters
  }

  public get skills(): CharacterSkills {
    return this._skills
  }

  @action
  public damage() {
    if (this._dependentParameters.vitality.value > 0) {
      this._dependentParameters.vitality.value--
    }
  }
}