import React, {useState, useEffect,useRef} from 'react'
import { View, Text, Image, ScrollView} from 'react-native'
import styled from 'styled-components/native';
import { Dimensions, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class SwipeableImage extends React.Component {
    constructor(props) {
        super(props);
        this.recipe = props.recipe;
        this.index = props.index;

        console.log(this.props.recipe[0])
        this.state = 
        {
            cardWidth: new Animated.Value(385),
            cardHeight: new Animated.Value(screenHeight- (screenHeight*0.35)),
            imgHeight: new Animated.Value(screenHeight- (screenHeight*0.35)),
            top: new Animated.Value(65),
            opacity: new Animated.Value(0),
            imgBorderRadius: new Animated.Value(30),
            cardOpen: false,
        }
      }

      openCard = () => {
          console.log("tapped");
        if (!this.props.canOpen) return;
        if(!this.state.cardOpen){

        Animated.spring(this.state.cardWidth, { toValue: 390, useNativeDriver:false }).start();
        Animated.timing(this.state.cardHeight, { toValue: 3000, useNativeDriver:false }).start();
        Animated.spring(this.state.top, { toValue: 5, useNativeDriver:false }).start();
        Animated.spring(this.state.imgHeight, { toValue: 275, useNativeDriver:false }).start();
        Animated.spring(this.state.imgBorderRadius, { toValue: 0, useNativeDriver:false }).start();
        Animated.spring(this.state.opacity, { toValue: 1, tension:3, useNativeDriver:false }).start();


        this.state.cardOpen = true;
        }
        else
        {
            this.closeCard()
            this.state.cardOpen = false;
        }

      }

      closeCard = ()=>
      {
        Animated.spring(this.state.cardWidth, { toValue: 385, useNativeDriver:false }).start();
        Animated.spring(this.state.cardHeight, { toValue: (screenHeight- (screenHeight*0.35)), useNativeDriver:false }).start();
        Animated.spring(this.state.top, { toValue: 65, useNativeDriver:false }).start();
        Animated.spring(this.state.imgHeight, { toValue: (screenHeight- (screenHeight*0.35)), useNativeDriver:false }).start();
        Animated.spring(this.state.imgBorderRadius, { toValue: 30, useNativeDriver:false }).start();
        Animated.spring(this.state.opacity, { toValue: 0,  useNativeDriver:false }).start();
      }



      filterText = (recipe, filterText, substringValue) =>
      {   
          let list = []     

          //console.log(`---- ${filterText} ----`)
        for (const [key, value] of Object.entries(recipe)) {
            if(key.includes(filterText)){
                if(value !== ""){
            //console.log(`${key.substring(substringValue)}: ${value}`);
            list.push(value);
          }
        }
        }
        return list;
      }



    render() {
        return (
            <ScrollView style={width='100%'} showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={this.openCard} style={styles.shadows}>
            <AnimatedContainer style={[
            {
                width:this.state.cardWidth,
                maxHeight:this.state.cardHeight,
                marginTop:this.state.top,
                elevation: 4,
                margin:15,
     
            }]} >      
                <AnimatedProfileWrapper
                style={{height:this.state.imgHeight,
                borderRadius:this.state.imgBorderRadius,}}>
                    <SwipeImage 
                    source={{ uri: this.props.recipe[0].strMealThumb}}/> 
                    <TextContainer> 
                                    <DishName>{this.props.recipe[0].strMeal}</DishName>
                                    <SubText>{this.props.recipe[0].strArea} - {this.props.recipe[0].strCategory}</SubText>
                    </TextContainer>
                </AnimatedProfileWrapper>
                    <AnimatedDescriptionContainer style={{ opacity: this.state.opacity}}>
                        {this.filterText(this.props.recipe[0],'strMeasure', 10).length > 0 &&                        
                        <>
                        <Title>Ingredients</Title>

                        { this.filterText(this.props.recipe[0],'strMeasure', 10).map((ingredient, index) => {
                            if(ingredient != null)
                            {
                                if(ingredient.length > 1){
                                    return(
                                        
                                        <IngredientWrapper key={index} >
                                        <Measure>{this.filterText(this.props.recipe[0],'strIngredient', 13)[index]}</Measure>
                                        <Ingredient>{ingredient}</Ingredient>
                                        </IngredientWrapper>
                                        
                                    )
                                }
                            }
                            return(null)

                        }        
                        )}
                        </>}
                        </AnimatedDescriptionContainer>
                        <AnimatedDescriptionContainer style={{ opacity: this.state.opacity}}>
                        <Title>
                            Instructions
                        </Title>
                        <Description>{this.props.recipe[0].strInstructions}</Description>
                        </AnimatedDescriptionContainer>
            </AnimatedContainer>
        </TouchableWithoutFeedback>
        </ScrollView>

        )
    }
}



const Container = styled(View)`
width: 375px;
max-height: 600px;
height:auto;
background-color: ${(props) => props.theme.colors.background};
border-radius:15px;
align-self:center;
`
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TextContainer = styled(View)`
position:absolute;
align-self:center;
bottom:3%;
width: 95%;
height: auto;
text-align:left;
justify-content: flex-end ;`

const ProfileWrapper = styled(View)`
width:100%;
height:600px;`

const AnimatedProfileWrapper = Animated.createAnimatedComponent(ProfileWrapper);


const SubText = styled(Text)`
font-size:20px;
padding-left:15px;
color:white;
text-shadow: 2px 2px 4px #000000;
`

const DishName = styled(Text)`
font-size:28px;
padding-left: 15px;
color:white;
text-shadow: 2px 2px 4px #000000;
font-weight:bold;`

const SwipeImage = styled(Image)`
height:100%;
width:100%;
align-self:center;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
border-radius:15px;`

const DescriptionContainer = styled(View)`
background-color:#e8e8e8;
margin:3%;
width:94%;
height:auto;
opacity:0;
padding:5%;
padding-top:0;
text-align:justify;
border-radius: 15px;
`

const AnimatedDescriptionContainer = Animated.createAnimatedComponent(DescriptionContainer);

const Title = styled(Text)`
      font-size: 18px;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.title};
      margin-top: 15px;
`
const Description = styled(Text)`
      font-size: 15px;
`
const IngredientWrapper = styled(View)`
flex-direction:row;
width:85%;
align-self:center;
justify-content: space-between;
margin-top: 3px;
`

const Ingredient = styled(Text)`
font-weight:bold;
font-size:16px;`

const Measure = styled(Text)`
font-size:16px;`


const styles = StyleSheet.create({
shadows:
{
     shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
    elevation:9,
    borderRadius:1,
    borderColor:'transparent',
    borderRadius:15,
}
});




