import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Platform, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import COLORS from '../constants/color';
import { globalStyles } from '../styles/global';

const ImageUpload = ({ onImageSelected, title }) => {

    const [image, setImage] = useState(null);

    // select image from gallery
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          onImageSelected(result.assets[0].uri);
        }
      };

    const clearImage = () => {
        setImage(null);
    };

    return (
        <View style={styles.uploadImage}>
            <Text style={styles.label}>Upload hier {title}*</Text>
            <TouchableOpacity onPress={pickImage}>
                {image ? (
                    <View>
                        <Image source={{ uri: image }} style={styles.imageUploadBox} />
                        <TouchableOpacity onPress={clearImage} style={styles.clearImageButton}>
                            <Image style={styles.deleteIcon} source={require('../assets/icons/cross-black.png')} />
                        </TouchableOpacity>    
                    </View>     
                ) : (
                    <View style={styles.imageUploadBox} />
                )}
                {!image && <Image style={styles.uploadIcon} source={require('../assets/icons/plus-black.png')} />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    uploadImage: {
        marginBottom: 10
    },
    imageUploadBox: {
        height: 180,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.veryLightOffBlack,
        borderRadius: 5,
        marginTop: 15,
    },
    label: {
        fontFamily: 'Baloo2_500Medium',
        fontSize: 16,
        color: COLORS.offBlack,
        marginTop: 15,
    },
    uploadIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -15,
        width: 24,
        height: 24,
    },
    clearImageButton: {
        // color: COLORS.alert,
        backgroundColor: COLORS.white,
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    deleteIcon: {
        width: 20,
        height: 20,
    }
});

export default ImageUpload;