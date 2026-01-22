import { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Chip,
  Paper,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Search, ExpandMore, FilterList } from '@mui/icons-material';

const CourseFilter = ({ filters, setFilters, categories }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(!isMobile);

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleLevelChange = (e) => {
    setFilters({ ...filters, level: e.target.value });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      level: '',
      priceRange: [0, 200]
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.level || 
    filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200;

  const filterContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextField
        fullWidth
        placeholder="Search courses..."
        value={filters.search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Level</InputLabel>
        <Select
          value={filters.level}
          onChange={handleLevelChange}
          label="Level"
        >
          <MenuItem value="">All Levels</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Advanced">Advanced</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography gutterBottom>Price Range</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          valueLabelFormat={(value) => `$${value}`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${filters.priceRange[1]}
          </Typography>
        </Box>
      </Box>

      {hasActiveFilters && (
        <Chip
          label="Clear All Filters"
          onDelete={clearFilters}
          color="primary"
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        />
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList />
            <Typography>Filters</Typography>
            {hasActiveFilters && (
              <Chip label="Active" size="small" color="primary" />
            )}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {filterContent}
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Paper sx={{ p: 3 }} elevation={2}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterList /> Filters
      </Typography>
      {filterContent}
    </Paper>
  );
};

export default CourseFilter;
