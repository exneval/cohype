import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import colors from '../../../config/colors';
import strings from '../../../config/strings';

import {METHOD_GET, METHOD_PUT} from '../../../config/constants';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey, removeAuthKey} from '../../../config/auth';
import fetchProfile from '../../../_store/profile';
import resetAllData from '../../../_store/reset';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

import background from '../../../assets/images/background.jpg';
import ava1 from '../../../assets/images/avatar1.png';
import avaload from '../../../assets/images/avatarload.png';

class Settings extends Component {
  handleGetProfile = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchProfile(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.resetAllData();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  handleUpdateProf = async data => {
    try {
      const user = await getAuthKey();
      this.props.fetchProfile(METHOD_PUT, user.id, data);
    } catch (error) {
      console.log(error);
    }
  };

  handleUploadAva = () => {
    const options = {
      allowsEditing: false,
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.uri) {
        const data = new FormData();
        data.append('avatar', {
          name: res.fileName,
          type: res.type,
          uri: res.uri,
        });
        this.handleUpdateProf(data);
      }
    });
  };

  renderHeader = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.SETTING}</Text>
        <View style={styles.headBorder} />
      </View>
    );
  };

  renderAva = profile => {
    const {avatarURI} = profile.data;
    let imgURI = avatarURI ? {uri: avatarURI} : ava1;

    if (profile.isLoading && profile.isPost) {
      imgURI = avaload;
    }

    return (
      <View style={styles.avaContainer}>
        <Image source={imgURI} style={styles.avatar} />
        <TouchableOpacity onPress={() => this.handleUploadAva()}>
          <View style={styles.uploadAva}>
            <Icon name="camera" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  renderSub = () => {
    const {profile} = this.props;

    return (
      <View style={styles.formCont}>
        {this.renderAva(profile)}
        <Text style={styles.username}>{profile.data.username}</Text>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <View style={styles.logoutCont}>
            <Text style={styles.logout}>{strings.LOGOUT}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {profile} = this.props;

    if (profile.error) {
      return <Error message={profile.error} onPress={this.handleGetProfile} />;
    }

    if (profile.isLoading && !profile.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {this.renderHeader()}
          {this.renderSub()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  fetchProfile,
  resetAllData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerCont: {
    alignItems: 'center',
    marginVertical: 30,
  },
  headerText: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 28,
    color: colors.DARK_BLUE,
    marginBottom: 10,
  },
  headBorder: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: colors.DARK_BLUE,
    minWidth: 30,
    maxWidth: 30,
    minHeight: 4,
    maxHeight: 4,
  },
  avaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    resizeMode: 'cover',
  },
  uploadAva: {
    width: 27,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: -15,
  },
  username: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    marginBottom: 20,
  },
  formCont: {
    flex: 1,
    alignItems: 'center',
  },
  logoutCont: {
    minWidth: 100,
    maxWidth: 100,
    minHeight: 50,
    maxHeight: 50,
    backgroundColor: colors.DARK_GREEN,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    color: colors.WHITE,
  },
});
