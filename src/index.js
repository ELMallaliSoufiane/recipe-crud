import React from 'react';
import ReactDOM from 'react-dom';
import {Container, Card, Typography, CardActionArea, CardContent, CardMedia, CardActions, Button, Box, Modal} from '@material-ui/core';
import AddModal from './components/AddRecipe';
import EditModal from './components/EditRecipe';
import './app.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import blue from '@material-ui/core/colors/blue';



class Recipe extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            recipes : [{imageurl: "./assets/1.jpg", name: 'recipe1', ingredients:'test1, test2, test3'}, {imageurl: "./assets/2.jpg",name: 'recipe5', ingredients:'teasdsadasdsadst3'}],
            Editindex: 0,
            Edit: false,
            
        }
        this.addRecipe = this.addRecipe.bind(this);
        this.test = this.test.bind(this);
        this.EditRecipe = this.EditRecipe.bind(this);
        this.showEdit = this.showEdit.bind(this);
        
    }
    

    componentDidMount() {
        var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
          {name: "exemple 1 ", ingredients: "Ingr 1, Ingr 2, Ingr 3, Ingr 4, Ingr 5"},
          {name: "exemple 2 ", ingredients: "Ingr 1, Ingr 2, Ingr 3"},
          {name: "exemple 3 ", ingredients: "Ingr 1, Ingr 2, Ingr 3, Ingr 4"}
        ];
        this.setState({recipes: recipes});
      }

    showEdit(index){
        this.setState({
            Editindex: index,
            Edit:!this.state.Edit,
             
        });
    }

    EditRecipe(name, ingredients, index){
        let recipes = this.state.recipes.slice();
        recipes[index] = {name : name, ingredients: ingredients};
        this.setState({recipes: recipes});
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    
    addRecipe(Recipe){
        let recipes = this.state.recipes.slice();

        
        recipes.push(Recipe);
        this.setState({
            recipes: recipes,
        });
        localStorage.setItem('recipes', JSON.stringify(recipes));

    }
    deleteRecipe(index){
        let recipes = this.state.recipes.slice();
        recipes.splice(index, 1);
        this.setState({
            recipes: recipes,
        })
        localStorage.setItem('recipes', JSON.stringify(recipes));

    }



    test(Recipe){
        
        let recipes = this.state.recipes.slice();
        console.log(Recipe);
        recipes.push(Recipe);
        this.setState({
            recipes: recipes,
        });
        localStorage.setItem('recipes', JSON.stringify(recipes));
    };
    




    render(){
        
        var currentlyEditing = this.state.Editindex;
        
        const Menu = this.state.recipes.map((recipe,index) => {
            return(
                <Box key={index} boxShadow={2} my={2}>
                    <Card className="Cardo">
                        <CardActionArea>
                                <CardMedia className="CardoMedia" style = {{ height: 150}} image={require("./assets/1.jpg")} title="Contemplative Reptile" />
                            
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
                                <Box className="ingredientsBox" fontWeight="fontWeightMedium" fontSize="h6.fontSize" >
                                    <Typography variant="body2" component="p">
                                    {recipe.ingredients}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            
                            <Button size="small"  onClick={() => {this.showEdit(index)}}>
                            <Box color="warning.main"> Modifier</Box>
                            </Button>
                            
                            <Button size="small"   color="secondary" onClick={()=>{this.deleteRecipe(index)}}>
                            Supprimer
                            </Button>
                        </CardActions>
                    </Card>
                    </Box>
            )
        });
        return (<Container maxWidth="sm">
         <AddModal test={this.test} />

        {Menu ? Menu : ''}

        <EditModal show={this.state.Edit} handleModal={()=>{this.showEdit(this.state.Editindex)}} Edit={this.EditRecipe} ElementIndex={this.state.Editindex} recipe={this.state.recipes[this.state.Editindex]} />

        </Container>);
    }
}
const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#90caf9',
      },
      type: "dark",
      
    }
  });

ReactDOM.render(  <ThemeProvider theme={theme}>
    <Recipe />
  </ThemeProvider>, document.getElementById('root'));