import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dog } from '../models/dogModel';

  
  interface DogCardProps {
    dog: Dog;
    isFavorite: boolean;
    onToggleFavorite: (dogId: string) => void;
  }
  
  export const DogCard: React.FC<DogCardProps> = ({ dog, isFavorite, onToggleFavorite }) => {
  
  
    return (
      <Card sx={{ maxWidth: 345, margin: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="dog">
              {dog.name.charAt(0)}
            </Avatar>
          }
          title={dog.name}
          subheader={`${dog.breed} • Age: ${dog.age}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={dog.img}
          alt={dog.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            ZIP Code: {dog.zip_code}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* Toggle favorite */}
          <IconButton aria-label="add to favorites" onClick={() => onToggleFavorite(dog.id)}>
            {isFavorite ? (
              <FavoriteIcon sx={{ color: red[500] }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
        </CardActions>
        <Collapse  timeout="auto" unmountOnExit>
          <CardContent>
            {/* You can include additional details about the dog here */}
            <Typography paragraph>
              More details about {dog.name} can be displayed here.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  };