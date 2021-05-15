import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Backdrop, Fade, Paper, TextField } from '@material-ui/core';
import { UserContext } from '../../contexts/user-context'
import styled from 'styled-components';

const PostModal = () => {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
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
                    <RecipePaper elevation={2}>
                        <h1>Create your own recipe!</h1>
                        <form>
                            woo
                        </form>
                    </RecipePaper>
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
    display: flex;
    align-items: center;
    justify-content: center;
`

const RecipePaper = styled(Paper)`
    padding: 20px;
    border: 1px solid orange;
`


export default PostModal;
