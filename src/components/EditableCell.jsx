import { useState } from "react";

import PeriodSelector from "./PeriodSelector";

export default function EditableCell({
    value,
    subjects,
    onChange,
}) {
    const [editing, setEditing] = useState(false);

    const subject = subjects.find(
        (subject) => subject.id === value
    );

    function handleChange(newValue) {
        onChange(newValue);
        setEditing(false);
    }

    if (editing) {
        return (
            <PeriodSelector
                value={value}
                subjects={subjects}
                onChange={handleChange}
            />
        );
    }

    return (
        <button
            className="h-10 w-full text-xs"
            onClick={() => setEditing(true)}
        >
            {subject ? (
                subject.code
            ) : (
                <span className="text-gray-300">
                    FREE
                </span>
            )}
        </button>
    );
}