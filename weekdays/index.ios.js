// import some code we need
import React, { AppRegistry, StyleSheet, View, Text } from "react-native";
// above is same as var React = require("react-native");
import Moment from "moment";
import DayItem from "./src/day-item";

// create react Component
var Weekdays = React.createClass({
  render: function() {
    return (
      <View style={Styles.container}>
        {this.days()}
        {/*self-closing item*/}
      </View>
    )
  },
  days: function() {
    const daysItems = [];
    for (let i = 0; i < 7; i++) {
      const day = Moment().add(i, 'days').format("dddd");
      daysItems.push(
        <DayItem day={day} daysUntil={i}/>
      );
    }

    return daysItems;
  }
})

// Style the React compoenent
const Styles = StyleSheet.create({
  container: {
    flex: 1, // flex는 width:100%,height:100% 와 같은 효과
    justifyContent: "center", // vertical-align:center
    alignItems: "center" // text-align:center
  },
  textStyle: {
  }
})

// show the react component on the screen
AppRegistry.registerComponent('weekdays', function() {
  return Weekdays;
})
