import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


// eslint-disable-next-line react/prop-types
export default function Prayer({ name, time, image }) {
    return (
        <Card sx={{ maxWidth: 345 }} className='prayerCard' style={{ marginLeft: "20px" }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" s component="h1">
                    {name}
                </Typography>
                <Typography variant="h1" color="text.secondary" style={{ fontSize: "65px" }}>
                    {time}
                </Typography>
            </CardContent>
        </Card>
    );
}
