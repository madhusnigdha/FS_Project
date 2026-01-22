import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Avatar,
  Divider,
  Grid
} from '@mui/material';
import { Send, Star, Feedback as FeedbackIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const Feedback = () => {
  const { user, getEnrolledCourseDetails, submitFeedback, feedbacks } = useApp();
  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const enrolledCourses = getEnrolledCourseDetails();

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Please login to provide feedback
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }

    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please provide a comment with at least 10 characters');
      return;
    }

    submitFeedback(parseInt(selectedCourse), rating, comment);
    setSubmitted(true);
    setSelectedCourse('');
    setRating(0);
    setComment('');

    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get user's feedbacks
  const userFeedbacks = feedbacks.filter(fb => fb.userId === user.id);

  return (
    <Box sx={{ py: 4, bgcolor: 'grey.50', minHeight: '80vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Course Feedback
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Share your learning experience with us
        </Typography>

        <Grid container spacing={4}>
          {/* Feedback Form */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <FeedbackIcon color="primary" fontSize="large" />
                <Typography variant="h6" fontWeight="bold">
                  Submit Feedback
                </Typography>
              </Box>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Thank you for your feedback!
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {enrolledCourses.length === 0 ? (
                <Alert severity="info">
                  You need to enroll in a course before providing feedback.
                  <Button
                    size="small"
                    onClick={() => navigate('/courses')}
                    sx={{ ml: 1 }}
                  >
                    Browse Courses
                  </Button>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Select Course</InputLabel>
                    <Select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      label="Select Course"
                    >
                      {enrolledCourses.map((course) => (
                        <MenuItem key={course.id} value={course.id}>
                          {course.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Box sx={{ mb: 3 }}>
                    <Typography component="legend" gutterBottom>
                      Your Rating *
                    </Typography>
                    <Rating
                      value={rating}
                      onChange={(e, newValue) => setRating(newValue)}
                      size="large"
                      icon={<Star fontSize="inherit" color="primary" />}
                      emptyIcon={<Star fontSize="inherit" />}
                    />
                  </Box>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Comment *"
                    placeholder="Share your experience with this course..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    fullWidth
                  >
                    Submit Feedback
                  </Button>
                </form>
              )}
            </Paper>
          </Grid>

          {/* User's Previous Feedbacks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }} elevation={2}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Your Previous Feedbacks
              </Typography>
              <Divider sx={{ mb: 3 }} />

              {userFeedbacks.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {userFeedbacks.map((feedback) => {
                    const course = enrolledCourses.find(c => c.id === feedback.courseId);
                    return (
                      <Card key={feedback.id} variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {course?.title || 'Course'}
                            </Typography>
                            <Rating value={feedback.rating} size="small" readOnly />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {feedback.comment}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(feedback.date)}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    You haven't submitted any feedback yet.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Feedback;
