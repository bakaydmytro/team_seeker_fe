import React, { useState, useEffect } from "react";
import styles from './Date.module.css'

const DatePickerOL = ({onDateChange,BitdayError}) => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [isYearOpen, setYearOpen] = useState(false);
  const [isMonthOpen, setMonthOpen] = useState(false);
  const [isDayOpen, setDayOpen] = useState(false);
  const [dayError, setDayError] = useState('Enter year and month');
  const [error, setError] = useState(false);

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 90 }, (_, i) => (currentYear - 16) - i);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year, monthIndex) => {
    if (!year || monthIndex === undefined) return [];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };



  useEffect(() => {
    if (year && month !== "" && day) {
      const selectedDate = new Date(year, month, day);
      onDateChange(selectedDate);
      BitdayError('')
    } else{
        BitdayError('error')
    }
    
    if(year && month !== "" ){
        setError(false);
        setDayError('')
    }
  }, [year, month, day]);
  
  return (
    <div className={ styles.container }>
      <div className={styles.wrraper}>
        <div className={styles.selectBox} onClick={() => setYearOpen(!isYearOpen)}>
          {year || "Year"}
        </div>
        {isYearOpen && (
          <ol className={styles.dropdown}>
            {years.map((yr) => (
              <li
                key={yr}
                className={styles.option}
                onClick={() => {
                  setYearOpen(false);
                  setYear(yr);
                }}
              >
                {yr}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className={styles.wrraper}>
        <div className={styles.selectBox} onClick={() => setMonthOpen(!isMonthOpen)}>
          {months[month] || "Month"}
        </div>
        {isMonthOpen && (
          <ol className={styles.dropdown}>
            {months.map((mn, index) => (
              <li
                key={index}
                className={styles.option}
                onClick={() => {
                  setMonth(index);
                  setMonthOpen(false);
                }}
              >
                {mn}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className={styles.wrraper}>
        <div
        className={styles.selectBox}
          
          onClick={() => {
            if (!year || !month) {
              setError(true); 
              
            } if(year  && month !== ""){
                setDayOpen(!isDayOpen)
            } 
          }}
        >
          {day || "Day"}
        </div>
        {isDayOpen && (
          <ol className={styles.dropdown}>
            {getDaysInMonth(year, month).map((d) => (
              <li
                key={d}
                className={styles.option}
                onClick={() => {
                  setDay(d);
                  setDayOpen(false);
                }}
              >
                {d}
              </li>
            ))}
          </ol>
        )}
        { error && <div className={styles.error}>{dayError} </div>}
      </div>
    </div>
  );

}



export default DatePickerOL;
