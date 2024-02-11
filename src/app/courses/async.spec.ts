import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

xdescribe('Acync testing', () => {

  it('async with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTrue();
      done();
    }, 500);
  });

  it('async with fakeAsync', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    flush();
    expect(test).toBeTrue();
  }));

  it('plan promise', fakeAsync(() => {
    let test = false;
    Promise.resolve().then(() => {
      test = true;
    });
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('promise and settimeout', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    flush();
    expect(counter).toBe(11);
  }));

  it('observable', fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    expect(test).toBeTruthy();
  }));

});
