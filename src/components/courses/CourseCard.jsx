import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating
} from '@mui/material';
import { AccessTime, Person, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isEnrolled, enrollInCourse } = useApp();

  const enrolled = isEnrolled(course.id);

  const handleEnroll = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    enrollInCourse(course.id);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
      onClick={() => navigate(`/courses/${course.id}`)}
    >
      <CardMedia
        component="img"
        height="160"
        image={course.image}
        alt={course.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip
            label={course.level}
            size="small"
            color={getLevelColor(course.level)}
          />
          <Chip
            label={course.category}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
          {course.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description.slice(0, 80)}...
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.instructor}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {course.duration}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={course.rating} precision={0.1} size="small" readOnly />
            <Typography variant="body2" color="text.secondary">
              ({course.rating})
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          ${course.price}
        </Typography>
        {enrolled ? (
          <Button variant="contained" color="success" size="small" disabled>
            Enrolled
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEnroll}
          >
            Enroll Now
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
