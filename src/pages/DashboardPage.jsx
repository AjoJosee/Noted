import { useEffect, useState } from "react";

import {
    loadCalendar,
    loadSemester,
    saveSemester,
    loadMinimumAttendance,
    saveMinimumAttendance,
} from "../utils/storage";

import getSkipAllowance from "../utils/getSkipAllowance";
import { getDateKey } from "../utils/dateUtils";
import { card, input } from "../styles"; // Imported centralized style classes

export default function DashboardPage() {

    const savedSemester =
        loadSemester();

    const [calendar, setCalendar] =
        useState(
            loadCalendar()
        );

    const [semesterStart, setSemesterStart] =
        useState(
            savedSemester.start || ""
        );

    const [semesterEnd, setSemesterEnd] =
        useState(
            savedSemester.end || ""
        );

    const [subjectAttendance, setSubjectAttendance] =
        useState([]);

    const [minimumAttendance, setMinimumAttendance] =
        useState(
            loadMinimumAttendance()
        );


    function refreshDashboard() {

        setSubjectAttendance(
            getSkipAllowance()
        );

        setCalendar(
            loadCalendar()
        );

    }


    useEffect(() => {

        refreshDashboard();

    }, []);


    function updateSemesterStart(value) {

        setSemesterStart(value);

        saveSemester({
            start: value,
            end: semesterEnd,
        });

    }


    function updateSemesterEnd(value) {

        setSemesterEnd(value);

        saveSemester({
            start: semesterStart,
            end: value,
        });

    }


    function updateMinimum(
        subjectId,
        value
    ) {

        const updated = {
            ...minimumAttendance,
            [subjectId]:
                Number(value),
        };

        setMinimumAttendance(
            updated
        );

        saveMinimumAttendance(
            updated
        );

        refreshDashboard();

    }


    function getWorkingDays() {

        if(
            !semesterStart
            ||
            !semesterEnd
        )
            return 0;

        let count = 0;

        let current = new Date();

        current.setHours(0, 0, 0, 0);
        current.setDate(current.getDate() + 1);

        if (current < new Date(semesterStart)) {
            current = new Date(semesterStart);
        }

        const end =
            new Date(
                semesterEnd
            );

        while(current <= end) {

            const key =
                getDateKey(current);

            let working;

            if(calendar[key]) {

                working =
                    calendar[key].type
                    ===
                    "working";

            }
            else {

                const day =
                    current.getDay();

                working =
                    day !== 0
                    &&
                    day !== 6;

            }

            if(working)
                count++;

            current.setDate(
                current.getDate()+1
            );

        }

        return count;

    }


    function getSemesterWeeks() {

        if(
            !semesterStart
            ||
            !semesterEnd
        )
            return 0;

        const start =
            new Date(
                semesterStart
            );

        const end =
            new Date(
                semesterEnd
            );

        const difference =
            (
                end - start
            )
            /
            (
                1000 *
                60 *
                60 *
                24
            );

        return Math.ceil(
            difference / 7
        );

    }


    return (

        <div className="p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Attendance Dashboard
            </h1>

            <section className="mb-8">

                <h2 className="text-xl font-semibold">
                    Semester
                </h2>

                <div className="mt-3 flex gap-5">

                    <div>

                        <p>
                            Start Date
                        </p>

                        <input
                            type="date"
                            className={input} // Swapped manual classes with style token
                            value={semesterStart}
                            onChange={
                                (e)=>
                                updateSemesterStart(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div>

                        <p>
                            End Date
                        </p>

                        <input
                            type="date"
                            className={input} // Swapped manual classes with style token
                            value={semesterEnd}
                            onChange={
                                (e)=>
                                updateSemesterEnd(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

                <div className="mt-5">

                    <p>
                        Working Days:
                        {" "}
                        <b>
                            {getWorkingDays()}
                        </b>
                    </p>

                    <p>
                        Semester Weeks:
                        {" "}
                        <b>
                            {getSemesterWeeks()}
                        </b>
                    </p>

                </div>

            </section>

            <section>

                <h2 className="mb-4 text-xl font-semibold">
                    Subject Attendance
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {
                        subjectAttendance.map(
                            (subject)=>(

                                <div
                                    key={subject.id}
                                    className={card} // Swapped "rounded border p-4" with centralized card style
                                >

                                    <h3 className="font-bold">
                                        {subject.code}
                                    </h3>

                                    <p>
                                        {subject.name}
                                    </p>


                                    <div className="mt-4 text-xl font-semibold">
                                        {subject.attended}
                                        {" / "}
                                        {subject.total}
                                    </div>

                                    <p>
                                        {
                                            subject.total === 0 ? 0 : (
                                                subject.attended /
                                                subject.total *
                                                100
                                            ).toFixed(2)
                                        }%
                                    </p>
<div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">

    <div
        className="h-full rounded-full bg-green-500 transition-all"
        style={{
            width: `${
                subject.total === 0
                    ? 0
                    : (subject.attended / subject.total) * 100
            }%`,
        }}
    />

</div>
                                    <div className="mt-4">

                                        <label className="text-sm">
                                            Minimum Attendance %
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            className={`${input} mt-1 w-full`} // Replaced manual border/padding with input token while preserving utility classes
                                            value={
                                                minimumAttendance[
                                                    subject.id
                                                ]
                                                ??
                                                75
                                            }
                                            onChange={
                                                (e)=>
                                                updateMinimum(
                                                    subject.id,
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mt-4 space-y-1">

                                        <p>
                                            Remaining Classes:
                                            {" "}
                                            <span className="font-semibold">
                                                {subject.futureClasses}
                                            </span>
                                        </p>

<p className={`font-semibold ${subject.canSkip === 0 ? "text-red-600" : "text-green-700"}`}>
    {subject.canSkip === 0 ? (
        "Cannot skip any classes"
    ) : (
        <>
            Can Skip: {subject.canSkip} {subject.canSkip === 1 ? "class" : "classes"}
        </>
    )}
</p>

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </section>

        </div>

    );

}