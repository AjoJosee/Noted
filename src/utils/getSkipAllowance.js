import getSubjectAttendance from "./getSubjectAttendance";

import {
    loadMinimumAttendance,
    loadSemester,
    loadTimetable,
    loadCalendar,
} from "./storage";

import { getDateKey } from "./dateUtils";



export default function getSkipAllowance() {

    const attendance =
        getSubjectAttendance();

    const minimumAttendance =
        loadMinimumAttendance();

    const semester =
        loadSemester();

    const timetable =
        loadTimetable();

    const calendar =
        loadCalendar();



    return attendance.map(subject => {

        const minimum =
            minimumAttendance[subject.id] ?? 75;



        const totalSemesterClasses =
            countSemesterClasses(
                subject.id,
                semester.start,
                semester.end,
                timetable,
                calendar
            );



        const futureClasses =
            Math.max(
                0,
                totalSemesterClasses - subject.total
            );



        const canSkip =
            Math.max(
                0,
                Math.floor(
                    subject.attended +
                    futureClasses -
                    (
                        minimum / 100
                        *
                        totalSemesterClasses
                    )
                )
            );



        return {

            ...subject,

            minimum,

            futureClasses,

            semesterTotal: totalSemesterClasses,

            canSkip,

        };

    });

}





function countSemesterClasses(
    subjectId,
    semesterStart,
    semesterEnd,
    timetable,
    calendar
) {

    if(
        !semesterStart ||
        !semesterEnd
    )
        return 0;



    let count = 0;



    let current =
        new Date(semesterStart);

    const end =
        new Date(semesterEnd);



    while(current <= end) {

        const key =
            getDateKey(current);



        let working =
            current.getDay() !== 0 &&
            current.getDay() !== 6;



        let dayName =
            current.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                }
            );



        if(calendar[key]) {

            working =
                calendar[key].type ===
                "working";



            if(
                calendar[key].sourceDay
            ) {

                dayName =
                    calendar[key].sourceDay;

            }

        }



        if(working) {

            const periods =
                timetable[dayName] ?? [];



            periods.forEach(period => {

                if(
                    period ===
                    subjectId
                ) {

                    count++;

                }

            });

        }



        current.setDate(
            current.getDate() + 1
        );

    }



    return count;

}