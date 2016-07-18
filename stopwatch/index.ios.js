import React from "react";
import { AppRegistry, Text, View, StyleSheet, TouchableHighlight } from "react-native";
import formatTime from "minutes-seconds-milliseconds";

const StopWatch = React.createClass({
  getInitialState: function() {
    return {
      timeElapsed: null,
      running: false,
      laps: []
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.timerWrapper]}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={[styles.buttonWrapper]}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View style={[styles.footer]}>
          {this.laps()}
        </View>

      </View>
    )
  },
  startStopButton: function() {
    const style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={this.handleStartPress}
        style={[styles.button, style]}>
        <Text>
          {this.state.running ? "Stop" : "Start"}
        </Text>
      </TouchableHighlight>
    );
  },
  lapButton: function() {
    return (
      <TouchableHighlight
        style={[styles.button]}
        underlayColor="gray"
        onPress={this.handleLapPress}>
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
    );
  },
  handleStartPress: function() {
    if (this.state.running) {
      console.log("this.interval is ", this.interval);
      clearInterval(this.interval);
      this.setState({
        running: false
      });
      return;
    }

    this.setState({
      startTime: new Date()
    })

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  },
  handleLapPress: function() {
    const lap = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    })
  },
  laps: function() {
    return this.state.laps.map((value, index) => {
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>
            Lap # {index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(value)}
          </Text>
        </View>
      )
    })
  }
  // border: function(color) {
  //   return {
  //     borderColor: color,
  //     borderWidth: 4
  //   }
  // }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  header: { // yellow
    flex: 1
  },
  footer: { // blue
    flex: 1
  },
  timerWrapper: { // red
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonWrapper: { // green
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  startButton: {
    borderColor: "#00CC00"
  },
  stopButton: {
    borderColor: "#CC0000"
  },
  lap: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent("stopwatch", () => StopWatch);
