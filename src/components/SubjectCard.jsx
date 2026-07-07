export default function SubjectCard({ subject, onDelete }) {
    const isLab = subject.code.toUpperCase().includes("L");

    return (
        <div className="flex items-center justify-between rounded-lg border p-4 shadow">
            <div>
                <h2 className="text-lg font-bold">
                    {subject.code}
                </h2>

                <p>{subject.name}</p>

                <p className="text-gray-600">
                    {subject.professor}
                </p>
            </div>

            <div className="flex items-center gap-6">
                <span className="text-sm italic text-gray-400">
                    {isLab ? "Lab" : "Theory"}
                </span>

                <button
                    onClick={() => {
                        if (
                            window.confirm(
                                `Delete ${subject.code}?`
                            )
                        ) {
                            onDelete(subject.id);
                        }
                    }}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}