import {
    loadSubjects,
    loadTimetable,
    loadAttendance,
    loadCalendar,
} from "./storage";


const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


export default function getSubjectAttendance() {


    const subjects = loadSubjects();
    const timetable = loadTimetable();
    const attendance = loadAttendance();
    const calendar = loadCalendar();



    console.log("===== DEBUG START =====");

    console.log("Subjects:", subjects);

    console.log("Timetable:", timetable);

    console.log("Attendance:", attendance);

    console.log("Calendar:", calendar);



    const result = {};



    subjects.forEach(subject => {

        result[subject.id] = {

            id: subject.id,

            code: subject.code,

            name: subject.name,

            professor: subject.professor,

            attended: 0,

            absent: 0,

            total: 0,

        };

    });





    Object.entries(attendance)
        .forEach(([dateKey, periods]) => {



            const date =
                new Date(
                    dateKey + "T12:00:00"
                );



            const actualDay =
                DAYS[date.getDay()];



            console.log(
                "\nDATE:",
                dateKey
            );


            console.log(
                "DAY DETECTED:",
                actualDay
            );



            let timetableDay =
                actualDay;



            if(calendar[dateKey]?.sourceDay) {

                timetableDay =
                    calendar[dateKey].sourceDay;

            }



            console.log(
                "USING TIMETABLE:",
                timetableDay
            );



            const dayTimetable =
                timetable[timetableDay];



            console.log(
                "TIMETABLE FOUND:",
                dayTimetable
            );


            console.log(
                "ATTENDANCE:",
                periods
            );



            if(!dayTimetable)
                return;





            dayTimetable.forEach(
                (
                    subjectId,
                    index
                ) => {


                    const status =
                        periods[index];


                    if(!subjectId)
                        return;


                    if(
                        status !== "attended"
                        &&
                        status !== "absent"
                    ) {
                        return;
                    }



                    if(!result[subjectId])
                        return;



                    result[subjectId].total++;



                    if(status === "attended") {

                        result[subjectId].attended++;

                    }
                    else {

                        result[subjectId].absent++;

                    }



                }
            );


        });



    console.log(
        "RESULT:",
        Object.values(result)
    );


    console.log(
        "===== DEBUG END ====="
    );



    return Object.values(result);

}