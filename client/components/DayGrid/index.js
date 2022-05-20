import { useState, useEffect } from 'react';
import Day from '../Day';
import NewMeetingModal from '../NewMeetingModal';

import Table from 'react-bootstrap/Table';

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
  const [meetings, setMeetings] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [refreshDataIndicator, setRefreshDataIndicator] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/meetings')
      .then((res) => res.json())
      .then((json) => {
        setMeetings(json);
      });
  }, [refreshDataIndicator]);

  // Should be changed for different months

  let dates = generateDates(props.year, props.month);

  if (meetings) {
    return (
      <>
        <NewMeetingModal
          date={selectedDate}
          show={modalShow}
          onSubmit={() => {
            setRefreshDataIndicator(!refreshDataIndicator);
          }}
          onHide={() => setModalShow(false)}
        />
        <Table borderless>
          <thead>
            <tr>
              <th>
                <h3>Mon</h3>
              </th>
              <th>
                <h3>Tue</h3>
              </th>
              <th>
                <h3>Wed</h3>
              </th>
              <th>
                <h3>Thu</h3>
              </th>
              <th>
                <h3>Fri</h3>
              </th>
              <th>
                <h3>Sat</h3>
              </th>
              <th>
                <h3>Sun</h3>
              </th>
            </tr>
          </thead>

          <tbody>
            {dates.map((week, index) => {
              return (
                <tr key={index}>
                  {week.map((date, index) => (
                    <td key={index}>
                      <Day
                        date={date}
                        meetings={meetings.filter((meeting) => meeting.date == date)}
                        setModalShow={setModalShow}
                        setSelectedDate={setSelectedDate}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  } else {
    return <></>;
  }
};

export default DayGrid;
