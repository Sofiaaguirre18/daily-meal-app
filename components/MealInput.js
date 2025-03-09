import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Modal,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function MealInput(props) {
  const [enteredMealDate, setEnteredMealDate] = useState("");
  const [enteredMealTime, setEnteredMealTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [enteredMealText, setEnteredMealText] = useState("");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Breakfast", value: "Breakfast" },
    { label: "Lunch", value: "Lunch" },
    { label: "Dinner", value: "Dinner" },
    { label: "Snack", value: "Snack" },
  ]);

  function addMealHandler() {
    props.onAddMeal(
      enteredMealDate,
      enteredMealTime,
      selectedCategory,
      enteredMealText
    );
    setEnteredMealDate("");
    setEnteredMealTime("");
    setSelectedCategory("");
    setEnteredMealText("");
  }

  function mealInputHandler(enteredText) {
    setEnteredMealText(enteredText);
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/images/mochi-icon.png")}
          style={styles.image}
        />
        <Text style={styles.header}>Enter your meal below</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Date (MM-DD-YYYY)"
          onChangeText={(text) => setEnteredMealDate(text)}
          value={enteredMealDate}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter Time (HH:MM)"
          onChangeText={(text) => setEnteredMealTime(text)}
          value={enteredMealTime}
        />

        <DropDownPicker
          open={open}
          value={selectedCategory}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedCategory}
          setItems={setItems}
          style={styles.dropdown}
          placeholder="-- Select a category --"
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Type your meal here"
          onChangeText={mealInputHandler}
          value={enteredMealText}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Meal" onPress={addMealHandler} color="#8F9BFF" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#FF4154" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MealInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF7E6",
  },
  image: {
    width: 330,
    height: 330,
    margin: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#120438",
    borderRadius: 6,
    width: "100%",
    padding: 16,
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    marginBottom: 10,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  dropdownContainer: {
    width: "100%",
    borderRadius: 6,
    borderColor: "#ccc",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },
});
