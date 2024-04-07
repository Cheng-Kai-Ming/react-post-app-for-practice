import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axiosService from '../../helpers/axios';
import { getUser } from '../../hooks/user.actions';
import Toaster from '../Toaster';

function CreatePost() {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
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
      author: user.id,
      body: form.body,
    }

    axiosService.post('/post/', data).then((res) => {
      console.log(res.data);
      handleClose();
      setToastMessage('Post created successfully');
      setToastType('success');
      setForm({});
      setShowToast(true);
    }).catch((err) => {
      setToastMessage('Failed to create post');
      setToastType('danger');
      console.log(err)});
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
          disabled={form.body === undefined || form.body === ''}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>  
      <Toaster
        showToast={showToast}
        title='Post'
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type={toastType}/>
    </>
  )
};

export default CreatePost;
