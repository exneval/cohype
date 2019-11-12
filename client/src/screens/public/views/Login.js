import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Button from '../../../components/public/Button';
import FormTextInput from '../../../components/public/FormTextInput';
import Icon from '../../../components/public/Icon';
import Modal from '../../../components/public/Modal';
import colors from '../../../config/colors';
import strings from '../../../config/strings';
import {API} from '../../../config/api';
import {storeAuthKey} from '../../../config/auth';
import {checkSecurePass} from '../../../config/utils';
import styles from '../styles';

import background from '../../../assets/images/background.jpg';

export default class Login extends Component {
  passwordInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      securePass: true,
      icEye: 'eye',
      isModalVisible: false,
      modalMessage: '',
      isLoading: false,
    };
  }

  toggleModal = mes => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      modalMessage: mes,
    });
  };

  handleUnameChange = username => {
    this.setState({username});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleUnameSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  showModal = () => {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        message={this.state.modalMessage}
        onPress={() => this.toggleModal('')}
      />
    );
  };

  handleLoginPress = () => {
    this.setState({isLoading: true});
    API.post('/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then(res => {
        storeAuthKey({
          id: res.data.id,
          token: res.data.token,
        });
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        this.setState({isLoading: false});
        if (error.response) {
          const {data, status} = error.response;

          if (status > 399) {
            this.toggleModal(data.message);
          }
        } else {
          if (error.code == 'ECONNABORTED') {
            this.toggleModal(strings.TIMEOUT);
          } else {
            this.toggleModal(error.message);
          }
        }
      });
  };

  handleDisabledButton = password => {
    const isDisable = !password;

    return isDisable;
  };

  handleChangePwdType = () => {
    this.setState(checkSecurePass(this.state.securePass));
  };

  handleSignupPress = () => {
    this.props.navigation.navigate('Register');
  };

  renderSub = () => {
    const {password} = this.state;

    return (
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{strings.WELCOME_TO_LOGIN}</Text>
            <Text style={styles.title}>{strings.WELCOME_TITLE_APP}</Text>
          </View>
          <FormTextInput
            onChangeText={text => this.handleUnameChange(text)}
            onSubmitEditing={this.handleUnameSubmitPress}
            value={this.state.username}
            placeholder={strings.UNAME_PLACEHOLDER}
            autoCorrect={false}
            returnKeyType="next"
          />
          <View style={styles.passContainer}>
            <FormTextInput
              style={styles.password}
              ref={this.passwordInputRef}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              secureTextEntry={this.state.securePass}
              returnKeyType="done"
            />
            <Icon
              name={this.state.icEye}
              size={20}
              color={colors.SILVER}
              onPress={this.handleChangePwdType}
            />
          </View>
          <Button
            label={strings.LOGIN}
            isLoading={this.state.isLoading}
            onPress={this.handleLoginPress}
            disabled={this.handleDisabledButton(password)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text1}>{strings.SIGNUP1}</Text>
            <TouchableOpacity onPress={this.handleSignupPress}>
              <Text style={styles.text2}>{strings.SIGNUP2}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContainer}>{this.showModal()}</View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {this.renderSub()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
