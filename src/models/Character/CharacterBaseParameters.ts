import {BaseParameter} from "./BaseParameter"
import {makeObservable, observable} from "mobx"

export class CharacterBaseParameters {

  @observable private readonly _strength: BaseParameter<number>

  @observable private readonly _dexterity: BaseParameter<number>

  @observable private readonly _intelligence: BaseParameter<number>

  @observable private readonly _charisma: BaseParameter<number>

  constructor() {
    makeObservable(this)

    this._strength = new BaseParameter<number>(0, 'Сила')
    this._dexterity = new BaseParameter<number>(0, 'Ловкость')
    this._intelligence = new BaseParameter<number>(0, 'Интеллект')
    this._charisma = new BaseParameter<number>(0, 'Харизма')
  }

  public get strength(): BaseParameter<number> {
    return this._strength
  }

  public get dexterity(): BaseParameter<number> {
    return this._dexterity
  }

  public get intelligence(): BaseParameter<number> {
    return this._intelligence
  }

  public get charisma(): BaseParameter<number> {
    return this._charisma
  }
}