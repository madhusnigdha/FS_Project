import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, Paper, Chip } from '@mui/material';
import { Container as BsContainer, Row, Col, Badge } from 'react-bootstrap';
import { School, Person, Star, TrendingUp, PlayArrow, AutoAwesome } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Categories from '../components/home/Categories';

const Home = () => {
  const { courses } = useApp();

  const featuredCourses = courses.slice(0, 4);

  const stats = [
    { icon: <School fontSize="large" />, value: '50+', label: 'Courses' },
    { icon: <Person fontSize="large" />, value: '10,000+', label: 'Students' },
    { icon: <Star fontSize="large" />, value: '4.8', label: 'Average Rating' },
    { icon: <TrendingUp fontSize="large" />, value: '95%', label: 'Success Rate' }
  ];

  return (
    <Box>
      {/* Hero Section - Using Bootstrap Grid + MUI Components */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}
        <Box sx={{ 
          position: 'absolute', 
          top: -100, 
          right: -100, 
          width: 300, 
          height: 300, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.1)' 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -50, 
          left: -50, 
          width: 200, 
          height: 200, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.05)' 
        }} />

        <BsContainer>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Badge bg="warning" text="dark" className="mb-3 px-3 py-2">
                <AutoAwesome sx={{ fontSize: 14, mr: 0.5 }} /> #1 Learning Platform
              </Badge>
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold" 
                gutterBottom 
                sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.2 }}
              >
                Unlock Your Potential with Online Learning
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                Discover thousands of courses from expert instructors. Start your learning journey today!
              </Typography>
              
              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  component={Link}
                  to="/courses"
                  variant="contained"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': { bgcolor: 'grey.100', transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Courses
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    borderWidth: 2,
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Get Started Free
                </Button>
              </Box>

              {/* Trust indicators */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    {[1,2,3,4].map(i => (
                      <Box 
                        key={i}
                        component="img"
                        src={`https://ui-avatars.com/api/?name=User${i}&background=random&size=32`}
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          border: '2px solid white',
                          ml: i > 1 ? -1.5 : 0
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    <strong>10,000+</strong> happy students
                  </Typography>
                </Box>
              </Box>
            </Col>
            <Col lg={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Students learning"
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.5s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)'
                  }
                }}
              />
            </Col>
          </Row>
        </BsContainer>
      </Box>

      {/* Stats Section - Bootstrap Cards + MUI Typography */}
      <BsContainer className="py-5" style={{ marginTop: '-60px', position: 'relative', zIndex: 10 }}>
        <Row className="g-3">
          {stats.map((stat, index) => (
            <Col xs={6} lg={3} key={index}>
              <div className="card h-100 border-0 shadow text-center py-4 stat-card">
                <div className="card-body">
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </BsContainer>

      {/* Categories Section */}
      <Categories />

      {/* Featured Courses */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Chip label="Top Rated" color="primary" size="small" sx={{ mb: 1 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Featured Courses
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore our most popular courses handpicked for you
            </Typography>
          </Box>
          <Button 
            component={Link} 
            to="/courses" 
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            View All Courses →
          </Button>
        </Box>
        <Grid container spacing={3}>
          {featuredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us - Bootstrap Grid + MUI Cards */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <BsContainer>
          <Row className="text-center mb-5">
            <Col>
              <Badge bg="success" className="mb-3">Why Us</Badge>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Why Choose CoursePortal?
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We provide the best learning experience for our students
              </Typography>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              {
                title: 'Expert Instructors',
                description: 'Learn from industry professionals with real-world experience.',
                icon: '👨‍🏫',
                color: '#1976d2'
              },
              {
                title: 'Flexible Learning',
                description: 'Study at your own pace, anywhere and anytime.',
                icon: '🕐',
                color: '#9c27b0'
              },
              {
                title: 'Affordable Prices',
                description: 'Quality education at prices that fit your budget.',
                icon: '💰',
                color: '#2e7d32'
              },
              {
                title: 'Certificate',
                description: 'Earn certificates upon completion of courses.',
                icon: '🎓',
                color: '#ed6c02'
              }
            ].map((feature, index) => (
              <Col xs={12} sm={6} lg={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: `${feature.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      <Typography variant="h3">{feature.icon}</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Col>
            ))}
          </Row>
        </BsContainer>
      </Box>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              color: 'white',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              position: 'absolute', 
              top: -30, 
              right: -30, 
              width: 150, 
              height: 150, 
              borderRadius: '50%', 
              bgcolor: 'rgba(255,255,255,0.1)' 
            }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Ready to Start Learning?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of students already learning on CoursePortal
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 5,
                py: 1.5,
                fontWeight: 600,
                '&:hover': { bgcolor: 'grey.100', transform: 'scale(1.05)' },
                transition: 'all 0.3s ease'
              }}
            >
              Sign Up Now — It's Free!
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Custom Styles */}
      <style>{`
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </Box>
  );
};

export default Home;
