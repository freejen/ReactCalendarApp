import { useRouter } from 'next/router';
import { useState } from 'react';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import NewMeetingModal from '../NewMeetingModal';

const Day = (props) => {
  const [modalShow, setModalShow] = useState(false);

  let split = props.date.split('-');
  let day = split[split.length - 1];

  const router = useRouter();

  const goToMeetingDetails = (id) => {
    console.log(id);

    router.push(`meeting/${id}`);
  };

  return (
    <>
      <Stack gap={3}>
        {day && (
          <Button onClick={() => setModalShow(true)} variant="light">
            {day}
          </Button>
        )}

        <NewMeetingModal date={props.date} show={modalShow} onHide={() => setModalShow(false)} />

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
