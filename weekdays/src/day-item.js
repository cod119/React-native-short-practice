// import react relevant codes
import React, { StyleSheet, Text } from "react-native";

// Create Component
const DayItem = React.createClass({
  render: function() {
    return (
      <Text style={this.style()}>
        {this.props.day}
      </Text>
    )
  },
  style: function() {
    return {
      color: this.color(),
      fontWeight: this.fontWeight(),
      fontSize: this.fontSize(),
      lineHeight: this.lineHeight()
    };
  },
  color: function() {
    const opacity =  1 / (this.props.daysUntil + 1);
    return "rgba(0, 0, 0, " + opacity + ")";
  },
  fontWeight: function() {
    let weight = 7 - this.props.daysUntil;
    return String(weight * 100);
  },
  fontSize: function() {
    return 60 - 6 * this.props.daysUntil;
  },
  lineHeight: function() {
    return 70 - 4 * this.props.daysUntil;
  }
});

// export
export default DayItem;
// above equles to module.exports = DayItem;
