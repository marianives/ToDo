import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';

const Todos = () => {
    useEffect(() => {
        todoDB
            .onSnapshot(
                querySnapshot => {
                    const todos = []
                    querySnapshot.forEach((doc) => {
                        const { titel } = doc.data()
                        todos.push({
                            id: doc.id,
                            titel
                        })
                    })
                    setTodos(todos)
                }
            )
    }, [])

    const loeschen = (todos) => {
        todoDB
            .doc(todos.id)
            .delete()
            .catch(error => {
                alert(error);
            })
    }

    const hinzufuegen = () => {
        if (addData && addData.length > 0) {
            const data = {
                titel: addData,
            };
            todoDB
                .add(data)
                .then(() => {
                    setAddData('');
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    alert(error);
                })
        }
    }
    const [todos, setTodos] = useState([]);
    const todoDB = firebase.firestore().collection('todos');
    const [addData, setAddData] = useState('');

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Neuer ToDo hinzufügen'
                    placeholderTextColor='pink'
                    onChangeText={(titel) => setAddData(titel)}
                    value={addData}
                />
                <TouchableOpacity style={styles.button} onPress={hinzufuegen}>
                    <Text style={styles.textKnopf}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                numColumns={1}
                renderItem={({ item }) => (
                    <View>
                        <Pressable
                            style={styles.container}
                        >
                            <FontAwesome
                                name='trash-o'
                                color='white'
                                onPress={() => loeschen(item)}
                                style={styles.trash}
                            />

                            <View style={styles.innerContainer}>
                                <Text style={styles.title}>
                                {item.titel[0]+ item.titel.slice(1)}
                            </Text>
                    </View>
                        </Pressable>
                    </View >
                )}
/>
        </View >
    )
}

export default Todos

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        padding: 15,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
        color: 'white'
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        marginRight: 22
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: 'pink',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textKnopf: {
        color: 'white',
        fontSize: 20
    },
    trash: {
        fontSize: 25,
        marginLeft: 14
    }

})