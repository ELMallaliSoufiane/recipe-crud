import React, {useState} from 'react';
import {Modal, TextField, Box, Button, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const AddModal = (props) => {
    const [name, setName] = useState('');
    const [Ingredients, setIngredients] = useState('');
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        const add = props.test;
        var Recipe = {name : name, ingredients: Ingredients};
        add(Recipe);
        setName('');
        setIngredients('');
        setOpen(false);
    }
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleNameChange = (e) =>{
        setName(e.target.value);
    };
    const handleIngredientChange = (e) => {
        setIngredients(e.target.value);
    };
    

    /* Styling */
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
          color:"#fff",
          backgroundColor: `#424242`,
          border: '2px solid #fff',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        input: {
          width:380,
          color: "white",
          


        },
      }));
      const classes = useStyles();
      const [modalStyle] = useState(getModalStyle);
      const body = (
        <div style={modalStyle} className={classes.paper}>
          <Typography id="Add-Modal-title">Ajouter une recette</Typography>
          <div id="add-modal-description">
          <Box my={2} >
          <TextField className={classes.input} inputProps={{ style: { color: 'white'}}} label="Nom du recette" variant="outlined" onChange={handleNameChange} value={name} />
          </Box>         
          <Box mb={2}>
          <TextField className={classes.input} inputProps={{ style: { color: 'white'}}}  multiline rows={4} label="Ingredients" variant="outlined" onChange={handleIngredientChange} value={Ingredients} />
          </Box>
          <Box mb={2}><Button  size="small" variant="contained" color="primary" onClick={handleSubmit}>Ajouter</Button></Box>
          </div>
        </div>
      );


    return (
        <div>
        <Box display="flex" mb={2} >
          <Box mr="auto"><Typography ><Box fontSize="h6.fontSize" fontWeight="fontWeightMedium">Les Recettes:</Box> </Typography></Box>
          
          <Box ml="auto"><Button  size="small" variant="contained" color="primary"  onClick={handleOpen}>Ajouter une recette</Button>
          </Box>
        </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add-Modal-title"
        aria-describedby="add-modal-description"
      >
        {body}
      </Modal>
    </div>
    );

}
export default AddModal;