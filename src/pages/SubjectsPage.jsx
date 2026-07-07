import { useEffect, useState } from "react";

import SubjectForm from "../components/SubjectForm";
import SubjectList from "../components/SubjectList";

import {
    loadSubjects,
    saveSubjects,
} from "../utils/storage";

export default function SubjectsPage() {
    const [subjects, setSubjects] = useState(loadSubjects());

    useEffect(() => {
        saveSubjects(subjects);
    }, [subjects]);

    function addSubject(subject) {
        setSubjects((previous) => [...previous, subject]);
    }

    function deleteSubject(id) {
        setSubjects((previous) =>
            previous.filter((subject) => subject.id !== id)
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-8">
            <h1 className="text-4xl font-bold">
                Subject Manager
            </h1>

            <SubjectForm
                subjects={subjects}
                onAdd={addSubject}
            />

            <SubjectList
                subjects={subjects}
                onDelete={deleteSubject}
            />
        </div>
    );
}