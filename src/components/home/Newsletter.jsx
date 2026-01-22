import { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import { Send, Email } from '@mui/icons-material';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <Box 
      sx={{ 
        py: 8, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <Typography variant="h4" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
              Stay Updated with New Courses
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
              Subscribe to our newsletter and never miss out on new courses, updates, and exclusive offers!
            </Typography>

            {/* Bootstrap Form with MUI Icons */}
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-center">
                <Col md={8} lg={6}>
                  <InputGroup className="mb-3 shadow-lg" size="lg">
                    <InputGroup.Text className="bg-white border-0">
                      <Email color="action" />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-0 py-3"
                      required
                    />
                    <Button 
                      type="submit" 
                      variant="warning"
                      className="px-4 d-flex align-items-center gap-2"
                    >
                      <Send fontSize="small" />
                      Subscribe
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            </Form>

            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              🔒 We respect your privacy. Unsubscribe at any time.
            </Typography>
          </Col>
        </Row>
      </Container>

      {/* MUI Snackbar for Success Message */}
      <Snackbar 
        open={subscribed} 
        autoHideDuration={3000} 
        onClose={() => setSubscribed(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          🎉 Successfully subscribed! Check your inbox for confirmation.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Newsletter;
