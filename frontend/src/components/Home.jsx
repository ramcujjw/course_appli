import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Home = () => {
    const user = localStorage.getItem("username");
    const [inputs, setInputs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:3000/course');
            setInputs(res.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError('Failed to load courses.');
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/course/deleteCourse/${id}`);
            // Update state without reloading the page
            setInputs(inputs.filter(course => course._id !== id));
        } catch (error) {
            console.error(error);
            setError('Failed to delete course.');
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const updateCourse = (course) => {
        navigate('/add', { state: { course } });
    };

    return (
        <>
            <Navbar />
            <div>Welcome {user}</div>
            
            <Container>
                {loading ? (
                    <Typography variant="h6">Loading courses...</Typography>
                ) : error ? (
                    <Typography variant="h6" color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={8}>
                        {inputs.map((input) => (
                            <Grid item key={input.CourseId} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={input.CourseImage}
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {input.CourseId}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {input.CourseName}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {input.CourseCategory}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {input.CourseDescription}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {input.CourseDuration}
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {input.fee}
                                        </Typography>

                                        <Stack direction="row" spacing={4}>
                                            <Button variant="contained" color="success" onClick={() => updateCourse(input)}>Edit</Button>
                                            <Button variant="contained" color="error" onClick={() => deleteCourse(input._id)}>Delete</Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default Home;