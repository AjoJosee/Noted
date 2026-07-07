import { useEffect, useState } from "react";

import EditableCell from "../components/EditableCell";

import {
    loadSubjects,
    loadTimetable,
    saveTimetable,
} from "../utils/storage";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const PERIOD_TIMES = [
    "09-10",
    "10-11",
    "11-12",
    "13-14",
    "14-15",
    "15-16",
];

export default function TimetablePage() {
    const [subjects] = useState(loadSubjects());

    const [timetable, setTimetable] =
        useState(loadTimetable());

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        saveTimetable(timetable);
    }, [timetable]);

    function updatePeriod(day, period, subjectId) {
        setTimetable((previous) => ({
            ...previous,
            [day]: previous[day].map(
                (oldValue, index) =>
                    index === period
                        ? subjectId
                        : oldValue
            ),
        }));

        setSaved(false);
    }

    function handleSave() {
        saveTimetable(timetable);

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2000);
    }

    return (
        <div className="p-6">
            <h1 className="mb-5 text-3xl font-bold">
                Weekly Timetable
            </h1>

            <div className="w-full">
                <table className="w-full table-fixed border-collapse border text-center">
                    <thead>
                        <tr>
                            <th className="w-24 border p-2 text-sm">
                                Day
                            </th>

                            {PERIOD_TIMES.map(
                                (time, index) => (
                                    <th
                                        key={time}
                                        className="border p-2 text-xs"
                                    >
                                        <div className="font-bold">
                                            P{index + 1}
                                        </div>

                                        <div className="text-gray-500">
                                            {time}
                                        </div>
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {DAYS.map((day) => (
                            <tr key={day}>
                                <td className="border p-2 text-sm font-semibold">
                                    {day}
                                </td>

                                {timetable[day].map(
                                    (
                                        subjectId,
                                        period
                                    ) => (
                                        <td
                                            key={period}
                                            className="h-12 border p-1"
                                        >
                                            <EditableCell
                                                value={
                                                    subjectId
                                                }
                                                subjects={
                                                    subjects
                                                }
                                                onChange={(
                                                    value
                                                ) =>
                                                    updatePeriod(
                                                        day,
                                                        period,
                                                        value
                                                    )
                                                }
                                            />
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
                <button
                    onClick={handleSave}
                    className="rounded bg-blue-600 px-6 py-2 text-white"
                >
                    Save Timetable
                </button>

                {saved && (
                    <p className="text-sm text-green-600">
                        Timetable saved successfully.
                    </p>
                )}
            </div>
        </div>
    );
}