import { useState } from "react";
import {
  View,
  FlatList,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Image,
} from "react-native";

import MealInput from "./components/MealInput";
import MealItem from "./components/MealItem";
import EditMealForm from "./components/EditMeal"; 

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editModalIsVisible, setEditModalIsVisible] = useState(false);
  const [meals, setMeals] = useState([]);
  const [mealToEdit, setMealToEdit] = useState(null);

  function startAddMealHandler() {
    setModalIsVisible(true);
  }

  function endAddMealHandler() {
    setModalIsVisible(false);
  }

  function addMealHandler(
    enteredMealDate,
    enteredMealTime,
    selectedCategory,
    enteredMealText
  ) {
    setMeals((currentMeals) => [
      ...currentMeals,
      {
        date: enteredMealDate,
        time: enteredMealTime,
        category: selectedCategory,
        text: enteredMealText,
        id: Math.random().toString(),
      },
    ]);
    endAddMealHandler();
  }

  function deleteMealHandler(id) {
    setMeals((currentMeals) => {
      return currentMeals.filter((meal) => meal.id !== id);
    });
  }

  function startEditMealHandler(meal) {
    setMealToEdit(meal);
    setEditModalIsVisible(true);
  }

  function saveEditedMealHandler(updatedMeal) {
    setMeals((currentMeals) =>
      currentMeals.map((meal) =>
        meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal
      )
    );
    setEditModalIsVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.titleContainer}>DAILY MEAL PLAN</Text>
      <Image
        source={require("./assets/daily-meal-icon.png")}
        style={styles.image}
      />
      <Button
        title="Add Meal Plan"
        color="#8F9BFF"
        onPress={startAddMealHandler}
      />
      <MealInput
        visible={modalIsVisible}
        onAddMeal={addMealHandler}
        onCancel={endAddMealHandler}
      />

      <EditMealForm
        visible={editModalIsVisible}
        onClose={() => setEditModalIsVisible(false)}
        mealData={mealToEdit}
        onSave={saveEditedMealHandler}
      />

      <ScrollView style={styles.mealsListContainer}>
        <View style={styles.mealsContainer}>
          <FlatList
            data={meals}
            renderItem={(itemData) => {
              return (
                <MealItem
                  id={itemData.item.id}
                  date={itemData.item.date}
                  time={itemData.item.time}
                  category={itemData.item.category}
                  text={itemData.item.text}
                  onDeleteItem={deleteMealHandler}
                  onEditItem={() => startEditMealHandler(itemData.item)}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#FFF7E6",
  },
  mealsListContainer: {
    borderColor: "333333",
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    backgroundColor: "#FFD0EA",
    marginBottom: 30,
  },
  mealsContainer: {
    flex: 5,
    marginTop: 5,
  },
  titleContainer: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontFamily: "sans-serif",
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 200,
    margin: 20,
  },
});
