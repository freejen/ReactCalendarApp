import { useRouter } from 'next/router';

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
      <h3>{day}</h3>
      {props.meetings.map((meeting) => (
        <div key={meeting._id} onClick={() => goToMeetingDetails(meeting._id)} style={{ border: '1px solid black' }}>
          {meeting.title}
          <br />
          {meeting.time}
        </div>
      ))}
    </>
  );
};

export default Day;
