import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Radar } from 'react-chartjs-2'; // Looks like it's also called "radar chart" besides "spider chart"
import { Chart, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { containerStyle, paperStyle, titleStyle, chartContainerStyle } from './styles/ProfileStyles';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler); // This is the only function I need from chart.js
// I don't really know why is it needed, I took this from the react-chartjs-2 sandbox

const Profile = () => {
    const location = useLocation();
    const { name, skills } = location.state || {}; // Destructure the data from location.state, I pass those from the Login

    const data = {
        labels: skills,
        datasets: [
            {
                label: 'Skills',
                data: [5, 5, 5, 5, 5], // Just values I thought were appropiate for myself lol (dummy values)
                backgroundColor: 'rgba(47, 44, 44, 0.2)',
                borderColor: '#2f2c2c',
                pointBackgroundColor: '#2f2c2c',
                pointBorderColor: '#D9D9D9',
            },
        ],
    };

    const options = {
        scale: {
            ticks: { beginAtZero: true },
            pointLabels: { font: { size: 14, family: 'Trebuchet MS' } },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={containerStyle}
        >
            <Paper
                elevation={3}
                sx={paperStyle}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={titleStyle}
                >
                    {name}
                </Typography>
                <Box sx={chartContainerStyle}>
                    <Radar data={data} options={options} />
                </Box>
            </Paper>
        </Container>
    );
};

export default Profile;