import {DependentParameter} from "./DependentParameter"
import {makeObservable, observable} from "mobx"
import {CharacterBaseParameters} from "./CharacterBaseParameters"

export class CharacterDependentParameters {

  @observable private readonly _vitality: DependentParameter<number>

  @observable private readonly _evasion: DependentParameter<number>

  @observable private readonly _energy: DependentParameter<number>

  constructor(characterBaseParameters: CharacterBaseParameters) {
    makeObservable(this)

    this._vitality = new DependentParameter<number>(
      'Жизненная сила',
      () => 3 + characterBaseParameters.strength.value,
    )
    characterBaseParameters.strength.addDependency(() => this._vitality.recalculate())

    this._evasion = new DependentParameter<number>(
      'Уклонение',
      () => 10 + characterBaseParameters.dexterity.value,
    )
    characterBaseParameters.dexterity.addDependency(() => this._evasion.recalculate())

    this._energy = new DependentParameter<number>(
      'Энергичность',
      () => characterBaseParameters.dexterity.value + characterBaseParameters.intelligence.value,
    )
    characterBaseParameters.dexterity.addDependency(() => this._energy.recalculate())
    characterBaseParameters.intelligence.addDependency(() => this._energy.recalculate())
  }

  public get vitality(): DependentParameter<number> {
    return this._vitality
  }

  public get evasion(): DependentParameter<number> {
    return this._evasion
  }

  public get energy(): DependentParameter<number> {
    return this._energy
  }
}