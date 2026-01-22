import { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Alert,
  Avatar,
  Divider
} from '@mui/material';
import { Send, Star } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';

const FeedbackForm = ({ courseId, courseName }) => {
  const { user, submitFeedback, getCourseFeedbacks } = useApp();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const feedbacks = getCourseFeedbacks(courseId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please provide a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Please provide a comment with at least 10 characters');
      return;
    }

    submitFeedback(courseId, rating, comment);
    setSubmitted(true);
    setRating(0);
    setComment('');

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box>
      {user ? (
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h6" gutterBottom>
            Share Your Feedback
          </Typography>
          
          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you for your feedback!
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
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
              label="Your Comment"
              placeholder="Share your experience with this course..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Send />}
            >
              Submit Feedback
            </Button>
          </form>
        </Paper>
      ) : (
        <Alert severity="info" sx={{ mb: 3 }}>
          Please login to submit feedback for this course.
        </Alert>
      )}

      {feedbacks.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Student Reviews ({feedbacks.length})
          </Typography>
          
          {feedbacks.map((feedback, index) => (
            <Paper key={feedback.id} sx={{ p: 2, mb: 2 }} elevation={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {feedback.userName?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {feedback.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(feedback.date)}
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Rating value={feedback.rating} size="small" readOnly />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {feedback.comment}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      {feedbacks.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
          No reviews yet. Be the first to review this course!
        </Typography>
      )}
    </Box>
  );
};

export default FeedbackForm;
