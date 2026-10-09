import { useStudentClasses, type StudentClass } from "../hooks/useStudentClasses";
import "./ClassList.css";

interface ClassListProps {
  sidebarOpen: boolean;
}

function ClassList({ sidebarOpen }: ClassListProps) {
  const { classes, loading, error } = useStudentClasses();

  // Shows the code, semester, credits, and grade of one class taken by the student
  function renderRow(course: StudentClass) {
    const { code, semester, credits, grade } = course;

    // Display grade only if class is taken
    const displayGrade = grade && grade !== "Planned" ? grade : null;

    return (
      <tr key={course.id}>
        <td>{code}</td>
        <td>{semester}</td>
        <td>{credits}</td>
        <td>{displayGrade}</td>
      </tr>
    );
  }

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>Could not load classes: {error.message}</p>;

  const blurred = sidebarOpen && window.innerWidth <= 500 ? "blurred" : "";

    return (
    <div className={`class-list-container ${blurred}`}>
      <table className="class-list">
        <thead>
          <tr>
            <th>Class</th>
            <th>Semester</th>
            <th>Credits</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>{classes.map(renderRow)}</tbody>
      </table>
    </div>
  );
}

export default ClassList;