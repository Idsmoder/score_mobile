import {Modal, Text, Animated, View, TouchableOpacity,StyleSheet} from "react-native";
import {useEffect} from "react";
import api from "@/config/api";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const ModalComponent = ({modalVisible,hideModal,slideAnim,item})=> {

    useEffect(() => {
        const getItemDoc = (item) => {
            const res = api.get(`app/history/show/${item?.doc_id}`);
            console.log(res, 'sass');
        }
        getItemDoc(item);
    }, []);
    return (
        <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
                <Text style={styles.modalText}>Привет, это модальное окно снизу вверх!</Text>
                <TouchableOpacity style={styles.closeButton} onPress={hideModal}>
                    <Text style={styles.buttonText}>Закрыть</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        height: '95%',
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
    closeButton: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        padding: 10,
        backgroundColor: '#f44336',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});
export default ModalComponent;
