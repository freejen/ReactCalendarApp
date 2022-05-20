import { useState, useEffect } from 'react';
import Day from '../Day';
import NewMeetingModal from '../NewMeetingModal';

import Table from 'react-bootstrap/Table';

function generateDates(year, month) {
  let monthNum = 5;

  const daysPerMonth = {
    May: 31,
  };
  const firstWeekdayInMonth = {
    May: 6,
  };

  let weeksDates = [];
  let weekDates = [];

  let col = 0;
  let totalValid = 0;
  for (let i = 0; i < firstWeekdayInMonth[month]; i++) {
    weekDates.push('');
    col++;
  }
  while (totalValid < daysPerMonth[month]) {
    while (col < 7) {
      weekDates.push(year + '-' + monthNum + '-' + (totalValid + 1));

      totalValid++;
      if (totalValid == daysPerMonth[month]) break;
      col++;
    }

    weeksDates.push(weekDates);

    col = 0;
    weekDates = [];
  }

  return weeksDates;
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
