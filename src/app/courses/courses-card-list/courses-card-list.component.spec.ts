import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the course list', () => {
    // component.courses = setupCourses();
    component.courses = Object.values(COURSES).sort((c1: Course, c2: Course) => c1.seqNo - c2.seqNo) as Course[];
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).withContext('could not find cards').toBeTruthy();
    expect(cards.length).withContext('unexpected number of courses').toBe(12);
  });

  it('should display the first course', () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const firstCourse = component.courses[0];
    const card = el.query(By.css('.course-card'));
    const title = card.query(By.css('mat-card-title'));
    const image = card.query(By.css('img'));
    expect(card).toBeTruthy();
    expect(title.nativeElement.textContent).toContain(firstCourse.titles.description);
    expect(image.nativeElement.src).toBe(firstCourse.iconUrl);
  });
})
