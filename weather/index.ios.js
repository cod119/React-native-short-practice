import React, { Component } from "React";
import { AppRegistry, StyleSheet, View, Text, MapView } from "react-native";
import Api from "./src/api";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: "",
      temperature: "",
      description: ""
    };
  }
  onRegionChangeComplete(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude)
    .then((data) => {
      this.setState(data);
      console.log(data);
    })
    // .catch((err) => {
    //   console.error(err);
    // });
  }
  render() {
    const pins = [{
      latitude: 37,
      longitude:127
    }];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF"
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: "center"
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent("weather", () => {
  return Weather;
})
