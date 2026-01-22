import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  Paper,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material';
import {
  AccessTime,
  Person,
  Star,
  PlayCircle,
  CheckCircle,
  ArrowBack,
  Groups
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import FeedbackForm from '../components/feedback/FeedbackForm';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, user, isEnrolled, enrollInCourse, unenrollFromCourse } = useApp();

  const course = courses.find(c => c.id === parseInt(id));
  const enrolled = isEnrolled(parseInt(id));

  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Course not found</Typography>
        <Button onClick={() => navigate('/courses')} sx={{ mt: 2 }}>
          Back to Courses
        </Button>
      </Container>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
  };

  const handleUnenroll = () => {
    unenrollFromCourse(course.id);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const curriculum = [
    'Introduction and Setup',
    'Core Concepts and Fundamentals',
    'Hands-on Projects',
    'Advanced Techniques',
    'Best Practices',
    'Final Project & Assessment'
  ];

  return (
    <Box sx={{ py: 4, bgcolor: 'grey.50', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/courses')}
          sx={{ mb: 3 }}
        >
          Back to Courses
        </Button>

        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ overflow: 'hidden' }}>
              <Box
                component="img"
                src={course.image}
                alt={course.title}
                sx={{ width: '100%', height: 300, objectFit: 'cover' }}
              />
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={course.level} color={getLevelColor(course.level)} />
                  <Chip label={course.category} variant="outlined" />
                </Box>

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {course.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Person color="action" />
                    <Typography variant="body1">{course.instructor}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={course.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2">({course.rating})</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Groups color="action" />
                    <Typography variant="body2">{course.students} students</Typography>
                  </Box>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  {course.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  What You'll Learn
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  {[
                    'Build real-world projects',
                    'Understand core concepts',
                    'Best practices and patterns',
                    'Industry-standard tools'
                  ].map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle color="success" fontSize="small" />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Course Curriculum
                </Typography>
                <List>
                  {curriculum.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <PlayCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`Module ${index + 1}: ${item}`}
                      />
                    </ListItem>
                  ))}
                </List>

                <Divider sx={{ my: 3 }} />

                {/* Feedback Section */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Student Feedback
                </Typography>
                <FeedbackForm courseId={course.id} courseName={course.title} />
              </Box>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
                ${course.price}
              </Typography>

              {enrolled ? (
                <>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    You are enrolled in this course
                  </Alert>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ mb: 2 }}
                  >
                    Continue Learning
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={handleUnenroll}
                  >
                    Unenroll
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleEnroll}
                  sx={{ mb: 2 }}
                >
                  Enroll Now
                </Button>
              )}

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                This course includes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><AccessTime /></ListItemIcon>
                  <ListItemText primary={`${course.duration} of content`} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PlayCircle /></ListItemIcon>
                  <ListItemText primary="Video lectures" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><CheckCircle /></ListItemIcon>
                  <ListItemText primary="Certificate of completion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star /></ListItemIcon>
                  <ListItemText primary="Lifetime access" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetail;
