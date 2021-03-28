import {BaseParameter} from "./BaseParameter"
import {action, computed, makeObservable, observable} from "mobx"

export class Skill {
  public static LEVELS = [
    'Уровень 0: Нетренированный',
    'Уровень 1: Новичок',
    'Уровень 2: Ученик',
    'Уровень 3: Адепт',
    'Уровень 4: Эксперт',
    'Уровень 5: Мастер',
  ]

  @observable private _name: string

  @observable private _base: BaseParameter<number>

  @observable private _level: number

  constructor(name: string, base: BaseParameter<number>) {
    makeObservable(this)

    this._name = name
    this._base = base
    this._level = 0

    this._base.addDependency((newValue) => {
      this._level = Math.max(0, Math.min(this._level, newValue))
    })
  }

  @action
  public train() {
    this._level = Math.max(0, Math.min(this._level + 1, this._base.value, Skill.LEVELS.length - 1))
  }

  public get name(): string {
    return this._name
  }

  @computed
  public get level(): number {
    return this._level
  }

  public set level(level) {
    this._level = level
  }
}