import { useEffect, useState } from "react";
import "./Calendar.css";

export default function Calendar() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDate = new Date();
    const [currYear, setCurrYear] = useState(currentDate.getFullYear());
    const [currMonth, setCurrMonth] = useState(currentDate.getMonth());
    const [leftDays, setLeftDays] = useState([]);
    const [rightDays, setRightDays] = useState([]);
    const [checkinDate, setCheckinDate] = useState(null);

    const renderMonthDays = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        const daysArray = [];

        for (let i = 1; i <= lastDateOfMonth; i++) {
            const isToday = i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear() ? "active" : "";
            const isInactive = new Date(year, month, i) < currentDate && !isToday;

            daysArray.push({
                day: i,
                inactive: isInactive,
                istoday: isToday,
                isCheckin: checkinDate && checkinDate.getDate() === i && checkinDate.getMonth() === month && checkinDate.getFullYear() === year,
            });
        }

        return daysArray;
    };

    useEffect(() => {
        setLeftDays(renderMonthDays(currYear, currMonth));

        const nextMonth = (currMonth + 1) % 12;
        const nextYear = nextMonth === 0 ? currYear + 1 : currYear;
        setRightDays(renderMonthDays(nextYear, nextMonth));
    }, [currYear, currMonth, checkinDate]);

    const leftCurrentDate = `${months[currMonth]} ${currYear}`;
    const rightCurrentDate = `${months[(currMonth + 1) % 12]} ${currMonth + 1 > 11 ? currYear + 1 : currYear}`;

    const handleClick = (iconId) => {
        if (iconId === "prev") {
            const newMonth = currMonth === 0 ? 11 : currMonth - 1;
            const newYear = currMonth === 0 ? currYear - 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        } else if (iconId === "next") {
            const newMonth = (currMonth + 1) % 12;
            const newYear = newMonth === 0 ? currYear + 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        }
    };

    const handleDayClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day);
        setCheckinDate(selectedDate);
    };
    
    

    return (
        <div className="cal-body">
            <div className="wrapper">
                <header>
                    <div className="icons">
                        {currYear === currentDate.getFullYear() && currMonth === currentDate.getMonth() ? (
                            <i className="fa-solid fa-chevron-left inactive"></i>
                        ) : (
                            <i onClick={() => handleClick("prev")} className="fa-solid fa-chevron-left"></i>
                        )}
                    </div>
                    <p className="current-date">{leftCurrentDate}</p>
                </header>
                <div className="calendar">
                    <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="days">
                        {leftDays.map((dayObj) => (
                            <li
                                key={dayObj.day}
                                className={`${dayObj.inactive ? "inactive" : ""} ${dayObj.isCheckin ? "checkin" : ""}`}
                                onClick={() => !dayObj.inactive && handleDayClick(dayObj.day, currMonth, currYear)}
                            >
                                {dayObj.day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="wrapper">
                <header>
                    <p className="current-date">{rightCurrentDate}</p>
                    <div className="icons">
                        <i onClick={() => handleClick("next")} className="fa-solid fa-chevron-right"></i>
                    </div>
                </header>
                <div className="calendar">
                    <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="days">
                        {rightDays.map((dayObj) => (
                            <li
                                key={dayObj.day}
                                className={`${dayObj.inactive ? "inactive" : ""} ${dayObj.isCheckin ? "checkin" : ""}`}
                                onClick={() => !dayObj.inactive && handleDayClick(dayObj.day, (currMonth + 1) % 12, currMonth + 1 > 11 ? currYear + 1 : currYear)}
                            >
                                {dayObj.day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
