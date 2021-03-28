import {Parameter} from "./Parameter"
import {action, computed, makeObservable, observable} from "mobx"

export class BaseParameter<T> extends Parameter<T> {

  @observable private _dependenciesCallbacks: ((newValue: T) => void)[]

  constructor(initialValue: T, name: string) {
    super(initialValue, name)

    makeObservable(this)

    this._dependenciesCallbacks = []
  }

  @action
  private notifyAll() {
    this._dependenciesCallbacks.forEach(callback => callback(this._value))
  }

  @action
  public addDependency(callback: (newValue: T) => void) {
    this._dependenciesCallbacks.push(callback)
  }

  @computed
  public get value(): T {
    return this._value
  }

  public set value(value) {
    this._value = value
    this.notifyAll()
  }
}