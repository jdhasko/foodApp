import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Alert, PanResponder, Animated, TouchableOpacity } from 'react-native'
import axios from 'axios';
import styled from 'styled-components/native';

import SwipeableImage from './SwipeableImage'
import ResetButton from './ResetButton';

export default function FoodGameScreen() {


    const [recipes, setRecipes] = useState([])
    const [index, setindex] = useState(0)


     const pan = useRef(new Animated.ValueXY()).current;
     const SecondScale = useRef(new Animated.Value(0.9));
     const SecondTranslateY = useRef(new Animated.Value(-55));

     const ThirdScale = useRef(new Animated.Value(0.8));
     const ThirdTranslateY = useRef(new Animated.Value(0));


     function getNextIndex(index) {
      var nextIndex = index + 1;
      if (nextIndex > 3) {
        return 0;
      }
      return nextIndex;
    }

    const panResponder = 
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          if (gestureState.dx <= 5 && gestureState.dy <= 5) {
            return false;
          } else {
            return true;
          }
        },
        onPanResponderGrant: () => 
        {
          Animated.spring(SecondScale.current, { toValue: 1 , useNativeDriver: true}).start();
          Animated.spring(SecondTranslateY.current, { toValue: 0 , useNativeDriver: true}).start();

          Animated.spring(ThirdScale.current, { toValue: 0.9 , useNativeDriver: true}).start();
          Animated.spring(ThirdTranslateY.current, { toValue: -55 , useNativeDriver: true}).start();
        }, 
        onPanResponderMove: Animated.event(
          [
            null,
            { dx: pan.x, dy: pan.y }
          ],
          {useNativeDriver: false}
        ),
        
        onPanResponderRelease: () => {
          const positionY = pan.y.__getValue();

          //Successful swipe
          if (positionY > 150) {
            Animated.timing(pan, {  toValue: { x: 0, y: 1000} , useNativeDriver:true  }).start(() => {
              pan.setValue({x:0,y:0});
              setindex(getNextIndex(index));
              SecondScale.current.setValue(0.9);
              SecondTranslateY.current.setValue(-55);

              ThirdScale.current.setValue(0.8);
              ThirdTranslateY.current.setValue(0);
            });
          }

          //Short Swipe, return to start
           else {
            Animated.spring(pan, {toValue: {x:0, y:0}, useNativeDriver: true} ).start();

            Animated.spring(SecondScale.current, { toValue: 0.9 , useNativeDriver: true}).start();
            Animated.spring(SecondTranslateY.current, { toValue: -55 , useNativeDriver: true}).start();

            Animated.spring(ThirdScale.current, { toValue: 0.8 , useNativeDriver: true}).start();
            Animated.spring(ThirdTranslateY.current, { toValue: 0 , useNativeDriver: true}).start();
          }
        }
      });
  
    

    async function getRecipes() {
      try{
         let mealsList = []

         for (i = 0; i < 4; i++) {
      
           let { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
           mealsList.push(data.meals)
         }
         setRecipes(mealsList);
      }

      catch(error)
      {
        console.log(error);
        Alert.alert('Error getting meals.','',[{text:'Retry', onPress: ()=>getRecipes()}])
      }
    }
    
    useEffect(() => {    
      getRecipes();
      },
      [] )
   

    return (
      <Root>
        <Container>

            <Animated.View
                  style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                  }} {...panResponder.panHandlers} >
                        {recipes.length > 0 && <SwipeableImage canOpen={true} recipe={recipes[index]} index={index} hasRecipe={true}  />} 
              </Animated.View>
              <Animated.View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -1,
                      width: "100%",
                      height: "100%",
                      transform: [
                        { scale: SecondScale.current },
                        { translateY: SecondTranslateY.current }]
                    }}
                     >
              {recipes.length > 0 && <SwipeableImage recipe={ recipes[getNextIndex(index)] } index={getNextIndex(index)}  />} 
              </Animated.View>

              <Animated.View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -2,
                      width: "100%",
                      height: "100%",
                      transform: [
                        { scale: ThirdScale.current},
                        { translateY: ThirdTranslateY.current }]
                    }}
                    {...panResponder.panHandlers}   >
              {recipes.length > 0 && <SwipeableImage recipe={ recipes[getNextIndex(index+1)] } index={getNextIndex(index+1)} />} 
              </Animated.View>
              <TouchableOpacity onPress={getRecipes} style={{position: 'absolute', bottom: 25, right:25}}>
               <ResetButton/>
            </TouchableOpacity>
        </Container>
        </Root>
    )

}

const Container = styled(View)`
        height:100%;
        width:100%;
        align-items:center;
        `

        
const Root = styled(View)`
width:100%;
height:100%;
align-self:center;
background-color: ${(props) => props.theme.colors.background};
align-items: center;
text-align: center;
justify-content:center;

`