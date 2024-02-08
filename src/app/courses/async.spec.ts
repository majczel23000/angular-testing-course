import { fakeAsync, flush } from '@angular/core/testing';

fdescribe('Acync testing', () => {

  it('async with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTrue();
      done();
    }, 500);
  });

  it ('async with fakeAsync', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    flush();
    expect(test).toBeTrue();
  }));

});
