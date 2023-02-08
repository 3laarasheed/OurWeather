import { React, useState } from "react";
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from "react-native";
import pic1 from "../../assets/1blue.jpeg"
import pic2 from "../../assets/2dark.jpeg"
import pic3 from "../../assets/3light.jpeg"
import pic4 from "../../assets/4sunny.jpeg"
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";

const images = [pic2, pic1, pic3, pic4];

const Home = () => {
    // const [lon, setLon] = useState("");
    // const [lat, setLat] = useState("");
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [randomImaged, setRandomImaged] = useState(images[0]);

    const getWeather = async () => {
        // if (!lon.trim() && !lat.trim()) return
        if (!city.trim()) return
        // if city is empty and by deleting all spaces stop here don't do anything
        setLoading(true);
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}
             &units=metric&appid=d1690c2806cd3aeefaab4f5a9e3cc9d2`);
            // const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d1690c2806cd3aeefaab4f5a9e3cc9d2`);
            setWeather(res.data);
            const index = Math.floor(Math.random() * images.length);
            setRandomImaged(images[index]);
            setLoading(false);
        }
        catch (err) {
            alert("Make Sure About Country Name")
            setLoading(false);

        }
    }
    return (
        <ImageBackground source={randomImaged} style={styles.image}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.textInputContainer}>

                    <TextInput style={styles.textInput}
                        value={city}
                        placeholder="write city "
                        onChangeText={(text) => setCity(text)}
                    />
                    {/* <TextInput style={styles.textInput}value={lat}placeholder="write latitude "onChangeText={(text) => setLat(text)}
                    />
                    https://type.fit/api/quotes
                    <TextInput style={styles.textInput}value={lon}placeholder="write longitude "onChangeText={(text) => setLon(text)}
                    /> */}
                    {loading
                        ? <ActivityIndicator size="small" color="#212121" />
                        : <AntDesign
                            onPress={getWeather}
                            name="check" size={24} color="black" />
                    }
                </View>
                {Object.keys(weather).length > 0 ?
                    <>
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>
                                {weather?.name} , {weather?.sys?.country}
                            </Text>
                        </View>
                        <View style={styles.weatherContainer}>
                            <Text style={styles.temp}>
                                {Math.round(weather.main.temp)} °C
                            </Text>
                            <Text style={styles.weather}> {weather.weather[0].main}</Text>
                        </View>
                    </>
                    : null}
            </SafeAreaView>
        </ImageBackground>
    )
}


export default Home

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    textInputContainer: {
        backgroundColor: "rgba(255,255,255,0.7)",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        width: "60%",
        justifyContent: "space-between",
        marginTop: 50,
    },
    textInput: {
        height: 40,
        width: "60%",
        fontWeight: "900"
    },
    locationContainer: {
        marginVertical: 15,
    },
    location: {
        color: "#FFFFFF",
        fontSize: 35,
        fontWeight: "500",
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0,0.55",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    weatherContainer: {
        alignItems: "center",
    },
    temp: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 100,
        fontWeight: "800",
        backgroundColor: "rgba(255, 255, 255,0.2)",
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
        overflow: "hidden",
        marginTop: 10,
        textShadowColor: "rgba(0, 0, 0,0.75",
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 10,
    },
    weather: {
        color: "#FFFFFF",
        fontSize: 48,
        fontWeight: "700",
        shadowColor: "#000",
        shadowOffset: { width: -1, height: 3 },
        shadowOpacity: 0.7,
    }

})