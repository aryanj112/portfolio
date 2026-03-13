import Link from "next/link";
import { SiteShell } from "../components";
import { collegeCoursework, highSchoolCoursework } from "../site-data";

export default function CourseworkPage() {
  return (
    <SiteShell>
      <section className="courseworkPage">
        <h1>Relevant Coursework</h1>

        <section className="courseworkSection">
          <h2 className="courseworkSectionTitle">University of Maryland</h2>
          <div className="rule" aria-hidden="true" />
          <div className="courseworkGroup">
            <h3 className="courseworkGroupTitle">Computer Science</h3>
            <ul className="courseList">
              {collegeCoursework.computerScience.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
          <div className="courseworkGroup">
            <h3 className="courseworkGroupTitle">Math</h3>
            <ul className="courseList">
              {collegeCoursework.math.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="courseworkSection">
          <h2 className="courseworkSectionTitle">Poolesville High School</h2>
          <div className="rule" aria-hidden="true" />
          <div className="courseworkMeta">
            <p>{highSchoolCoursework.program}</p>
            <p>Activities and societies: {highSchoolCoursework.activities.join(", ")}</p>
          </div>
          <ul className="courseList">
            {highSchoolCoursework.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </section>
      </section>
    </SiteShell>
  );
}
