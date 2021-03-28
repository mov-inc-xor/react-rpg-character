import {Parameter} from "./Parameter"
import {action, computed, makeObservable, observable} from "mobx"

export class DependentParameter<T> extends Parameter<T> {
  @observable private readonly _initialValueCallback: () => T

  constructor(name: string, initialValueCallback: () => T) {
    super(initialValueCallback(), name)

    makeObservable(this)

    this._initialValueCallback = initialValueCallback
  }

  @action
  public recalculate() {
    this._value = this._initialValueCallback()
  }

  @computed
  public get value(): T {
    return this._value
  }

  public set value(value) {
    this._value = value
  }
}