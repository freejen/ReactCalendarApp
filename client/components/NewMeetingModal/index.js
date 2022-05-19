import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useEffect, useState, useRef } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './newmeetingmodal.module.css';

function NewMeetingModal(props) {
  let [users, setUsers] = useState(null);
  let [selectedUsers, setSelectedUsers] = useState(new Set());
  const title = useRef();
  const description = useRef();
  const time = useRef();

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((users_json) => {
        console.log(users_json);
        setUsers(users_json);
        console.log(users);
      });
  }, []);

  useEffect(() => {
    if (!props.show) setSelectedUsers(new Set());
  }, [props.show]);

  const handleCheck = (event) => {
    if (event.target.checked) {
      setSelectedUsers(new Set(selectedUsers).add(event.target.id));
      console.log(selectedUsers);
    } else {
      const newSet = new Set(selectedUsers);
      newSet.delete(event.target.id);
      setSelectedUsers(newSet);
      console.log(selectedUsers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    console.log(selectedUsers);

    const details = {
      title: title.current.value,
      description: description.current.value,
      date: props.date,
      time: time.current.value,
      participants: Array.from(selectedUsers),
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    console.log(formBody);

    fetch('http://localhost:3001/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    props.onSubmit();
    props.onHide();
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New meeting <br />
          {props.date}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="input" placeholder="Enter title" required ref={title} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" required ref={description} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control type="input" placeholder="Enter time" required ref={time} />
          </Form.Group>

          <ListGroup style={{ maxHeight: '200px', overflow: 'scroll' }}>
            {users &&
              users.map((user) => (
                <ListGroup.Item key={`checkbox-${user.name}`} className="mb-3">
                  <Form.Check type={'checkbox'} id={`${user._id}`} label={user.name} onChange={handleCheck} />
                </ListGroup.Item>
              ))}
          </ListGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewMeetingModal;
