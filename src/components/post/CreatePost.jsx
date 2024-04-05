import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axiosService from '../../helpers/axios';
import { getUser } from '../../hooks/user.actions';

function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});
  const user = getUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    const createPostForm = e.currentTarget;
    if (createPostForm.checkValidity() === false) {
      e.stopPropagation();
    } 
    setValidated(true);

    const data = {
      author = user.id,
      body = form.body,
    }

    axiosService.post('/posts/', data).then((res) => {
      console.log(res.data);
      handleClose();
      setForm({});
    }).catch((err) => console.log(err));
  }
  return(
    <>
      <Form.Group className="my-3 w-75">
        <Form.Control
          className='py-2 rounded-pill border-primary text-primary'
          type='text'
          placeholder='Write a Post'
          onClick={handleShow}/>
      </Form.Group>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className='border-0'>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Control
                name='body'
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as='textarea'
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleSubmit}
          disable={form.body === undefined}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>  
    </>
  )
};

export default CreatePost;
