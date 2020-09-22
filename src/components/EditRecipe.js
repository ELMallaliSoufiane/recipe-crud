import React, {useState, useEffect} from 'react';
import {Modal, TextField, Box, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const EditModal = (props) => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [index , setIndex] = useState(0);
    useEffect(()=>{
        if(index !== props.ElementIndex || name !== props.recipe.name || ingredients !== props.recipe.ingredients ){
            setName(props.recipe.name);
            setIngredients(props.recipe.ingredients);
            setIndex(props.ElementIndex);
        }
    });

    /* Modal Functions */
    const [open, setOpen] = useState(false);
    
    const handleOpen = (Recipe,Index) => {
      setOpen(true);
    };
    const handleClose = () => {
       const handleModal = props.handleModal;
       handleModal();
      };
      function getModalStyle() {
        const top = 50;
        const left = 50;
      
        return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
        };
      }
      const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        input: {
          width:380,


        },
      }));
      /* Handling changes */
     /* const LoadRecipe = (Recipe, Index)=>{
          setName(Recipe.name);
          setIngredients(Recipe.Ingredients);
          setIndex(Index);
      }*/
      const handleNameChange = (e) =>{
        setName(e.target.value);
    };
    const handleIngredientChange = (e) => {
        setIngredients(e.target.value);
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const Edit = props.Edit;
        Edit(name, ingredients, index);
        handleClose();

    }

      /* rendering */
      const classes = useStyles();
      const [modalStyle] = useState(getModalStyle);
      const body = (
        <div style={modalStyle} className={classes.paper}>
          <Typography id={index}>Modifier La recette</Typography>
          <div id={"edit-modal-description" + index}>
          <Box my={2}>
          <TextField className={classes.input} label="Nom du recette" variant="outlined" onChange={handleNameChange} value={name} />
          </Box>         
          <Box mb={2}>
          <TextField className={classes.input} label="Ingredients" multiline rows={4} variant="outlined" onChange={handleIngredientChange} value={ingredients} />
          </Box>
          <Box mb={2}><Button  size="small" variant="contained" color="primary" onClick={handleSubmit}>Modifier</Button></Box>
          </div>
        </div>
      );

    return (
        <div>
      <Modal
        
        open={props.show}
        onClose={handleClose}
        aria-labelledby={index}
        aria-describedby={"edit-modal-description" + index}
      >
        {body}
      </Modal>
    </div>
    );
}
export default EditModal;