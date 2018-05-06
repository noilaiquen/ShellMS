import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions, Text, FlatList, TextInput, Picker
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updatePlanSurveyAction } from '../../Redux/Actions/PlanActions';
import ShowLoading from '../Common/ShowLoading';
import { appColor, appTextColor } from '../../Constants';

const { height, width } = Dimensions.get('window');

class PlanSurveys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys_data: []
        };
    }

    setSurveyValue(surveyId, value) {
        /* this.props.updatePlanSurveyAction({
            surveyId: survey.surveyId,
            surveyName: survey.surveyName,
            answer: value,
            target: survey.target
        }); */

        const isValue = parseFloat(value) > 0 ? true : false;
        const currentSurveysData = [...this.state.surveys_data];
        let newSurveysData;
        if (currentSurveysData.length > 0) {
            const surveyIndex = currentSurveysData.findIndex(sur => sur.surveyId === surveyId);
            if (surveyIndex >= 0) {
                newSurveysData = currentSurveysData.map(e => {
                    if (e.surveyId !== surveyId) return e;
                    return isValue ? { ...e, surveyValue: value } : null;
                });
            } else {
                const tempValue = isValue ? { surveyId, surveyValue: value } : null;
                newSurveysData = currentSurveysData.concat(tempValue);
            }
        } else {
            newSurveysData = isValue ? [{ surveyId, surveyValue: value }] : [];
        }
        
        newSurveysData = newSurveysData.filter(sur => sur !== null);
        //set state
        this.setState({
            surveys_data: newSurveysData
        });
    }

    renderOptions(options) {
        const items = [];
        items.push(<Picker.Item key={0} value={0} label="" />);
        for (const option of Array.from(options)) {
            items.push(
                <Picker.Item
                    key={option.value}
                    value={option.value}
                    label={option.label}
                />
            );
        }
        return items;
    }

    renderRow(item) {
        const { RowItem, textInput, GroupInput, NumberTarget, label, picker } = Styles;
        const { surveys_data } = this.state;
        const surveyIndex = surveys_data.findIndex(sur => sur.surveyId === item.surveyId);

        let selected;
        if (surveyIndex >= 0) {
            selected = surveys_data[surveyIndex].surveyValue;
        } else {
            selected = 0;
        }
        
        return (
            <View style={RowItem}>
                <Text style={label}>{item.surveyName}</Text>
                <View style={GroupInput}>
                    <Text style={NumberTarget}>{item.target ? item.target : null }</Text>    
                    {(item.inputType === 'text') && 
                        <TextInput
                            style={textInput}
                            keyboardType='numeric'
                            textAlign='center'
                            underlineColorAndroid="rgba(0,0,0,0)"
                            onEndEditing={(e) => this.setSurveyValue(item.surveyId, e.nativeEvent.text)}
                            onFocus={this.scrollDown}
                        />
                    }
                    
                    {(item.inputType === 'select') && 
                        <Picker
                            style={picker}
                            mode="dropdown"
                            selectedValue={selected}
                            onValueChange={(value) => this.setSurveyValue(item.surveyId, value)}
                            
                        >
                            {this.renderOptions(item.inputSource)}
                        </Picker>
                    }
                </View>
            </View>
        );
    }

    render() {
        const { surveys, /*message*/ } = this.props;
        const { Wrapper } = Styles;

        if (surveys.length > 0) {
            return (
                <View style={Wrapper}>
                    <FlatList
                        data={surveys}
                        keyExtractor={(item) => item.surveyId}
                        extraData={this.state} 
                        renderItem={({ item }) => this.renderRow(item)}
                    />
                </View>
            );
        }
        return (
            <ShowLoading />
        );
    }
}

const mapStateToProps = ({ PlanState }) => { //eslint-disable-line
    const { surveys, message, plan } = PlanState;
    return {
        surveys,
        message,
        plan
    };
};

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({ updatePlanSurveyAction }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PlanSurveys);

const Styles = StyleSheet.create({
    Wrapper: {
        flex: 1,
        backgroundColor: appTextColor
    },
    RowItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height * 0.09,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: '#E0E0E0',
        borderBottomWidth: 0.5,
    },
    label: {
        width: width * 0.65,
    },
    GroupInput: {
        width: width * 0.3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: '70%',
        height: height * 0.06,
        backgroundColor: '#EEE',
        padding: 1,
        color: appColor,
    },
    NumberTarget: {
        width: '20%',
        color: appColor,
    },
    picker: {
        width: '70%',
        backgroundColor: '#EEE',
        height: height * 0.06,
        alignSelf: 'stretch', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
});
