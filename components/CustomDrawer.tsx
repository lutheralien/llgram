import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch,
  } from "react-native";
  import {
    DrawerContentScrollView,
    DrawerItemList,
  } from "@react-navigation/drawer";
  
  import Ionicons from "react-native-vector-icons/Ionicons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
  
  const CustomDrawer = (props) => {
    const {logout,userInfo} = useContext(AuthContext);
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{
            backgroundColor: "#9288F9",
            marginTop: -50,
            zIndex: 10,
          }}
        >
          <ImageBackground
            source={require("../assets/Images/background.jpg")}
            style={{ padding: 20 }}
          >
            <Image
              alt="Not find"
              source={require("../assets/Images/user.jpg")}
              style={styles.userAvatar}
            />
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                marginBottom: 5,
              }}
            >
              {userInfo.user.email}
            </Text>
          </ImageBackground>
          <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            // backgroundColor: colors.cardbackground,
          }}
        >
          <Text style={styles.preferences}>Preferences</Text>
          <View style={styles.switchTextContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor="#f4f3f4"
              style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            />
            <Text
              style={{
                fontSize: 15,
              }}
            >
              Dark Theme
            </Text>
          </View>
        </View>
        <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
         
        
        </View>
      </View>
    );
  };
  
  export default CustomDrawer;
  
  const styles = StyleSheet.create({
    userAvatar: {
      height: 67.5,
      width: 67.5,
      borderRadius: 40,
      marginBottom: 10,
      marginTop: 30,
    },
    switchTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 7,
      paddingVertical: 5,
    },
    preferences: {
      fontSize: 16,
      color: "#ccc",
      paddingTop: 10,
      fontWeight: "500",
      paddingLeft: 20,
    },
    switchText: {
      fontSize: 17,
      color: "",
      paddingTop: 10,
      fontWeight: "bold",
    },
  });
  