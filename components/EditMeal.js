import React, { useState } from "react";
import {
  Image,
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function EditMealForm({ visible, onClose, mealData, onSave }) {
  const [mealText, setMealText] = useState(mealData?.text || "");
  const [category, setCategory] = useState(mealData?.category || "");
  const [time, setTime] = useState(mealData?.time || "");
  const [date, setDate] = useState(mealData?.date || "");

  const [openCategory, setOpenCategory] = useState(false);
  const [categories, setCategories] = useState([
    {label: 'Breakfast', value: 'Breakfast',},
    {label: 'Lunch', value: 'Lunch',},
    {label: 'Dinner', value: 'Dinner',},
    {label: 'Snack', value: 'Snack',},
  ])

  const handleSave = () => {
    onSave({
      id: mealData?.id,
      text: mealText,
      category,
      time,
      date,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Image
          source={require("../assets/images/mochi-icon.png")}
          style={styles.image}
        />
        <Text style={styles.header}>Edit Meal</Text>
        <TextInput
          style={styles.input}
          placeholder="Date (MM-DD-YYYY)"
          value={date}
          onChangeText={setDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Time (HH:MM)"
          value={time}
          onChangeText={setTime}
        />

        <DropDownPicker
        open={openCategory}
        value={category}
        items={categories}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setCategories}
        placeholder="-- Select a category --"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        />
        <TextInput
          style={styles.input}
          placeholder="Type your meal here"
          value={mealText}
          onChangeText={setMealText}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Update" onPress={handleSave} color="#8F9BFF" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onClose} color="#FF4154" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EditMealForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFF7E6",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 330,
    height: 330,
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 100,
    marginHorizontal: 8,
  },

});
