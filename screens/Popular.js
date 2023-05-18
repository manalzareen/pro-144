import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ImageBackground
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from "react-native-star-view";

export default class PopularScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ngrok_url:""
    };
  }
  componentDidMount(){
    this.getData()
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getData = () => {
    const url = "https://834f-49-204-16-183.in.ngrok.io/popular-movies";
    axios
    .get(url)
    .then((response)=>{
      this.setState({
        data:response.data.data
      })    
    })
    .catch(e =>{
        console.log(e.message)
      })
    }

  /*Write the keyExtractor() and renderItems() functions for the FlatList*/
  mykeyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    <Card
        key={`card-${index}`}
        featuredSubtitle={`${
          item.release_date.split("-")[0]
        } | ${this.timeConvert(item.duration)}`}
        featuredSubtitleStyle={styles.subtitle}
          image={{uri:item.poster_link}}
          imageProps={{resizeMode:"cover"}}
          featuredTitle={item.title}
          containerStyle={styles.cardContainer}
          featuredTitleStyle={styles.title}
     
     
     
      ></Card>
  }


  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          {/* Add FlatList component here to show the list of articles*/}
          <FlatList 
       keyExtractor ={this.mykeyExtractor}
       renderItems={this.renderItems}
       data={data}
       />
       
       
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    width: RFValue(280),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: RFValue(10),
    margin: RFValue(10),
    padding: RFValue(10),
    borderColor: "#182854",
    borderWidth: RFValue(2),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#182854",
    fontFamily: "monospace",
    marginVertical: RFValue(5),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "#3c8ed9",
    opacity: 0.7,
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
  },
  starStyle: {
    width: RFValue(200),
    height: RFValue(40),
  },
});
