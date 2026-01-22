import { Container, Row, Col, Card } from 'react-bootstrap';
import { Box, Typography, Chip, LinearProgress } from '@mui/material';
import { Code, Storage, PhoneAndroid, Cloud, Brush, Security } from '@mui/icons-material';

const Categories = () => {
  const categories = [
    {
      icon: <Code fontSize="large" />,
      title: "Web Development",
      courses: 45,
      color: "#1976d2",
      progress: 85
    },
    {
      icon: <Storage fontSize="large" />,
      title: "Data Science",
      courses: 32,
      color: "#9c27b0",
      progress: 72
    },
    {
      icon: <PhoneAndroid fontSize="large" />,
      title: "Mobile Development",
      courses: 28,
      color: "#2e7d32",
      progress: 65
    },
    {
      icon: <Cloud fontSize="large" />,
      title: "Cloud Computing",
      courses: 24,
      color: "#ed6c02",
      progress: 58
    },
    {
      icon: <Brush fontSize="large" />,
      title: "UI/UX Design",
      courses: 36,
      color: "#d32f2f",
      progress: 78
    },
    {
      icon: <Security fontSize="large" />,
      title: "Cybersecurity",
      courses: 18,
      color: "#0288d1",
      progress: 45
    }
  ];

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={6}>
            <Chip label="Categories" color="primary" size="small" sx={{ mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Explore Top Categories
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose from our wide range of categories and start learning today
            </Typography>
          </Col>
        </Row>

        {/* Category Cards - Bootstrap Grid with MUI Components */}
        <Row className="g-4">
          {categories.map((category, index) => (
            <Col key={index} sm={6} lg={4}>
              <Card 
                className="h-100 border-0 shadow-sm category-card"
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <Card.Body className="p-4">
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      mb: 3
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${category.color}15`,
                        color: category.color
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.courses} Courses
                      </Typography>
                    </Box>
                  </Box>

                  {/* Progress Bar - MUI */}
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Popularity
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={category.progress}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: category.color,
                          borderRadius: 3
                        }
                      }}
                    />
                  </Box>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style>{`
        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </Box>
  );
};

export default Categories;
