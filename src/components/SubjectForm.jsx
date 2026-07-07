import { useState } from "react";

export default function SubjectForm({ subjects, onAdd }) {
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [professor, setProfessor] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        if (!code.trim() || !name.trim() || !professor.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        const exists = subjects.some(
            (subject) =>
                subject.code.toLowerCase() === code.toLowerCase()
        );

        if (exists) {
            alert("Course code already exists.");
            return;
        }

        onAdd({
            id: crypto.randomUUID(),
            code: code.trim(),
            name: name.trim(),
            professor: professor.trim(),
        });

        setCode("");
        setName("");
        setProfessor("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label className="block font-medium">
                    Course Code
                </label>

                <input
                    className="border rounded p-2 w-full"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium">
                    Course Name
                </label>

                <input
                    className="border rounded p-2 w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label className="block font-medium">
                    Professor
                </label>

                <input
                    className="border rounded p-2 w-full"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                />
            </div>

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                type="submit"
            >
                Add Subject
            </button>
        </form>
    );
}