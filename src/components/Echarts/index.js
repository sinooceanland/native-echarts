import React, {Component} from 'react';
import {WebView, View, StyleSheet, Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.refs.chart.reload();
        }
    }

    render() {
        if(Platform.OS === 'ios'){
            return (
                <View style={{flex: 1, height: this.props.height || 400,}}>
                    <WebView
                        ref="chart"
                        scrollEnabled={true}
                        injectedJavaScript={renderChart(this.props)}
                        style={{
                            height: this.props.height || 400,
                            backgroundColor: this.props.backgroundColor || 'transparent'
                        }}
                        scalesPageToFit={true}
                        source={require('./tpl.html')}
                        onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
                    />
                </View>
            );
        }else{
            return (
                <View style={{flex: 1, height: this.props.height || 400,}}>
                    <WebView
                        ref="chart"
                        scrollEnabled={false}
                        injectedJavaScript={renderChart(this.props)}
                        style={{
                            height: this.props.height || 400,
                        }}
                        source={{uri: 'file:///android_asset/tpl.html'}}
                    />
                </View>

            );
        }

    }
}
