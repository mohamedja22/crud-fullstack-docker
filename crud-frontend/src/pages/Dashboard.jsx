import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Alert, Modal, Form } from 'react-bootstrap';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/items`)
      setItems(res.data)
    } catch (err) {
      setError('Failed to fetch items')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      if (currentItem) {
        await axios.put(`${import.meta.env.VITE_API_URL}/items/${currentItem._id}`, data)
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/items`, data)
      }
      fetchItems()
      setShowModal(false)
    } catch (err) {
      setError('Failed to save item')
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`)
      fetchItems()
    } catch (err) {
      setError('Failed to delete item')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between mb-4">
        <h1>Items</h1>
        <Button onClick={() => { setCurrentItem(null); setShowModal(true) }}>
          Add Item
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="link" onClick={() => { setCurrentItem(item); setShowModal(true) }}>
                  <FiEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => deleteItem(item._id)}>
                  <FiTrash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit' : 'New'} Item</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                name="name" 
                required 
                defaultValue={currentItem?.name} 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                name="description" 
                required 
                defaultValue={currentItem?.description} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}