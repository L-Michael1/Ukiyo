import React from 'react';
import clsx from 'clsx';
import { makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ukiyo from '../../../assets/ukiyo-food.png'
import drooling from '../../../assets/drooling.png'
import moment from 'moment'
import styled from 'styled-components';

const Post = ({ post }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (post) {
        return (
            <RecipeCard>
                <CardHeader
                    avatar={
                        <UserAvatar aria-label="recipe">
                            {post.creator.charAt(0)}
                        </UserAvatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={post.title}
                    subheader={`${moment(post.createdAt).fromNow()} by ${post.creator}`}
                />
                <MediaCard
                    image={drooling}
                    title={post.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {post.preview === '' ? 'Click the arrow to view more about the recipe!' : post.preview}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Typography paragraph>
                            {post.recipe === '' ? 'No recipe found...:(' : post.recipe}
                        </Typography>
                    </CardContent>
                </Collapse>
            </RecipeCard>
        );
    } else {
        return null;
    }
}

const RecipeCard = styled(Card)`
    width: 325px;
    margin: 45px 20px;
`

const MediaCard = styled(CardMedia)`
    height: 0;
    padding-top: 56.25%;
`

const UserAvatar = styled(Avatar)`
    background-color: #f4a261 !important;
`

const useStyles = makeStyles((theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default Post;