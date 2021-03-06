import {Alert, PermissionsAndroid} from "react-native";

let React = require("react");
let {View, Text, TextInput, TouchableHighlight, NativeModules, Button, TouchableOpacity} = require("react-native");
import Svg from 'react-native-svg'
import IconLib from '../../../../../../../assets/svg/IconLib'
import formStyle from '../../stylesheets/formStyle'

function textbox(locals) {

    if (locals.hidden) {
        return null;
    }

    let mode = locals.mode;
    let isMaybe = locals.isMaybe;
    let maxLength = locals.maxLength;
    let controlLabelStyle = formStyle.label.normal;
    let textboxStyle = formStyle.textBox.textFont;
    let textboxLocateStyle = formStyle.textBox.textFontLocate;
    let errorBlockStyle = formStyle.errorBlock;

    if (locals.editable === false) {
        textboxStyle = formStyle.notEditable;
    }

    let notNull = isMaybe ? <View style={{width: 10}}/> :
        <View style={{width: 10}}><Text style={formStyle.notNull}>*</Text></View>;

    if (locals.value) {
        controlLabelStyle = formStyle.label.hasValue;
    }

    let label = locals.label ? (
        <View style={{flexDirection: "row"}}>{notNull}<Text style={[controlLabelStyle]}>{locals.label}</Text></View>
    ) : null;

    let error =
        locals.hasError ? (
            <View style={formStyle.error}>
                <Svg height="14" width="14" viewBox="0 0 1024 1024">
                    {IconLib.FORM_ERROR}
                </Svg>
                <View style={formStyle.errorView}>
                    <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
                        {locals.error ? locals.error : (locals.label ? locals.label.replace("*", "") + "不能为空" : "不能为空")}
                    </Text>
                </View>
            </View>
        ) : <View/>;

    if (mode === "textarea") {
        return (
            <View style={{backgroundColor: "#FFF"}}>
                <View style={formStyle.textBox.labelView}>
                    {label}
                </View>
                <View style={formStyle.textBox.inputView}>
                    <TextInput
                        accessibilityLabel={locals.label}
                        ref="input"
                        autoCapitalize={locals.autoCapitalize}
                        autoCorrect={locals.autoCorrect}
                        autoFocus={locals.autoFocus}
                        blurOnSubmit={locals.blurOnSubmit}
                        editable={locals.editable}
                        keyboardType={locals.keyboardType}
                        maxLength={locals.maxLength}
                        multiline={true}
                        onBlur={locals.onBlur}
                        onEndEditing={locals.onEndEditing}
                        onFocus={locals.onFocus}
                        onLayout={locals.onLayout}
                        onSelectionChange={locals.onSelectionChange}
                        onSubmitEditing={locals.onSubmitEditing}
                        onContentSizeChange={locals.onContentSizeChange}
                        placeholderTextColor={formStyle.helpColor.color}
                        secureTextEntry={locals.secureTextEntry}
                        selectTextOnFocus={locals.selectTextOnFocus}
                        selectionColor={locals.selectionColor}
                        numberOfLines={locals.numberOfLines}
                        underlineColorAndroid={locals.underlineColorAndroid}
                        clearButtonMode={locals.clearButtonMode}
                        clearTextOnFocus={locals.clearTextOnFocus}
                        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                        keyboardAppearance={locals.keyboardAppearance}
                        onKeyPress={locals.onKeyPress}
                        returnKeyType={locals.returnKeyType}
                        selectionState={locals.selectionState}
                        onChangeText={value => locals.onChange(value)}
                        onChange={locals.onChangeNative}
                        placeholder={locals.placeholder}
                        style={[textboxStyle, formStyle.textBox.textAreaFont]}
                        value={locals.value ? locals.value.toString() : ""}
                    />
                    <View style={formStyle.textBox.textAreaError}>
                        {error}
                        <Text
                            style={formStyle.textBox.textAreaErrorFont}>{locals.value ? locals.value.length : 0}/{maxLength}</Text>
                    </View>
                </View>
            </View>
        )
    } else if (mode === "number") {
        return (
            <View style={{backgroundColor: "#FFF"}}>
                <View style={formStyle.textBox.textInput}>
                    <View style={formStyle.textBox.textInputLabel}>
                        {label}
                    </View>
                    <View style={formStyle.textBox.textInputRight}>
                        <View style={formStyle.textBox.textInputView}>
                            <TextInput
                                accessibilityLabel={locals.label}
                                ref="input"
                                autoCapitalize={locals.autoCapitalize}
                                autoCorrect={locals.autoCorrect}
                                autoFocus={locals.autoFocus}
                                blurOnSubmit={locals.blurOnSubmit}
                                editable={locals.editable}
                                keyboardType={"numeric"}
                                maxLength={locals.maxLength}
                                multiline={locals.multiline}
                                onBlur={locals.onBlur}
                                onEndEditing={locals.onEndEditing}
                                onFocus={locals.onFocus}
                                onLayout={locals.onLayout}
                                onSelectionChange={locals.onSelectionChange}
                                onSubmitEditing={locals.onSubmitEditing}
                                onContentSizeChange={locals.onContentSizeChange}
                                secureTextEntry={locals.secureTextEntry}
                                selectTextOnFocus={locals.selectTextOnFocus}
                                selectionColor={locals.selectionColor}
                                numberOfLines={locals.numberOfLines}
                                underlineColorAndroid={locals.underlineColorAndroid}
                                clearButtonMode={locals.clearButtonMode}
                                clearTextOnFocus={locals.clearTextOnFocus}
                                enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                                keyboardAppearance={locals.keyboardAppearance}
                                onKeyPress={locals.onKeyPress}
                                returnKeyType={locals.returnKeyType}
                                selectionState={locals.selectionState}
                                onChangeText={value => {
                                    const newText = value.replace(/[^\d]+/, '');
                                    locals.onChange(newText)
                                }}
                                onChange={locals.onChangeNative}
                                placeholder={locals.placeholder}
                                placeholderTextColor={formStyle.helpColor.color}
                                style={textboxStyle}
                                value={locals.value ? locals.value.toString() : ""}
                            />
                            {locals.value ?
                                <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                                    locals.onChange("");
                                }}>
                                    <View style={formStyle.textBox.clear}>
                                        <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                                    </View>
                                </TouchableHighlight>
                                : null}
                        </View>
                        {error}
                    </View>
                </View>
            </View>
        )
    } else if (mode === "locate") {
        // return (
        //     <View style={{backgroundColor: "#FFF"}}>
        //         <View style={formStyle.textBox.textInput}>
        //             <View style={formStyle.textBox.textInputLabel}>
        //                 {label}
        //             </View>
        //             <View style={formStyle.textBox.textInputRight}>
        //                 <View style={formStyle.textBox.textInputView}>
        //                     <TextInput
        //                         accessibilityLabel={locals.label}
        //                         ref="input"
        //                         autoCapitalize={locals.autoCapitalize}
        //                         autoCorrect={locals.autoCorrect}
        //                         autoFocus={locals.autoFocus}
        //                         blurOnSubmit={locals.blurOnSubmit}
        //                         editable={false}
        //                         keyboardType={locals.keyboardType}
        //                         maxLength={locals.maxLength}
        //                         multiline={locals.multiline}
        //                         onBlur={locals.onBlur}
        //                         onEndEditing={locals.onEndEditing}
        //                         onFocus={locals.onFocus}
        //                         onLayout={locals.onLayout}
        //                         onSelectionChange={locals.onSelectionChange}
        //                         onSubmitEditing={locals.onSubmitEditing}
        //                         onContentSizeChange={locals.onContentSizeChange}
        //                         secureTextEntry={locals.secureTextEntry}
        //                         selectTextOnFocus={locals.selectTextOnFocus}
        //                         selectionColor={locals.selectionColor}
        //                         numberOfLines={locals.numberOfLines}
        //                         underlineColorAndroid={locals.underlineColorAndroid}
        //                         clearButtonMode={locals.clearButtonMode}
        //                         clearTextOnFocus={locals.clearTextOnFocus}
        //                         enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        //                         keyboardAppearance={locals.keyboardAppearance}
        //                         onKeyPress={locals.onKeyPress}
        //                         returnKeyType={locals.returnKeyType}
        //                         selectionState={locals.selectionState}
        //                         onChangeText={value => {
        //                             const newText = value.replace(/[^\d\.\,]+/, '');
        //                             locals.onChange(newText)
        //                         }}
        //                         onChange={locals.onChangeNative}
        //                         placeholder={locals.placeholder}
        //                         placeholderTextColor={formStyle.helpColor.color}
        //                         style={textboxLocateStyle}
        //                         value={locals.value ? locals.value.toString() : ""}
        //                     />
        //                     <TouchableOpacity onPress={() => {
        //                         NativeModules.Location.startLocation((location) => {
        //                             if ("" !== location) {
        //                                 if (location === "locateFailed") {
        //                                     Alert.alert("温馨提示", "请检查GPS状态");
        //                                 } else if (location === "noGPS") {
        //                                     requestGPSPermission();
        //                                 } else if (location === "close") {
        //                                     Alert.alert("温馨提示", "GPS已关闭");
        //                                 } else {
        //                                     locals.onChange(location);
        //                                 }
        //                             } else {
        //                                 Alert.alert("温馨提示", "定位失败");
        //                                 locals.onChange("");
        //                             }
        //                         })
        //                     }}>
        //                         <View style={formStyle.textBox.locateButton}>
        //                             <Text
        //                                 style={formStyle.textBox.locateText}>{locals.value ? "点击重定位" : locals.placeholder}</Text>
        //                         </View>
        //                     </TouchableOpacity>
        //                 </View>
        //                 {error}
        //             </View>
        //         </View>
        //     </View>
        // )
        return (
            <View style={{backgroundColor: "#FFF"}}>
                <View style={formStyle.textBox.textInput}>
                    <View style={formStyle.textBox.textInputLabel}>
                        {label}
                    </View>
                    <View style={formStyle.textBox.locateRight}>
                        <View style={formStyle.textBox.locateRightTop}>
                            <View style={{flex: 1,flexDirection:"row"}}><Text numberOfLines={2}
                                                          style={(!locals.value) ? formStyle.textBox.locateText : formStyle.textBox.locatedText}>{(!locals.value) ? "" : locals.address}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                NativeModules.Location.startLocation((location, address) => {
                                    if ("" !== location) {
                                        if (location === "locateFailed") {
                                            Alert.alert("温馨提示", "请检查GPS状态");
                                        } else if (location === "noGPS") {
                                            requestGPSPermission();
                                        } else if (location === "close") {
                                            Alert.alert("温馨提示", "GPS已关闭");
                                        } else {
                                            locals.onChange(location, address);
                                        }
                                    } else {
                                        Alert.alert("温馨提示", "定位失败");
                                        locals.onChange("");
                                    }
                                })
                            }}>
                                <View style={formStyle.textBox.locateSvg}>
                                    <Svg height={24} width={24} viewBox="0 0 1024 1024">{IconLib.IC_LOCATE}</Svg>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {error}
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={formStyle.textBox.textInput}>
                <View style={formStyle.textBox.textInputLabel}>
                    {label}
                </View>
                <View style={formStyle.textBox.textInputRight}>
                    <View style={formStyle.textBox.textInputView}>
                        <TextInput
                            accessibilityLabel={locals.label}
                            ref="input"
                            autoCapitalize={locals.autoCapitalize}
                            autoCorrect={locals.autoCorrect}
                            autoFocus={locals.autoFocus}
                            blurOnSubmit={locals.blurOnSubmit}
                            editable={locals.editable}
                            keyboardType={locals.keyboardType}
                            maxLength={locals.maxLength}
                            multiline={locals.multiline}
                            onBlur={locals.onBlur}
                            onEndEditing={locals.onEndEditing}
                            onFocus={locals.onFocus}
                            onLayout={locals.onLayout}
                            onSelectionChange={locals.onSelectionChange}
                            onSubmitEditing={locals.onSubmitEditing}
                            onContentSizeChange={locals.onContentSizeChange}
                            placeholderTextColor={formStyle.helpColor.color}
                            secureTextEntry={locals.secureTextEntry}
                            selectTextOnFocus={locals.selectTextOnFocus}
                            selectionColor={locals.selectionColor}
                            numberOfLines={locals.numberOfLines}
                            underlineColorAndroid={locals.underlineColorAndroid}
                            clearButtonMode={locals.clearButtonMode}
                            clearTextOnFocus={locals.clearTextOnFocus}
                            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                            keyboardAppearance={locals.keyboardAppearance}
                            onKeyPress={locals.onKeyPress}
                            returnKeyType={locals.returnKeyType}
                            selectionState={locals.selectionState}
                            onChangeText={value => locals.onChange(value)}
                            onChange={locals.onChangeNative}
                            placeholder={locals.placeholder}
                            style={textboxStyle}
                            value={locals.value ? locals.value.toString() : ""}
                        />
                        {locals.value ?
                            <TouchableHighlight activeOpacity={0.8} underlayColor='transparent' onPress={() => {
                                locals.onChange("");
                            }}>
                                <View style={formStyle.textBox.clear}>
                                    <Svg height="20" width="20" viewBox="0 0 1024 1024">{IconLib.IC_CLEAR}</Svg>
                                </View>
                            </TouchableHighlight>
                            : null}
                    </View>
                    {error}
                </View>
            </View>
        )
    }
}

/**
 * 获取位置权限
 * @returns {Promise<void>}
 */
async function requestGPSPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: '申请位置权限',
                message: '开启位置服务，获取精准定位',
                buttonNeutral: '等会再问我',
                buttonNegative: '不行',
                buttonPositive: '好吧',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('现在你获得GPS权限了');
        } else {
            console.log('用户并不同意');
        }
    } catch (err) {
        console.warn(err);
    }
}

module.exports = textbox;
