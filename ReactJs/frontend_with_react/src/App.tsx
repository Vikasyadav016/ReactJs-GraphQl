import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

type SignupResult = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

const LandingPage = () => (
  <div className="App landing-page">
    <div className="card">
      <h1>React + GraphQL Signup</h1>
      <p>
        Welcome to the project landing page. Navigate to the signup page to create a new account using the GraphQL backend.
      </p>
      <Link className="primary-button" to="/signup">
        Go to Signup
      </Link>
    </div>
  </div>
);

const SignupPage = () => {
  const [form, setForm] = useState<SignupForm>({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SignupResult | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const query = `mutation Signup($input: SignupInput!) {\n      signup(input: $input) {\n        success\n        message\n        user { id name email }\n      }\n    }`;

    try {
      const response = await fetch('https://vigilant-computing-machine-wq567j5rqg3gwxq-4000.app.github.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { input: form } }),
      });
      const json = await response.json();

      if (json.errors) {
        setResult({ success: false, message: json.errors[0]?.message || 'GraphQL error' });
      } else {
        setResult(json.data.signup);
      }
    } catch (error) {
      setResult({ success: false, message: 'Unable to reach the backend. Please start the GraphQL server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App signup-page">
      <div className="card form-card">
        <div className="page-header">
          <div>
            <h1>Create your account</h1>
            <p>Sign up and connect with the GraphQL backend.</p>
          </div>
          <button className="text-button" onClick={() => navigate('/')}>Back to Home</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
          </label>

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {result && (
          <div className={`result-message ${result.success ? 'success' : 'error'}`}>
            <strong>{result.success ? 'Success:' : 'Error:'}</strong> {result.message}
            {result.success && result.user && (
              <div className="user-details">
                <p>
                  <strong>ID:</strong> {result.user.id}
                </p>
                <p>
                  <strong>Name:</strong> {result.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {result.user.email}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
