import React, { Component } from 'react';
import {
  LayoutAnimation,
  Picker,
  StyleSheet,
  View
} from 'react-native';

export default class App extends Component {
  state = {
    primaryAxis: 'row',
    distribution: 'flex-start',
    secondaryAxis: 'flex-start' 
  }

  onPrimaryAxisChange = (axis) => this.setState({ primaryAxis: axis })
  onDistributionChange = (distribution) => this.setState({ distribution })
  onSecondaryAxisChange = (axis) => this.setState({ secondaryAxis: axis })

  getOptions (type) {
    const options = {
      primaryAxis: ['row', 'column'],
      distribution: ['flex-start', 'center', 'flex-end', 'space-around', 'space-between'],
      secondaryAxis: ['flex-start', 'center', 'flex-end', 'stretch']
    };

    return options[type].map((option, i) => <Picker.Item key={i} label={option} value={option} />);
  }

  componentWillUpdate () {
    LayoutAnimation.easeInEaseOut();
  }

  render () {
    const {
      primaryAxis,
      distribution,
      secondaryAxis
    } = this.state;

    const boxDimensions = {
      width: 50,
      height: 50
    };

    if (secondaryAxis === 'stretch') {
      boxDimensions[primaryAxis === 'row' ? 'height' : 'width'] = null;
    }

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Picker
            style={{ flex: 1 }}
            selectedValue={primaryAxis}
            onValueChange={this.onPrimaryAxisChange}>
            { this.getOptions('primaryAxis') }
          </Picker>

          <Picker
            style={{ flex: 1 }}
            selectedValue={distribution}
            onValueChange={this.onDistributionChange}>
            { this.getOptions('distribution') }
          </Picker>

          <Picker
            style={{ flex: 1 }}
            selectedValue={secondaryAxis}
            onValueChange={this.onSecondaryAxisChange}>
            { this.getOptions('secondaryAxis') }
          </Picker>
        </View>

        <View style={{ flex: 1, flexDirection: primaryAxis, justifyContent: distribution, alignItems: secondaryAxis }}>
          <View style={{backgroundColor: 'powderblue', ...boxDimensions}} />
          <View style={{backgroundColor: 'skyblue', ...boxDimensions}} />
          <View style={{backgroundColor: 'steelblue', ...boxDimensions}} />
        </View>
      </View>
    );
  }
}
