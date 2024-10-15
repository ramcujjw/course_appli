import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from './Navbar';
import { Button, CircularProgress } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [form, setForm] = useState({
    CourseImage: '',
    CourseId: '',
    CourseName: '',
    CourseCategory: '',
    CourseDescription: '',
    CourseDuration: '',
    fee: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendData = async () => {
    setLoading(true);
    setError('');

    try {
      if (location.state != null) {
        await axios.put(`http://localhost:3000/course/editCourse/${location.state.course._id}`, form);
        alert('Data updated');
      } else {
        await axios.post('http://localhost:3000/course/add/', form);
      }
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError('An error occurred while saving data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onPChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (location.state != null) {
      setForm({
        CourseId: location.state.course.CourseId,
        CourseName: location.state.course.CourseName,
        CourseImage: location.state.course.CourseImage,
        CourseDescription: location.state.course.CourseDescription,
        CourseCategory: location.state.course.CourseCategory,
        CourseDuration: location.state.course.CourseDuration,
        fee: location.state.course.fee
      });
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <div>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="ID" name='CourseId' value={form.CourseId} onChange={onPChange} variant="outlined" /><br />
          <TextField id="outlined-basic" label="Name" name="CourseName" value={form.CourseName} onChange={onPChange} variant="outlined" /><br />
          <TextField id="outlined-basic" label="Category" name='CourseCategory' value={form.CourseCategory} onChange={onPChange} variant="outlined" /><br />
          <TextField id="outlined-basic" label="Description" name='CourseDescription' value={form.CourseDescription} onChange={onPChange} variant="outlined" /><br />
          <TextField id="outlined-basic" label="Duration" name='CourseDuration' value={form.CourseDuration} onChange={onPChange} variant="outlined" /><br />
          <TextField id="outlined-basic" label="Fee" name='fee' value={form.fee} onChange={onPChange} variant="outlined" /><br />
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <Button variant="contained" onClick={sendData} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      </div>
    </>
  );
};

export default Add;