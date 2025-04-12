import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const success = await register(username, password)
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Registration failed. Username might be taken.')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-6 mx-auto mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength="6"
          />
          <Form.Text className="text-muted">
            Password must be at least 6 characters
          </Form.Text>
        </Form.Group>
        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </div>
  )
}