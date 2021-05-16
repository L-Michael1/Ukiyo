import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Backdrop, Fade, Paper, TextField, Grid, Container } from '@material-ui/core';
import { UserContext } from '../../contexts/user-context';
import { PostsContext } from '../../contexts/posts-context';
import { createPost, getPosts } from '../../api';
import FileBase from 'react-file-base64';
import { DEFAULT_PIC } from './constant'
import drooling from '../../assets/drooling.png';
import styled from 'styled-components';
import swal from 'sweetalert';


const PostModal = () => {
    const { user } = useContext(UserContext);
    const { setPosts, setPostsLoading, error, setError } = useContext(PostsContext);
    const initialFormData = {
        uid: user.uid,
        creator: user.nickname,
        title: '',
        preview: '',
        recipe: '',
        picture: DEFAULT_PIC,
    };
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('recipe')) || initialFormData);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('recipe', JSON.stringify(formData));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPostsLoading(true);
        setIsOpen(false);
        try {
            await createPost(user.uid, { ...formData });
            const response = await getPosts();
            response.data.reverse();
            setPosts(response.data);
            if (response.data.length === 0) {
                setError(true);
            }
            localStorage.removeItem('recipe');
            setFormData(initialFormData);
            await swal('Success', 'Created a new recipe', 'success')
        } catch (error) {
            console.error(error.message);
            await swal('Error', 'Trouble creating recipe...try again later', 'error')
        }
        setPostsLoading(false);
    }

    return (
        <>
            <Fade in={true} timeout={{ enter: 1200, exit: 1000 }}>
                {
                    user.uid !== '' ?
                        <ButtonContainer>
                            <ModalButton onClick={handleModalOpen}>
                                Create Recipe
                            </ModalButton>
                        </ButtonContainer> :
                        <ButtonContainer>
                            <LoginLink to='/SignIn'>
                                <LoginButton>
                                    Login to create a recipe
                                </LoginButton>
                            </LoginLink>
                        </ButtonContainer>
                }
            </Fade>
            <RecipeModal
                open={isOpen}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 700,
                }}
            >
                <Fade in={isOpen}>
                    <Container maxWidth='sm'>
                        <RecipePaper elevation={4}>
                            <AvatarContainer>
                                <ModalAvatar src={drooling} />
                            </AvatarContainer>
                            <h1>Create a recipe!</h1>
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <TextField name='title' type='text' variant='outlined' label='Recipe Name' value={formData.title} multiline fullWidth required onChange={handleFormChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField name='preview' type='text' variant='outlined' label='Recipe Preview' value={formData.preview} multiline fullWidth required onChange={handleFormChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField name='recipe' type='text' variant='outlined' label='Recipe Instructions' value={formData.recipe} multiline fullWidth required onChange={handleFormChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <div>
                                            <FileBase
                                                type='file'
                                                multiple={false}
                                                onDone={({ base64 }) => {
                                                    setFormData({ ...formData, picture: base64 })
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <SubmitButton type='submit' fullWidth>Create!</SubmitButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        </RecipePaper>
                    </Container>
                </Fade>
            </RecipeModal>
        </>
    )
}

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 15px;
`

const ModalButton = styled(Button)`
    background-color: #FF8300 !important;
    color: #fff !important;
    padding: 9px !important;
    font-size: 14px !important;
`

const LoginButton = styled(Button)`
    background-color: #FF8300 !important;
    color: #fff !important;
`

const LoginLink = styled(Link)`
    text-decoration: none;
`

const RecipeModal = styled(Modal)`
    position: absolute;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    height: 100%;
`

const AvatarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ModalAvatar = styled.img`
    width: 100%;
    max-width: 50px;
    height: auto;
    margin-bottom: 5px;
`

const RecipePaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 96px;
    margin-bottom: 64px;
    padding: 20px;
`

const Form = styled.form`
    margin-top: 10px;
    width: 100%auto;
`

const SubmitButton = styled(Button)`
    color: #fff !important;
    background-color: #B7AC44 !important;
`

export default PostModal;
