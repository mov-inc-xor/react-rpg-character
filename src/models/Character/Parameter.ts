import {makeObservable, observable} from "mobx"

export abstract class Parameter<T> {
  @observable protected _value: T
  @observable private _name: string

  constructor(initialValue: T, name: string) {
    makeObservable(this)

    this._value = initialValue
    this._name = name
  }

  public abstract get value(): T
  public abstract set value(value)

  public get name(): string {
    return this._name
  }
}