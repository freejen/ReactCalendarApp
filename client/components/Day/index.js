import { useRouter } from 'next/router';

import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Day = (props) => {
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
          <Button variant="dark" size="lg">
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
