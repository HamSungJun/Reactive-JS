import {
  Observable,
  from
} from 'rxjs'

/**
 * Observable 객체의 컬렉션에 정수 1, 2, 3은 동기적으로 푸시되고 4는 1초 뒤 푸시된다.
 * Observable 객체를 호출하고 그 값을 살펴보기 위해서는 Subscribe 개념이 필요하다.
 */
const observable = new Observable(subscriber => {
  subscriber.next(1)
  subscriber.next(2)
  subscriber.next(3)
  setTimeout(() => {
    subscriber.next(4)
    subscriber.complete()
  }, 100)
})

/**
 * setTimeout으로 래핑 되지 않은 next(v) 값들은 동기적으로 호출되고 값 4는 메인 스레드의 모든 호출 및 실행이 완료 되었을 때
 * 추가적으로 호출되었다. Observable 객체의 complete() 호출이 발생했을 때 subscribe({}) 의 콜백 파라미터 complete 함수가 실행되었다.
 */
console.log('before subscribe.')
observable.subscribe({
  next (v) { console.log('got value' + v) },
  error (err) { console.error(`error occured ${err}`) },
  complete () { console.log('subscibe done.') }
})
console.log('after subscribe.')

/**
 * 일반적인 자바스크립트 함수는 한번에 하나의 값만 Return 하는 반면, Observable 객체는 subscribe 메소드를 통해 여러개의 값을 동기적, 비동기적으로
 * 여러번 반환할 수 있는 특성을 갖는다.
 */
const foo = new Observable(subscriber => {
  console.log('Hello')
  subscriber.next(42)
  subscriber.next(4242)
  subscriber.complete()
  setTimeout(() => {
    subscriber.next(424242)
  }, 2000)
})

foo.subscribe(x => {
  console.log(x)
})
foo.subscribe(y => {
  console.log(y)
})

const observableFrom = from([10, 20, 30])
observableFrom.subscribe({
  next (v) { console.log(v) }
})

/**
 * Observable 객체의 콜백 함수 구현인 subscribe 내부에서 반환하는 unsubscribe 함수 구현을 통해 연산의 취소나 메모리를 해제할 수 있는
 * 클로저 함수를 구현하여 반환할 수 있다.
 */
const observableInterval = new Observable(function subscribe (subscriber) {
  const timerId = setInterval(() => {
    subscriber.next(1)
  }, 1000)

  return function unsubscribe () {
    clearInterval(timerId)
  }
})

const subscription = observableInterval.subscribe({
  next (v) { console.log(v) }
})
subscription.unsubscribe()
