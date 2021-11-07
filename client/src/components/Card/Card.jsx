import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  Grid,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import http from "../../helpers/http.helper";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardItem({ product, handleDelete }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (productDate) => {
    const date = new Date(productDate);
    return (
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear()
    );
  };

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {product.title.slice(0, 1).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.title}
          subheader={formatDate(product.date)}
        />
        <CardMedia
          component="img"
          height="194"
          image={`${http.domain.slice(0, -4)}/uploads/productImages/${
            product.images
          }`}
          alt={product.images}
        />
        <CardContent>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {product.description.length > 100
                ? `${product.description.slice(0, 100)}...`
                : product.description}
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="delete" onClick={() => handleDelete(product)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <Link to={`/add-product/${product._id}`} className="text-gray">
              <EditIcon />
            </Link>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Category:</Typography>
            <Typography paragraph>{product.category}</Typography>
            <Typography paragraph>Full Description:</Typography>
            <Typography paragraph>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
}
