import { useEffect, useState } from "react";
import "./Calendar.css"


export default function Calendar() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date();
    let [currYear, setCurrYear] = useState(date.getFullYear());
    let [currMonth, setCurrMonth] = useState(date.getMonth());
    const [days, setDays] = useState([]);
    
    const renderCalendar = () => {
        let daysArray = [];
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
        lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            setCurrYear(date.getFullYear());
            setCurrMonth(currMonth = date.getMonth());
        } else {
            date = new Date();
        }

        for (let i = firstDayOfMonth; i > 0; i--) {
            daysArray.push({
                day: lastDateOfLastMonth - i + 1,
                inactive: true
            });
        }
        
        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                          && currYear === new Date().getFullYear() ? "active" : "";                          
            daysArray.push({
                day: i,
                inactive: false,
                istoday: isToday
            });
        }

        for (let i = lastDayOfMonth; i < 6; i++) {
            daysArray.push({
                day: i - lastDayOfMonth + 1,
                inactive: true 
            });
        }
        
        setDays(daysArray);
    }

    useEffect(() => {
        renderCalendar();
    }, [currYear, currMonth]);

    const currentDate = `${months[currMonth]} ${currYear}`;

    const handleClick = (iconId) => {
            iconId === "prev" ? setCurrMonth(currMonth - 1) : setCurrMonth(currMonth + 1);

            setDays(renderCalendar())
    }

    return(
        <div className="cal-body">
            <div className="wrapper">
                <header>
                    <div className="icons">
                        {currMonth === date.getMonth() && (<i onClick={() => handleClick("prev")} className="fa-solid fa-chevron-left inactive"></i>)}
                        {currMonth !== date.getMonth() && (<i onClick={() => handleClick("prev")} className="fa-solid fa-chevron-left"></i>)}

                    </div>
                    <p className="current-date">{currentDate}</p>
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
                        {days?.map(dayObj => (
                            <li key={dayObj.day} className={dayObj.inactive ? "inactive" : ""}>
                                {dayObj.day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="wrapper">
                <header>
                    <p className="current-date">{currentDate}</p>
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
                        {days?.map(dayObj => (
                            <li key={dayObj.day} className={dayObj.inactive ? "inactive" : ""}>
                                {dayObj.day}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}