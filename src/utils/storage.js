const SUBJECTS_KEY = "subjects";
const TIMETABLE_KEY = "timetable";
const CALENDAR_KEY = "calendar";
const ATTENDANCE_KEY = "attendance";

export function loadSubjects() {
    try {
        const data = localStorage.getItem(SUBJECTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveSubjects(subjects) {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
}

const EMPTY_TIMETABLE = {
    Monday: [null, null, null, null, null, null],
    Tuesday: [null, null, null, null, null, null],
    Wednesday: [null, null, null, null, null, null],
    Thursday: [null, null, null, null, null, null],
    Friday: [null, null, null, null, null, null],
};

export function loadTimetable() {
    try {
        const data = localStorage.getItem(TIMETABLE_KEY);
        return data ? JSON.parse(data) : EMPTY_TIMETABLE;
    } catch {
        return EMPTY_TIMETABLE;
    }
}

export function saveTimetable(timetable) {
    localStorage.setItem(TIMETABLE_KEY, JSON.stringify(timetable));
}

export function loadCalendar() {
    try {
        const data = localStorage.getItem(CALENDAR_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

export function saveCalendar(calendar) {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(calendar));
}

export function loadAttendance() {
    try {
        const data = localStorage.getItem(ATTENDANCE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

export function saveAttendance(attendance) {
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
}

export function loadSemester() {
    const data = localStorage.getItem("semester");
    return data ? JSON.parse(data) : { start: "", end: "" };
}

export function saveSemester(data) {
    localStorage.setItem("semester", JSON.stringify(data));
}

export function loadMinimumAttendance() {

    return JSON.parse(
        localStorage.getItem(
            "minimumAttendance"
        )
    ) || {};

}


export function saveMinimumAttendance(data) {

    localStorage.setItem(
        "minimumAttendance",
        JSON.stringify(data)
    );

}