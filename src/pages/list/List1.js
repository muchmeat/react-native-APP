import React, {Component} from 'react';
import {
    PixelRatio,
    SwipeableFlatList,
    FlatList,
    StyleSheet,
    View,
    ImageBackground,
    Dimensions,
    Image,
    Text,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Input, Button, SearchBar, Card, ListItem, Icon, TouchableHighlight} from 'react-native-elements'
import Svg from 'react-native-svg';
import IconLib from '../../../assets/icons/IconLib';
import ThemeStyle from '../../style/ThemeStyle'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const list = [
    {
        name: '沟通交流',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: '今天完成工作有构建此页面，调整样式',
        value: '2',
        icon: 'av-timer'
    },
    {
        name: '一村一警',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: '下村签到，解决燃烧秸秆问题',
        value: '0',
        icon: 'av-timer'
    },
    {
        name: '入户走访',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: '采集房内三实基础信息',
        value: '234',
        icon: 'flight-takeoff'
    },
    {
        name: '人口登记',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        subtitle: '快速采集辖区实有人口',
        value: '33',
        icon: 'flight-takeoff'
    }
]

export default class List1 extends Component {
    static navigationOptions=({navigation,screenProps}) => ({
        headerTitle:'列表', // 只会设置导航栏文字,
        headerStyle: {
            backgroundColor: "#ccc",
            elevation: 0
        },
        headerTitleStyle: {
            color: ThemeStyle.color.fontWithe,
            fontSize: ThemeStyle.font.size_L,
            fontWeight:"normal"
        },
        //返回图标颜色
        headerTintColor: '#fff',
        //返回图标按住的样色
        headerPressColorAndroid:"transparent"
    })

    constructor(props) {
        super(props);
        this.state = {
            data:list
        }
    }


    _keyExtractor = (item, index) => index.toString();

    //每行的分隔线
    _separatorComponent = () => {
        return <View style={{
            width: SCREEN_WIDTH - 20,
            marginLeft: 10,
            marginRight: 10,
            borderBottomWidth: 1 / PixelRatio.get(),
            borderBottomColor: "#dedfe0"
        }}/>
    };

    _renderItem = ({item}) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{source: {uri: item.avatar_url}}}
            badge={{value: item.value, textStyle: {color: '#FFF'}}}
        />
    )

    _renderItem1 = ({item,index}) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{source: {uri: item.avatar_url}}}
            checkBox={{checked:item.selected}}
            onPress={()=>{
                let temp;
                temp = [...this.state.data];
                temp[index] = {...item, selected: !item.selected};
                this.setState({data:temp})
            }}
        />
    )

    _renderItem2 = ({item,index}) => (
        <ListItem
            subtitle={item.subtitle}
            rightIcon={{name:'arrow-right',
                color:'#ccc',
                size:15}}
            onPress={()=>{

            }}
        />
    )

    _renderItem3 = ({item,index}) => (
        <ListItem
            subtitle={item.subtitle}
            leftIcon={{name: item.icon }}
            onPress={()=>{

            }}
        />
    )

    //侧滑菜单渲染
    getQuickActions = ({item})=> {
        return (<View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        }}>

            <View style={{
                backgroundColor: "#C76A65",
                height: 72,
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
            }}>
                <Text style={{
                    color: "#FFF",
                    fontSize: 14
                }}>{"删除"}</Text>
            </View>

        </View>)
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <SwipeableFlatList data={list}
                                   renderItem={this._renderItem}
                                   keyExtractor={this._keyExtractor}
                                   ItemSeparatorComponent={this._separatorComponent}
                                   getItemLayout={(data, index) => (
                                   {length: 70 + 1 / PixelRatio.get(), offset: 70 * index, index}
                                   )}
                                   renderQuickActions={this.getQuickActions}//创建侧滑菜单
                                   maxSwipeDistance={60}//可展开（滑动）的距离
                                   bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                />
                <View style={{height:20}}/>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem1}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._separatorComponent}
                          getItemLayout={(data, index) => (
                          {length: 70 + 1 / PixelRatio.get(), offset: 70 * index, index}
                          )}
                />
                <View style={{height:20}}/>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem2}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._separatorComponent}
                          getItemLayout={(data, index) => (
                          {length: 50 + 1 / PixelRatio.get(), offset: 50 * index, index}
                          )}
                />
                <View style={{height:20}}/>
                <FlatList data={this.state.data}
                          renderItem={this._renderItem3}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={this._separatorComponent}
                          getItemLayout={(data, index) => (
                          {length: 50 + 1 / PixelRatio.get(), offset: 50 * index, index}
                          )}
                />
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }

});
