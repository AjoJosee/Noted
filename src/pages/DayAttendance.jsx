import { useEffect, useState } from "react";
import { getDateKey } from "../utils/dateUtils";

import AttendanceCell from "../components/AttendanceCell";

import {
    loadSubjects,
    loadTimetable,
    loadAttendance,
    saveAttendance,
    loadCalendar,
    saveCalendar,
} from "../utils/storage";


const PERIOD_TIMES = [
    "09-10",
    "10-11",
    "11-12",
    "13-14",
    "14-15",
    "15-16",
];


const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];


export default function DayAttendance({
    date,
    onBack,
}) {

    const dayName =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
            }
        );


    const dateKey =
        getDateKey(date);


    const [subjects] =
        useState(loadSubjects());

    const [timetable] =
        useState(loadTimetable());

    const [attendance, setAttendance] =
        useState(loadAttendance());

    const [calendar, setCalendar] =
        useState(loadCalendar());

    const [saved, setSaved] =
        useState(false);

    const [sourceDay, setSourceDay] =
        useState(
            calendar[dateKey]?.sourceDay ?? ""
        );



    const timetableDay =
        calendar[dateKey]?.sourceDay
            ?? dayName;


    const periods =
        timetable[timetableDay]
            ?? Array(6).fill(null);



    function isWorkingDay() {

        if (calendar[dateKey]) {
            return (
                calendar[dateKey].type === "working"
            );
        }


        const day =
            date.getDay();


        return (
            day !== 0 &&
            day !== 6
        );
    }



    function toggleWorkingDay() {

        const updated = {
            ...calendar,

            [dateKey]: {
                type: isWorkingDay()
                    ? "holiday"
                    : "working",
            },
        };


        setCalendar(updated);
        saveCalendar(updated);
    }



    function applySourceDay() {

        const updated = {
            ...calendar,

            [dateKey]: {
                type: "working",
                sourceDay,
            },
        };


        setCalendar(updated);
        saveCalendar(updated);
    }



    function updateStatus(
        period,
        status
    ) {

        setAttendance(
            (previous) => ({
                ...previous,

                [dateKey]: {
                    ...(previous[dateKey] ?? {}),
                    [period]: status,
                },
            })
        );


        setSaved(false);
    }



    function handleSave() {

        saveAttendance(attendance);

        setSaved(true);


        setTimeout(() => {
            setSaved(false);
        }, 2000);
    }



    useEffect(() => {
        saveAttendance(attendance);
    }, [attendance]);



    return (

        <div className="p-6">


            <button
                className="mb-5 border px-3 py-1"
                onClick={onBack}
            >
                ← Back
            </button>



            <h1 className="mb-4 text-3xl font-bold">
                {dayName}
                {" "}
                {date.toLocaleDateString()}
            </h1>




            <div className="mb-6">


                <p className="mb-2">
                    Status:
                    {" "}

                    <span className="font-semibold">
                        {
                            isWorkingDay()
                                ? "Working Day"
                                : "Holiday"
                        }
                    </span>

                </p>



                <button
                    onClick={toggleWorkingDay}
                    className="rounded border px-4 py-2"
                >
                    {
                        isWorkingDay()
                            ? "Make Holiday"
                            : "Make Working Day"
                    }

                </button>



                {
                    isWorkingDay()
                    &&
                    (date.getDay() === 0 ||
                    date.getDay() === 6)
                    &&
                    (

                        <div className="mt-4">


                            <p className="mb-2 text-sm">
                                Use timetable from:
                            </p>



                            <select
                                className="rounded border p-2"
                                value={sourceDay}
                                onChange={(e) =>
                                    setSourceDay(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select day
                                </option>


                                {
                                    WEEKDAYS.map(
                                        (day) => (

                                            <option
                                                key={day}
                                                value={day}
                                            >
                                                {day}
                                            </option>

                                        )
                                    )
                                }

                            </select>



                            <button
                                onClick={applySourceDay}
                                className="ml-3 rounded bg-blue-600 px-3 py-1 text-white"
                            >
                                Apply
                            </button>


                        </div>

                    )
                }


            </div>





            {
                isWorkingDay()
                    ?

                (

                    <>

                        <table className="w-full table-fixed border-collapse border text-center">


                            <thead>

                                <tr>

                                    {
                                        PERIOD_TIMES.map(
                                            (
                                                time,
                                                index
                                            ) => (

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
                                        )
                                    }

                                </tr>

                            </thead>





                            <tbody>

                                <tr>


                                    {
                                        periods.map(
                                            (
                                                subjectId,
                                                index
                                            ) => {


                                                const subject =
                                                    subjects.find(
                                                        (s) =>
                                                            s.id === subjectId
                                                    );


                                                const status =
                                                    attendance[dateKey]?.[index];



                                                return (

                                                    <td
                                                        key={index}
                                                        className={`
                                                            border
                                                            p-2
                                                            ${
                                                                status === "attended"
                                                                    ? "bg-green-100"
                                                                    : status === "absent"
                                                                        ? "bg-red-100"
                                                                        : status === "free"
                                                                            ? "bg-gray-100"
                                                                            : ""
                                                            }
                                                        `}
                                                    >


                                                        <div className="mb-2 text-xs font-semibold">

                                                            {
                                                                subject
                                                                    ? subject.code
                                                                    : "FREE"
                                                            }

                                                        </div>



                                                        {
                                                            subject

                                                            ?

                                                            <AttendanceCell
                                                                status={status}
                                                                onChange={
                                                                    (value) =>
                                                                        updateStatus(
                                                                            index,
                                                                            value
                                                                        )
                                                                }
                                                            />

                                                            :

                                                            <div className="text-xs text-gray-400">
                                                                Free
                                                            </div>

                                                        }


                                                    </td>

                                                );

                                            }
                                        )
                                    }


                                </tr>


                            </tbody>


                        </table>





                        <div className="mt-6 flex flex-col items-center gap-3">


                            <button
                                onClick={handleSave}
                                className="rounded bg-blue-600 px-6 py-2 text-white"
                            >
                                Save Attendance
                            </button>



                            {
                                saved
                                &&
                                (
                                    <p className="text-sm text-green-600">
                                        Attendance saved successfully.
                                    </p>
                                )
                            }


                        </div>


                    </>

                )

                :

                (

                    <p className="text-gray-500">
                        This day is marked as a holiday.
                    </p>

                )

            }


        </div>

    );
}