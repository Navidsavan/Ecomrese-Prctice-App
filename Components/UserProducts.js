import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const UserProducts = props => {
    return (

        <View style={styles.itemContainerList1} >


            <Image style={styles.catImage1} source={{ uri: props.image }} />


            <Text style={styles.prdName}>{props.name}</Text>
            <Text style={styles.noDiscountText}>${props.noDiscount}</Text>

            <View style={styles.IconTextContainer}>
                <Text style={styles.prdPrice}>Now Only : $ {props.price.toFixed(2)}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={props.onDelete} style={styles.BothButton}>
                        <View style={styles.removeContainer}>
                            <Icon
                                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                size={23}
                                color="red"
                            />
                            <Text style={{ size: 20, fontWeight: '700', padding: 3 }}>Delete</Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onEdit} style={styles.BothButton}>
                        <View style={styles.removeContainer}>
                            <Icon
                                name='pencil'
                                size={23}
                                color="green"
                            />
                            <Text style={{ size: 20, fontWeight: '700', padding: 3 }}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </View>
        </View>




    );
};

const styles = StyleSheet.create({


    itemContainerList1: {
        display: 'flex',
        marginHorizontal: 12,
        borderRadius: 5,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#F8F9F9',
        position: 'relative',
        shadowColor: 'blue',
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0, height: 0

        },
        shadowRadius: 2,
        elevation: 5,
        height: Dimensions.get('window').height * 0.45,
        margin: 10,




    },
    catImage1: {
        borderRadius: 5,
        height: Dimensions.get('window').height * 0.25,
        width: '100%',



    },

    prdName: {
        fontSize: 14,
        fontWeight: '700',
        paddingLeft: 4,

    },
    prdPrice: {
        fontSize: 12,
        fontWeight: '600',
        color: 'green',
        paddingLeft: 4,
        //textDecorationLine:' line-through',

    },

    noDiscountText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'gray',
        paddingLeft: 4,
        textDecorationLine: ' line-through',

    },



    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: Dimensions.get('window').height * 0.5,
        height: Dimensions.get('window').height * 0.4,
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 5,
        // paddingBottom: 10,



    },
    BothButton: {

        backgroundColor: '#E3E3E3',
        width: Dimensions.get('window').height * 0.2,
        height: Dimensions.get('window').height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 1, height: 1,

        },
    },
    removeContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }


})


export default UserProducts;