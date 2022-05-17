import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Meeting = () => {
  const [meeting, setMeeting] = useState(null);
  const [participantsNames, setParticipantsNames] = useState([]);

  const router = useRouter();
  let { id } = router.query;

  const deleteMeeting = () => {
    fetch('http://localhost:3001/meetings/' + id, {
      method: 'DELETE',
    }).then((res) => console.log(res));

    router.push('http://localhost:3000/');
  };

  useEffect(() => {
    console.log(`useEffect ${id}\n`);

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
      <>
        <h1>{meeting.title}</h1>
        <h2>
          {meeting.date} | {meeting.time}
        </h2>
        <div>
          Description: <br /> {meeting.description}
        </div>
        <br />
        <div>
          Participants: <br /> {participantsNames.map((participant) => participant.name).join(', ')}
        </div>
        <br />
        <button onClick={deleteMeeting}>Delete</button>
      </>
    );
  } else if (meeting && meeting._id == -1) {
    return (
      <>
        <h1>Given ID doesn't exist.</h1>
      </>
    );
  } else {
    return <></>;
  }
};

export default Meeting;
