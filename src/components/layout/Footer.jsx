import { Container, Row, Col } from 'react-bootstrap';
import { Box, Typography, IconButton, TextField, Button } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, YouTube, Send } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: ['About Us', 'Careers', 'Press', 'Blog'],
    support: ['Help Center', 'Contact Us', 'FAQ', 'Community'],
    legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility']
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a2e',
        color: 'white',
        pt: 8,
        pb: 4,
        mt: 'auto'
      }}
    >
      <Container>
        <Row className="g-4 mb-5">
          {/* Brand Section */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              📚 CoursePortal
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 3, lineHeight: 1.8 }}>
              Empowering students with quality education. Learn from industry experts and advance your career with our comprehensive courses.
            </Typography>
            
            {/* Social Icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { icon: <Facebook />, color: '#1877f2' },
                { icon: <Twitter />, color: '#1da1f2' },
                { icon: <LinkedIn />, color: '#0a66c2' },
                { icon: <Instagram />, color: '#e4405f' },
                { icon: <YouTube />, color: '#ff0000' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: social.color }
                  }}
                  size="small"
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Col>

          {/* Quick Links */}
          <Col xs={6} md={4} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Company
            </Typography>
            <ul className="list-unstyled">
              {footerLinks.company.map((link, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none"
                    style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = 'white'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={6} md={4} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Support
            </Typography>
            <ul className="list-unstyled">
              {footerLinks.support.map((link, index) => (
                <li key={index} className="mb-2">
                  <a 
                    href="#" 
                    className="text-decoration-none"
                    style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                    onMouseOver={(e) => e.target.style.color = 'white'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Stay Connected
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
              Subscribe to get updates on new courses and features.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1
                  }
                }}
              />
              <Button variant="contained" color="primary" sx={{ minWidth: 'auto', px: 2 }}>
                <Send fontSize="small" />
              </Button>
            </Box>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            pt: 3,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {currentYear} CoursePortal. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {footerLinks.legal.slice(0, 3).map((link, index) => (
              <a 
                key={index}
                href="#" 
                className="text-decoration-none"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
              >
                {link}
              </a>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
