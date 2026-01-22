import { createContext, useContext, useState, useEffect } from 'react';
import { coursesData } from '../data/courses';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrolledCourses');
    return saved ? JSON.parse(saved) : [];
  });

  // Feedback data
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem('feedbacks');
    return saved ? JSON.parse(saved) : [];
  });

  // All courses
  const [courses] = useState(coursesData);

  // Persist to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Auth functions
  const login = (email, password) => {
    // Simulate login - in real app, this would call an API
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };
    setUser(userData);
    return true;
  };

  const register = (name, email, password) => {
    // Simulate registration
    const userData = {
      id: Date.now(),
      email,
      name,
      avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    setUser(userData);
    return true;
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
  };

  // Course functions
  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      return true;
    }
    return false;
  };

  const unenrollFromCourse = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  const getEnrolledCourseDetails = () => {
    return courses.filter(course => enrolledCourses.includes(course.id));
  };

  // Feedback functions
  const submitFeedback = (courseId, rating, comment) => {
    const feedback = {
      id: Date.now(),
      courseId,
      userId: user?.id,
      userName: user?.name,
      rating,
      comment,
      date: new Date().toISOString()
    };
    setFeedbacks([...feedbacks, feedback]);
    return true;
  };

  const getCourseFeedbacks = (courseId) => {
    return feedbacks.filter(fb => fb.courseId === courseId);
  };

  const value = {
    user,
    courses,
    enrolledCourses,
    feedbacks,
    login,
    register,
    logout,
    enrollInCourse,
    unenrollFromCourse,
    isEnrolled,
    getEnrolledCourseDetails,
    submitFeedback,
    getCourseFeedbacks
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
