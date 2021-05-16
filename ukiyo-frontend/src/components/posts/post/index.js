import React from 'react';
import clsx from 'clsx';
import { makeStyles, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
                    style={{ minHeight: '55px', maxHeight: '55px' }}
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
                    image={post.picture}
                    title={post.title}
                />
                <CardContent style={{ maxHeight: '40px', minHeight: '40px' }}>
                    <Typography style={{ wordBreak: 'normal' }} variant="body2" color="textSecondary" component="p">
                        {post.preview === '' ? 'Click the arrow to view more about the recipe!' : post.preview}
                    </Typography>
                </CardContent>
                <RecipeActions disableSpacing>
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
                </RecipeActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Method:</Typography>
                        <Recipe>
                            {post.recipe === '' ? 'No recipe found...:(' : post.recipe}
                        </Recipe>
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

const Recipe = styled.pre`
    word-break: normal;
    white-space: pre-wrap;
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 15px;
`

const RecipeActions = styled(CardActions)`
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