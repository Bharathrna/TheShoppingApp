import React, { useState, useReducer, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    NumberInput,
    ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import customHeaderButton from '../../Components/UI/HeaderButton';
import * as ProductActions from '../../Store/Actions/ProductAction';
import CustomTextInput from '../../Components/UI/TextInput';
import Colors from '../../Constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {

    if(action.type === FORM_INPUT_UPDATE){
        const updatedInputs = {
            ...state.inputs,
            [action.input]: action.value
        }
        
        const updatedInputValidations = {
            ...state.inputValidations,
            [action.input]: action.isValid
        }
        
        let updatedFormValidation = true;

        console.log(updatedFormValidation);

        for(const key in updatedInputValidations) {
            if(!updatedInputValidations[key]) {
                updatedFormValidation = false;
            }
        }

        return {
            formValidation: updatedFormValidation,
            inputValidations: updatedInputValidations,
            inputs: updatedInputs
        }
    }

    return state;
};

const EditProductScreen = props => {

    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState();

    const productID = props.navigation.getParam('prodID');

    const editedProduct = useSelector(state => state.product.userProducts.find(product => product.id === productID));

    console.log("Product ID in Edit screen:", editedProduct);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputs: {
            title: productID ? editedProduct.title : '',
            imageUrl: productID ? editedProduct.imageUrl : '',
            price: '',
            description: productID ? editedProduct.description : ''
        },
        inputValidations: {
            title: productID ? true : false,
            imageUrl: productID ? true :false,
            price: productID ? true : false,
            description: productID ? true : false 
        },
        formValidation: productID ? true : false
    })

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured:', error, [{text: 'Okay'}]);
        }
    }, [error])

    const saveHandler = useCallback(async () => {
        console.log("New text:", formState.formValidation);
        console.log("Validations:", formState.inputValidations);

        setError(null);
        setIsLoading(true);

        try{
            if(!formState.formValidation) {
            Alert.alert('Alert', 'Please enter all the fields!!', [{text: 'okay'}]);
            setIsLoading(false);
            return;
            }
            productID ? await dispatch(ProductActions.updateProduct(productID, formState.inputs.title, formState.inputs.imageUrl, formState.inputs.description)) : await dispatch(ProductActions.addProduct(formState.inputs.title, formState.inputs.price, formState.inputs.imageUrl, formState.inputs.description));
            props.navigation.goBack();
        } catch(error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [productID, formState, dispatch]);

    useEffect(() => {
        props.navigation.setParams({save: saveHandler});
    }, [saveHandler]);

    const inputHandler = useCallback((identifier,newValue, isValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: newValue, 
            isValid: isValid,
            input: identifier
        });
    }, [dispatchFormState]);

    console.log("FormState data ", formState);

    if(isLoading){
        return (
            <View style = {styles.centerLoader}>
                <ActivityIndicator size = 'large' color = {Colors.primaryColor}/>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style = {styles.container}>
                <CustomTextInput
                    titleText = 'Title'
                    keyboardType = 'default'
                    autoCorrect
                    autoCapitalize = 'sentences'
                    returnKeyType = 'next'
                    initialValue = {formState.inputs.title}
                    initiallyValid = {formState.inputValidations.title}
                    inputChange = {inputHandler}
                    identifier = 'title'
                    required
                /> 
                <CustomTextInput 
                    titleText = 'ImageUrl'
                    keyboardType = 'default'
                    returnKeyType = 'next'
                    initialValue = {formState.inputs.imageUrl}
                    initiallyValid = {formState.inputValidations.imageUrl}
                    inputChange = {inputHandler}
                    identifier = 'imageUrl'
                    required
                /> 
                {productID ? null :  <CustomTextInput 
                    titleText = 'Price'
                    keyboardType = 'decimal-pad'
                    returnKeyType = 'next'
                    initialValue = {formState.inputs.price}
                    initiallyValid = {formState.inputValidations.price}
                    inputChange = {inputHandler}
                    identifier = 'price'
                    required
                    min = {1}
                />}
                <CustomTextInput 
                    titleText = 'Description'
                    keyboardType = 'default'
                    autoCorrect
                    autoCapitalize = 'sentences'
                    multiline
                    numberOfLines = {3}
                    returnKeyType = 'done'
                    initialValue = {formState.inputs.description}
                    initiallyValid = {formState.inputValidations.description}
                    inputChange = {inputHandler}
                    identifier = 'description'
                    required
                />
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navigationData => {

    const productID = navigationData.navigation.getParam('prodID');

    const onSave = navigationData.navigation.getParam('save');

    return {
        headerTitle: productID ? 'Edit Product' : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent = {customHeaderButton}>
                <Item 
                    title = "Save"
                    iconName = "done"
                    onPress = {onSave}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    container: {
       marginLeft: 20,
       marginTop: 20
    },

    centerLoader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;