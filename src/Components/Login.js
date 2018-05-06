import React, { Component } from 'react';
import {
   View, Text, Image,
   StyleSheet, Dimensions, TextInput,
   TouchableOpacity, ToastAndroid, ActivityIndicator
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signInHandle } from '../Redux/Actions/AuthActions';
import { appColor, appTextColor } from '../Constants';
import logoImage from '../Media/Img/logo-cpm.png';
import signInIcon from '../Media/Icon/sign-in.png';

const { width, height } = Dimensions.get('window');

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: null,
         password: null
      };
   }

   componentDidMount() {
      const { message } = this.props;
      if (message !== null) {
         ToastAndroid.show(message, ToastAndroid.SHORT);
      }
   }

   componentWillReceiveProps({ message }) {
      if (message !== null) {
         ToastAndroid.show(message, ToastAndroid.SHORT);
      }
   }

   onSignIn() {
      const { username, password } = this.state;
      if (!username || !password) {
         ToastAndroid.show('Tên đăng nhập hoặc mặt khẩu rỗng!', ToastAndroid.LONG);
         return {
            type: null
         };
      }
      this.props.signInHandle(username, password);
   }


   render() {
      const {
            Wrapper, Logo, Form,
         LogoImg, Label, Input,
         InputGroup, ButtonSubmit, SignIn
        } = Styles;
      const { isLoading } = this.props;

      return (
         <View style={Wrapper}>
            <View style={Logo}>
               <Image source={logoImage} style={LogoImg} />
            </View>

            <View style={Form}>
               <View style={InputGroup}>
                  <TextInput
                     style={Input}
                     placeholder="Username..."
                     placeholderTextColor="#B0BEC5"
                     underlineColorAndroid="rgba(0,0,0,0)"
                     onChangeText={text => this.setState({ username: text })}
                  />
               </View>
               <View style={InputGroup}>
                  <TextInput
                     style={Input}
                     secureTextEntry
                     placeholder="Password..."
                     placeholderTextColor="#B0BEC5"
                     underlineColorAndroid="rgba(0,0,0,0)"
                     onChangeText={text => this.setState({ password: text })}
                  />
               </View>
               <View style={InputGroup}>
                  <TouchableOpacity
                     style={ButtonSubmit}
                     onPress={this.onSignIn.bind(this)}
                  >
                     {!isLoading ? (
                        <Image source={signInIcon} style={SignIn} />
                     ) : (
                           <ActivityIndicator
                              animating
                              color='#FFF'
                              size="large"
                           />
                        )}
                     <Text style={Label}>LOGIN</Text>

                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

const mapStateToProps = ({ AuthState }) => {
   const { isLoading, message } = AuthState;
   return { isLoading, message };
};

const mapDispatchToProps = (dispatch) => (
   bindActionCreators({ signInHandle }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const Styles = StyleSheet.create({
   Wrapper: {
      flex: 1,
      backgroundColor: appTextColor
   },
   Logo: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
   },
   LogoImg: {
      width: width * 0.8,
      resizeMode: 'contain',
   },
   Form: {
      flex: 6,
      paddingLeft: 20,
      paddingRight: 20
   },
   Label: {
      fontSize: 18,
      color: appTextColor
   },
   Input: {
      fontSize: 18,
      paddingLeft: 10,
      color: appColor,
      backgroundColor: '#F5F5F5',
      borderRadius: 10
   },
   InputGroup: {
      marginBottom: 20
   },
   ButtonSubmit: {
      flexDirection: 'row',
      height: height / 13,
      backgroundColor: appColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
   },
   SignIn: {
      height: height / 20,
      resizeMode: 'contain',
      tintColor: appTextColor
   }
});
