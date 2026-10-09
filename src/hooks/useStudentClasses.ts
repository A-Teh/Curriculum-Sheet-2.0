import { useEffect, useState } from "react";
import { collection, onSnapshot, type DocumentData } from "firebase/firestore";
import { db } from "../firebase";

// How semester is stored in Firestore
interface SemesterData {
  term: string;
  year: number;
}

export interface StudentClass {
  id: string;
  code: string;
  semester: string; // formatted for display, e.g. "Spring 2024"
  credits: number;
  grade?: string;
}

// Turns { term: "Spring", year: 2024 } into "Spring 2024"
function formatSemester(semester: unknown): string {
  if (typeof semester === "string") return semester;
  if (semester && typeof semester === "object") {
    const { term, year } = semester as SemesterData;
    return `${term} ${year}`;
  }
  return "";
}

export function useStudentClasses(userId: string = "100779714") {
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const classesRef = collection(db, "users", userId, "courses");

    const unsubscribe = onSnapshot(
      classesRef,
      (snapshot) => {
        const data: StudentClass[] = snapshot.docs.map((doc) => {
          const fields: DocumentData = doc.data();
          return {
            id: doc.id,
            code: doc.id, // AST108H, from the document ID
            semester: formatSemester(fields.semester),
            credits: fields.credits,
            grade: fields.grade,
          };
        });
        setClasses(data);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userId]);

  return { classes, loading, error };
}