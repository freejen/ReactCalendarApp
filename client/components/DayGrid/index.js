import { useState, useEffect } from 'react';
import Day from '../Day';

function generateDates(year, month) {
  let month_num = 5;

  const daysPerMonth = {
    May: 31,
  };
  const firstWeekdayInMonth = {
    May: 6,
  };

  let weeks_dates = [];
  let week_dates = [];

  let col = 0;
  let total_valid = 0;
  for (let i = 0; i < firstWeekdayInMonth[month]; i++) {
    week_dates.push('');
    col++;
  }
  while (total_valid < daysPerMonth[month]) {
    while (col < 7) {
      week_dates.push(year + '-' + month_num + '-' + (total_valid + 1));

      total_valid++;
      if (total_valid == daysPerMonth[month]) break;
      col++;
    }

    weeks_dates.push(week_dates);

    col = 0;
    week_dates = [];
  }

  return weeks_dates;
}

const DayGrid = (props) => {
  const [month, setMonth] = useState(props.month);
  const [meetings, setMeetings] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/meetings')
      .then((res) => res.json())
      .then((json) => {
        setMeetings(json);
      });
  }, []);

  // Should be changed for different months

  let dates = generateDates(props.year, props.month);

  if (meetings) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>

          <tbody>
            {dates.map((week, index) => {
              return (
                <tr key={index}>
                  {week.map((date, index) => (
                    <td key={index}>
                      <Day date={date} meetings={meetings.filter((meeting) => meeting.date == date)} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return <></>;
  }
};

export default DayGrid;
