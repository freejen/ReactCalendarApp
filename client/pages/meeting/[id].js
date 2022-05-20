import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Meeting = () => {
  const [meeting, setMeeting] = useState(null);
  const [participantsNames, setParticipantsNames] = useState([]);

  const router = useRouter();
  let { id } = router.query;

  const deleteMeeting = () => {
    fetch('http://localhost:3001/meetings/' + id, {
      method: 'DELETE',
    });

    router.push('http://localhost:3000/');
  };

  useEffect(() => {
    // Meeting details
    if (id) {
      fetch('http://localhost:3001/meetings/' + router.query.id)
        .then((res) => res.json())
        .then((meeting_json) => {
          if (meeting_json._id != -1) {
            // Users
            fetch('http://localhost:3001/users')
              .then((res) => res.json())
              .then((users_json) => {
                let participants = meeting_json.participants;
                setParticipantsNames(users_json.filter((user) => participants.includes(user._id)));
              });
          }
          setMeeting(meeting_json);
        })
        .catch((err) => console.log('Error: ' + err));
    }
  }, [id]);

  if (id && meeting && meeting._id != -1) {
    return (
      <Container className="my-5">
        <h1>{meeting.title}</h1>
        <h3>
          {meeting.date} | {meeting.time}
        </h3>
        <div>
          <br />
          <h3>Description: </h3>
          {meeting.description}
        </div>
        <div>
          <br />
          <h3>Participants:</h3>
          {participantsNames.map((participant) => participant.name).join(', ')}
        </div>
        <br />
        <Button variant="danger" onClick={deleteMeeting}>
          Delete
        </Button>
      </Container>
    );
  } else if (meeting && meeting._id == -1) {
    return <h1>Given ID doesn't exist.</h1>;
  } else {
    return <></>;
  }
};

export default Meeting;
