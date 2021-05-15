import React, { useState } from 'react';
import { Modal, Button, Backdrop, Fade, Paper } from '@material-ui/core';
import styled from 'styled-components';

const PostModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <ButtonContainer>
                <ModalButton onClick={handleModalOpen}>
                    Create Recipe
                </ModalButton>
            </ButtonContainer>
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

const RecipeModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`

const RecipePaper = styled(Paper)`
    padding: 20px;
`


export default PostModal;
