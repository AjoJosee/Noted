import SubjectCard from "./SubjectCard";

export default function SubjectList({
    subjects,
    onDelete,
}) {
    if (subjects.length === 0) {
        return (
            <p className="text-gray-500">
                No subjects added yet.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {subjects.map((subject) => (
                <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}