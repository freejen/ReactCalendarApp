import { useRouter } from 'next/router';
import { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Day = (props) => {
  let split = props.date.split('-');
  let day = split[split.length - 1];

  const router = useRouter();

  const goToMeetingDetails = (id) => {
    router.push(`meeting/${id}`);
  };

  return (
    <>
      <Stack gap={3}>
        {day && (
          <Button
            onClick={() => {
              props.setModalShow(true);
              props.setSelectedDate(props.date);
            }}
            variant="light"
          >
            {day}
          </Button>
        )}

        {props.meetings.map((meeting) => (
          <Card key={meeting._id} onClick={() => goToMeetingDetails(meeting._id)} style={{ cursor: 'pointer' }}>
            <Card.Body>
              <Card.Title>{meeting.title}</Card.Title>
              <Card.Text>{meeting.time}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Day;
