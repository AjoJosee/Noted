export default function PeriodSelector({
    value,
    subjects,
    onChange,
}) {
    return (
        <select
            autoFocus
            className="w-full rounded border p-1 text-xs"
            value={value ?? ""}
            onChange={(e) =>
                onChange(
                    e.target.value === ""
                        ? null
                        : e.target.value
                )
            }
        >
            <option value="">
                Free
            </option>

            {subjects.map((subject) => (
                <option
                    key={subject.id}
                    value={subject.id}
                >
                    {subject.code} — {subject.name}
                </option>
            ))}
        </select>
    );
}