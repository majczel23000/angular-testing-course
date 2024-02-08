import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

// xdescribe will skip while test
// fdescribe only those will be executed
describe('CalculatorService', () => {

    let calculator: CalculatorService;
    let loggerSpy: any;

    beforeEach(() => {
        // we provide fake service, only testing service should have its instance
        loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);
        // if function of spy service returns value we can mock it:
        // loggerSpy.log.and.returnValue();

        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                { provide: LoggerService, useValue: loggerSpy }
            ]
        });

        calculator = TestBed.inject(CalculatorService);
    });

    // xit will skip single test case
    // fit will only execute selected test cases
    it('should add two numbers', () => {
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

});
