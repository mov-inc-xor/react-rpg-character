import {Skill} from "./Skill"
import {makeObservable, observable} from "mobx"
import {CharacterBaseParameters} from "./CharacterBaseParameters"

export class CharacterSkills {

  @observable private readonly _attack: Skill

  @observable private readonly _stealth: Skill

  @observable private readonly _archery: Skill

  @observable private readonly _learnability: Skill

  @observable private readonly _survival: Skill

  @observable private readonly _medicine: Skill

  @observable private readonly _intimidation: Skill

  @observable private readonly _insight: Skill

  @observable private readonly _appearance: Skill

  @observable private readonly _manipulation: Skill

  constructor(characterBaseParameters: CharacterBaseParameters) {
    makeObservable(this)

    this._attack = new Skill('Атака', characterBaseParameters.strength)
    this._stealth = new Skill('Стелс', characterBaseParameters.dexterity)
    this._archery = new Skill('Стрельба из лука', characterBaseParameters.dexterity)
    this._learnability = new Skill('Обучаемость', characterBaseParameters.intelligence)
    this._survival = new Skill('Выживание', characterBaseParameters.intelligence)
    this._medicine = new Skill('Медицина', characterBaseParameters.intelligence)
    this._intimidation = new Skill('Запугивание', characterBaseParameters.charisma)
    this._insight = new Skill('Проницательность', characterBaseParameters.charisma)
    this._appearance = new Skill('Внешний вид', characterBaseParameters.charisma)
    this._manipulation = new Skill('Манипулирование', characterBaseParameters.charisma)
  }

  public get attack(): Skill {
    return this._attack
  }

  public get stealth(): Skill {
    return this._stealth
  }

  public get archery(): Skill {
    return this._archery
  }

  public get learnability(): Skill {
    return this._learnability
  }

  public get survival(): Skill {
    return this._survival
  }

  public get medicine(): Skill {
    return this._medicine
  }

  public get intimidation(): Skill {
    return this._intimidation
  }

  public get insight(): Skill {
    return this._insight
  }

  public get appearance(): Skill {
    return this._appearance
  }

  public get manipulation(): Skill {
    return this._manipulation
  }
}