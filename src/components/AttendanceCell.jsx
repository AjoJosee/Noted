import { useState } from "react";


const STATUS_LABELS = {
    attended: "Attended",
    absent: "Absent",
    free: "Free",
};


const STATUS_COLORS = {
    attended: "bg-green-100",
    absent: "bg-red-100",
    free: "bg-gray-100",
};


export default function AttendanceCell({
    status,
    onChange,
}) {
    const [editing, setEditing] =
        useState(false);


    if (editing) {
        return (
            <select
                autoFocus
                className="w-full rounded border p-1 text-xs"
                value={status ?? ""}
                onChange={(e) => {
                    const value =
                        e.target.value === ""
                            ? null
                            : e.target.value;

                    onChange(value);
                    setEditing(false);
                }}
            >
                <option value="">
                    Not marked
                </option>

                <option value="attended">
                    Attended
                </option>

                <option value="absent">
                    Absent
                </option>

                <option value="free">
                    Free
                </option>

            </select>
        );
    }


    return (
        <div
            className={`
                h-8
                w-full
                rounded
                flex
                items-center
                justify-center
                ${
                    status
                        ? STATUS_COLORS[status]
                        : ""
                }
            `}
        >
            <button
                onClick={() => setEditing(true)}
                className="h-full w-full text-xs"
            >
                {
                    status
                        ? STATUS_LABELS[status]
                        : "?"
                }
            </button>
        </div>
    );
}