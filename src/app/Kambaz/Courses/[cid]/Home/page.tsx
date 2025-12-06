// src/app/(Kambaz)/Courses/[cid]/Home/page.tsx 
// This creates the home screen combining the course status and modules together.
// Combines the Course Status with the Modules to create the Home screen for the course screen.
import Modules from "../Modules/page";
import CourseStatus from "./coursehomepagestatus";

export default function Home() {
  return (
    <div id="wd-home">
      <div className="d-flex" >
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-lg-block" style={{ width: "350px", paddingLeft: "20px" }}>
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}