import { useState } from 'react';
import Day from '../Day';

const DayGrid = (props) => {
  const [month, setMonth] = useState(props.month);

  // Should be changed for different months
  const daysPerMonth = {
    May: 31,
  };
  const firstWeekdayInMonth = {
    May: 6,
  };

  let weeks = [];
  let week = [];
  let col = 0;
  let total_valid = 0;
  for (let i = 0; i < firstWeekdayInMonth[month]; i++) {
    week.push('');
    col++;
  }
  while (total_valid < daysPerMonth[month]) {
    while (col < 7) {
      week.push(total_valid + 1);
      total_valid++;
      if (total_valid == daysPerMonth[month]) break;
      col++;
    }
    weeks.push(week);
    col = 0;
    week = [];
  }

  console.log(weeks);

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
          {weeks.map((week) => {
            return (
              <tr>
                {week.map((day) => (
                  <td>
                    <Day day={day} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default DayGrid;
