import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  Paper
} from '@mui/material';
import { PlayCircle, School, ArrowForward } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const MyCourses = () => {
  const { user, getEnrolledCourseDetails, unenrollFromCourse } = useApp();
  const navigate = useNavigate();

  const enrolledCourses = getEnrolledCourseDetails();

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Please login to view your courses
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Container>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <Box sx={{ py: 8, bgcolor: 'grey.50', minHeight: '80vh' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <School sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            No Enrolled Courses Yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start your learning journey by enrolling in a course
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/courses')}
            endIcon={<ArrowForward />}
          >
            Browse Courses
          </Button>
        </Container>
      </Box>
    );
  }

  // Simulate random progress for demo
  const getProgress = (courseId) => {
    const saved = localStorage.getItem(`progress_${courseId}`);
    if (saved) return parseInt(saved);
    const progress = Math.floor(Math.random() * 100);
    localStorage.setItem(`progress_${courseId}`, progress.toString());
    return progress;
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'grey.50', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Courses
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Continue learning where you left off
        </Typography>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="primary" fontWeight="bold">
                {enrolledCourses.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enrolled Courses
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {enrolledCourses.filter(c => getProgress(c.id) === 100).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {enrolledCourses.filter(c => getProgress(c.id) < 100).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {enrolledCourses.map((course) => {
            const progress = getProgress(course.id);
            return (
              <Grid item xs={12} md={6} key={course.id}>
                <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 150, sm: 'auto' } }}
                    image={course.image}
                    alt={course.title}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Chip
                        label={course.category}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="h6" fontWeight="bold">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {course.instructor}
                      </Typography>
                      
                      <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<PlayCircle />}
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        {progress === 100 ? 'Review' : 'Continue'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => unenrollFromCourse(course.id)}
                      >
                        Unenroll
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default MyCourses;
