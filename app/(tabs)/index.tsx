import {FlatList, StyleSheet, Text, View, Modal,Animated, SafeAreaView,TouchableOpacity,Dimensions} from 'react-native';
import api from "@/config/api";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import ModalComponent from "@/components/ModalComponent";
const { height } = Dimensions.get('window');
 const HomeScreen = () => {
    const [list, setList] = useState([]);
     const [modalVisible, setModalVisible] = useState(false);
     const [selectedItem, setSelectedItem] = useState(null);
     const [slideAnim] = useState(new Animated.Value(height));

     const showModal = (item) => {
         setSelectedItem(item);
         setModalVisible(true);
         Animated.timing(slideAnim, {
             toValue: 0,
             duration: 300,
             useNativeDriver: true,
         }).start();
     };

     const hideModal = () => {
         Animated.timing(slideAnim, {
             toValue: height,
             duration: 300,
             useNativeDriver: true,
         }).start(() => {
             setModalVisible(false);
             setSelectedItem(null);
         });
     };
     const getList = async () => {
         const response = await api.get('app/history/list');
            setList(response.data.data);
     }
     useEffect(() => {
            getList();
     }, []);
     const renderItem = ({ item }) => (
         <TouchableOpacity onPress={() => showModal(item)}>
         <View style={styles.item}>
             <Text style={styles.title}>ID Пациента: {item.id}</Text>
             <Text>Время приёма: {new Date(item.created_at).toLocaleString()}</Text>
         </View>
 </TouchableOpacity>
     );

  return (
      <SafeAreaView style={styles.container}>

          <Text style={styles.header}>Информация о приёме пациента</Text>
          <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
          />
          <Modal animationType="none" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
              <ModalComponent modalVisible={modalVisible} hideModal={hideModal} slideAnim={slideAnim} item={selectedItem} />
          </Modal>

 </SafeAreaView>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
    },
    button: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    header: {
        fontSize: 28,
        textAlign: 'center',
        marginVertical: 20,
        color: '#01579B',
    },
    item: {
        backgroundColor: '#81D4FA',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        color: '#0277BD',
    },
});
