import { useState, useMemo } from 'react';
import { Container, Typography, Grid, Box, Pagination } from '@mui/material';
import CourseCard from '../components/courses/CourseCard';
import CourseFilter from '../components/courses/CourseFilter';
import { useApp } from '../context/AppContext';

const Courses = () => {
  const { courses } = useApp();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    level: '',
    priceRange: [0, 200]
  });

  const coursesPerPage = 6;

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(courses.map(course => course.category))];
  }, [courses]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || course.category === filters.category;
      const matchesLevel = !filters.level || course.level === filters.level;
      const matchesPrice = course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });
  }, [courses, filters]);

  // Paginate courses
  const paginatedCourses = useMemo(() => {
    const startIndex = (page - 1) * coursesPerPage;
    return filteredCourses.slice(startIndex, startIndex + coursesPerPage);
  }, [filteredCourses, page]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Box sx={{ py: 4, minHeight: '80vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          All Courses
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover {courses.length} courses to boost your skills
        </Typography>

        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <CourseFilter
              filters={filters}
              setFilters={handleFiltersChange}
              categories={categories}
            />
          </Grid>

          {/* Courses Grid */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedCourses.length} of {filteredCourses.length} courses
              </Typography>
            </Box>

            {paginatedCourses.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {paginatedCourses.map((course) => (
                    <Grid item xs={12} sm={6} lg={4} key={course.id}>
                      <CourseCard course={course} />
                    </Grid>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                    />
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No courses found matching your criteria
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Courses;
