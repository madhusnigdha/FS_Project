import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { EmojiEvents, Verified, WorkspacePremium } from '@mui/icons-material';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Software Developer",
      company: "Google",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=1976d2&color=fff",
      content: "The courses here transformed my career. I went from a junior to senior developer in just one year!",
      rating: 5
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Data Scientist",
      company: "Microsoft",
      avatar: "https://ui-avatars.com/api/?name=James+Rodriguez&background=9c27b0&color=fff",
      content: "Best investment I've made in my education. The instructors are world-class.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "UX Designer",
      company: "Apple",
      avatar: "https://ui-avatars.com/api/?name=Emily+Chen&background=2e7d32&color=fff",
      content: "Flexible learning that fits my busy schedule. Highly recommend to everyone!",
      rating: 5
    }
  ];

  const achievements = [
    { icon: <EmojiEvents />, value: "50K+", label: "Graduates" },
    { icon: <Verified />, value: "98%", label: "Satisfaction" },
    { icon: <WorkspacePremium />, value: "200+", label: "Awards" }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
      <Container>
        {/* Section Header */}
        <Row className="text-center mb-5">
          <Col>
            <Badge bg="primary" className="mb-3 px-3 py-2">Testimonials</Badge>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              What Our Students Say
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Join thousands of satisfied learners who have transformed their careers
            </Typography>
          </Col>
        </Row>

        {/* Testimonial Cards - Using Bootstrap Grid */}
        <Row className="g-4 mb-5">
          {testimonials.map((testimonial) => (
            <Col key={testimonial.id} md={4}>
              <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                <div className="card-body p-4">
                  {/* Star Rating */}
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="card-text text-muted mb-4" style={{ fontStyle: 'italic' }}>
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author Info - Using MUI Avatar */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {testimonial.role} at {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Achievement Stats - Bootstrap + MUI Hybrid */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="card bg-primary text-white border-0 shadow-lg">
              <div className="card-body py-4">
                <Row className="text-center">
                  {achievements.map((achievement, index) => (
                    <Col key={index} xs={4}>
                      <Box sx={{ color: 'white' }}>
                        {achievement.icon}
                      </Box>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
                        {achievement.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {achievement.label}
                      </Typography>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default Testimonials;
