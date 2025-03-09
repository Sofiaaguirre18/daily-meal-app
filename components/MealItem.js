import { StyleSheet, View, Text, Pressable, Button } from "react-native";

function MealItem(props) {
  return (
    <View style={styles.mealItem}>
        <Text style={styles.label}>
          Date & Time:{" "}
          <Text style={styles.mealDate}>
            {props.date} | {props.time}
          </Text>
        </Text>
        <Text style={styles.label}>
          Category: <Text style={styles.mealCategory}>{props.category}</Text>
        </Text>
        <Text style={styles.label}>
          Meal: <Text style={styles.mealText}>{props.text}</Text>
        </Text>
    
    <View style={styles.btnsContainer}>
      <Button
        title="Edit"
        onPress={() =>
          props.onEditItem({
            id: props.id,
            text: props.text,
            category: props.category,
            date: props.date,
            time: props.time,
          })
        }
        color="#8F9BFF"
      />
       <Button
        title="Delete"
        onPress={props.onDeleteItem.bind(this, props.id)}
        color="#FF4154"
      />
      </View>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    padding: 10,
    marginVertical: 10,
  },
  pressedItem: {
    opacity: 0.5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
  },
  btnsContainer:{
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  }
});
