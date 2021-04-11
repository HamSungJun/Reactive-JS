import {
  from
} from 'rxjs'

/**
 * Observer 객체는 Observable 객체의 subscribe 메소드의 콜백 파라미터이다.
 * next, error, complete를 함수의 이름으로 갖는 콜백 함수 시리즈 이다.
 */

const oneToFiveObservable = from([1, 2, 3, 4, 5])
const oneToFiveObserver = {
  next (v) { console.log(v) },
  error (err) { console.log(err) },
  complete () { console.log('complete') }
}
oneToFiveObservable.subscribe(oneToFiveObserver)

/**
 * next, error, complete 키값의 함수가 필요하지만 반드시 작성될 필요는 없습니다.
 */

const oneToFiveObserverPartial = {
  next (v) { console.log(v) },
  error (err) { console.log(err) }
}
oneToFiveObservable.subscribe(oneToFiveObserverPartial)

const oneToFiveObserverPartial2 = {
  next (v) { console.log(v) }
}
oneToFiveObservable.subscribe(oneToFiveObserverPartial2)

/**
 * Observable.subscribe의 콜백 파라미터로 Object가 입력되지 않으면 내부적으로 args[0],args[1],args[2] => next, error, complete
 * 형태로 매핑됩니다.
 */

oneToFiveObservable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
)
