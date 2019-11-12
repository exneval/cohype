import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import colors from '../../../config/colors';
import strings from '../../../config/strings';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../../../config/constants';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import fetchRooms from '../../../_store/rooms';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import Empty from '../../../components/empty';

import background from '../../../assets/images/background.jpg';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      roomName: null,
      modalVisible: false,
      isEdit: false,
    };
  }

  toogleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  handleRoomEdit = (isEdit, roomId) => {
    this.setState({isEdit, roomId});
  };

  handleChangeRoom = roomName => {
    this.setState({roomName});
  };

  handleGetRooms = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchRooms(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddRoom = async roomName => {
    try {
      const user = await getAuthKey();
      this.props.fetchRooms(METHOD_POST, user.id, roomName);
    } catch (error) {
      console.log(error);
    }
  };

  handleEditRoom = async (roomName, roomId) => {
    try {
      const user = await getAuthKey();
      this.props.fetchRooms(METHOD_PUT, user.id, roomName, roomId);
    } catch (error) {
      console.log(error);
    }
  };

  renderFloatBtn = () => {
    return (
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => {
          this.handleChangeRoom(null);
          this.handleRoomEdit(false);
          this.toogleModal();
        }}>
        <Icon name="plus" size={25} color={colors.WHITE} />
      </TouchableOpacity>
    );
  };

  getColor = room => {
    const {AZURE, CYELLOW, SORENGE, CRED, VIOLET, VGREEN} = colors;
    const color = [AZURE, CYELLOW, SORENGE, CRED, VIOLET, VGREEN];

    return color[(room.id - 1) % color.length];
  };

  showRooms = room => {
    const {id, name} = room;
    const color = this.getColor(room);

    return (
      <TouchableOpacity
        style={[styles.roomCont, {backgroundColor: color}]}
        onPress={() => {
          this.handleChangeRoom(name);
          this.handleRoomEdit(true, id);
          this.toogleModal();
        }}>
        <Text style={styles.roomName}>{name}</Text>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.ROOMCFG}</Text>
        <View style={styles.headBorder} />
      </View>
    );
  };

  renderSub = rooms => {
    return (
      <FlatList
        data={rooms}
        renderItem={({item}) => this.showRooms(item)}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={this.renderHeader()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetRooms()}
        refreshing={false}
      />
    );
  };

  showModal = () => {
    return (
      <Modal isVisible={this.state.modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.inputTitle}>
              {this.state.isEdit ? 'Edit Room' : 'Add Room'}
            </Text>
          </View>
          <Text style={styles.inputLabel}>{strings.RNAME}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.handleChangeRoom(text)}
            value={this.state.roomName}
          />
          <View style={styles.btnInputCont}>
            <TouchableOpacity onPress={() => this.toogleModal()}>
              <Text style={styles.btnCancel}>{strings.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.toogleModal();
                this.state.isEdit
                  ? this.handleEditRoom(this.state.roomName, this.state.roomId)
                  : this.handleAddRoom(this.state.roomName);
              }}>
              <Text style={styles.btnSubmit}>{strings.SUBMIT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderEmptyData = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.ROOMCFG}</Text>
        <View style={styles.headBorder} />
        <Empty />
      </View>
    );
  };

  render() {
    const {rooms} = this.props;

    if (rooms.error) {
      return <Error message={rooms.error} onPress={this.handleGetRooms} />;
    }

    if (rooms.isLoading && !rooms.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {rooms.data.length > 0
            ? this.renderSub(rooms.data)
            : this.renderEmptyData()}
          {this.renderFloatBtn()}
          {this.showModal()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
  };
};

const mapDispatchToProps = {
  fetchRooms,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  roomCont: {
    padding: 5,
    margin: 5,
    minHeight: 100,
    maxHeight: 100,
    minWidth: 100,
    maxWidth: 100,
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    elevation: 5,
  },
  roomName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
    color: colors.WHITE,
    elevation: 5,
  },
  floatBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 20,
    right: 20,
    backgroundColor: colors.DARK_GREEN,
    borderRadius: 100,
    elevation: 5,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
  },
  modalTitleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  inputTitle: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 25,
  },
  textInput: {
    backgroundColor: colors.WHITE,
    minHeight: 45,
    maxHeight: 45,
    borderWidth: 1,
    elevation: 4,
    fontFamily: strings.FONT,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    marginBottom: 5,
  },
  btnInputCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnSubmit: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.BLUE,
  },
  btnCancel: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.TORCH_RED,
  },
});
