import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import {Picker} from 'native-base';
import {connect} from 'react-redux';

import Modal from 'react-native-modal';
import CountDown from 'react-native-countdown-component';

import colors from '../../../config/colors';
import strings from '../../../config/strings';

import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../../../config/constants';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import {getTimeDiffMin, getTimeDiffSec} from '../../../config/utils';
import fetchCheckin from '../../../_store/checkin';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import Empty from '../../../components/empty';

import background from '../../../assets/images/background.jpg';

class Checkin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      duration: null,
      isCheckout: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.handleGetCheckin();
  }

  toogleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  handleGetCheckin = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCheckin(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckin = async orderData => {
    try {
      const user = await getAuthKey();
      this.props.fetchCheckin(METHOD_POST, user.id, orderData);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCheckout = async order_id => {
    try {
      const user = await getAuthKey();
      this.props.fetchCheckin(METHOD_PUT, user.id, null, order_id);
    } catch (error) {
      console.log(error);
    }
  };

  handleResetState = () => {
    this.setState({
      room_id: null,
      customer_id: null,
      order_id: null,
      roomName: null,
      duration: null,
      isCheckout: false,
    });
  };

  showTimer = room => {
    const {order} = room;
    const isCheckout = order && order.is_booked ? true : false;

    if (isCheckout) {
      const date = new Date(order.order_end_time);
      const duration = getTimeDiffSec(date);

      return (
        <View style={styles.timerCont}>
          <CountDown
            until={duration}
            size={8}
            onFinish={() => this.handleAddCheckout(order.id)}
            digitStyle={{
              backgroundColor: colors.WHITE,
            }}
            digitTxtStyle={{
              color: colors.BLACK,
              fontFamily: strings.FONT_BOLD,
            }}
            timeToShow={['M', 'S']}
            timeLabels={{m: null, s: null}}
          />
        </View>
      );
    }
    return;
  };

  showCheckin = room => {
    const roomStyle = [
      styles.roomCont,
      room.order && room.order.is_booked
        ? styles.roomUnAvail
        : styles.roomAvail,
    ];

    return (
      <TouchableOpacity
        onPress={() => {
          const {customer, order} = room;
          const {customers} = this.props;
          const customer_id = customer
            ? customer.id
            : customers.data.length > 0
            ? customers.data[0].id
            : null;
          const order_id = order ? order.id : null;
          const isCheckout = order && order.is_booked ? true : false;
          let duration = null;

          if (isCheckout) {
            const date = new Date(order.order_end_time);

            duration = getTimeDiffMin(date);
          }

          this.handleResetState();
          this.setState({
            room_id: room.id,
            customer_id,
            order_id,
            roomName: room.name,
            duration,
            isCheckout,
          });
          this.toogleModal();
        }}>
        <View style={roomStyle}>
          {this.showTimer(room)}
          <View style={styles.roomNameCont}>
            <Text style={styles.roomName}>{room.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.CHKINCFG}</Text>
        <View style={styles.headBorder} />
      </View>
    );
  };

  renderSub = checkin => {
    return (
      <FlatList
        data={checkin}
        renderItem={({item}) => this.showCheckin(item)}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={this.renderHeader()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetCheckin()}
        refreshing={false}
      />
    );
  };

  showModal = () => {
    const {customers} = this.props;
    const {
      room_id,
      customer_id,
      order_id,
      roomName,
      duration,
      isCheckout,
      modalVisible,
    } = this.state;

    return (
      <Modal isVisible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.inputTitle}>
              {isCheckout ? 'Checkout' : 'Checkin'}
            </Text>
          </View>
          <Text style={styles.inputLabel}>{strings.RNAME}</Text>
          <TextInput
            style={styles.textInput}
            value={roomName}
            editable={false}
          />
          <Text style={styles.inputLabel}>{strings.CNAME}</Text>
          <Picker
            mode="dropdown"
            selectedValue={customer_id}
            onValueChange={itemValue => {
              this.setState({customer_id: itemValue});
            }}
            enabled={isCheckout ? false : true}>
            {customers.data.map(customer => {
              return (
                <Picker.Item
                  key={customer.id.toString()}
                  label={customer.name}
                  value={customer.id}
                />
              );
            })}
          </Picker>
          <Text style={styles.inputLabel}>
            {isCheckout ? strings.DURATION2 : strings.DURATION}
          </Text>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={duration => this.setState({duration})}
            value={isCheckout ? duration.toString() : null}
            editable={isCheckout ? false : true}
          />
          <View style={styles.btnInputCont}>
            <TouchableOpacity onPress={() => this.toogleModal()}>
              <Text style={styles.btnCancel}>{strings.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const data = {
                  room_id,
                  customer_id,
                  duration,
                };

                if (
                  !customer_id ||
                  !parseInt(duration) ||
                  isNaN(parseInt(duration))
                ) {
                  alert('Invalid data input.');
                  return;
                }

                this.toogleModal();
                isCheckout
                  ? this.handleAddCheckout(order_id)
                  : this.handleAddCheckin(data);
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
        <Text style={styles.headerText}>{strings.CHKINCFG}</Text>
        <View style={styles.headBorder} />
        <Empty />
      </View>
    );
  };

  render() {
    const {checkin} = this.props;

    if (checkin.error) {
      return <Error message={checkin.error} onPress={this.handleGetCheckin} />;
    }

    if (checkin.isLoading && !checkin.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {checkin.data.length > 0
            ? this.renderSub(checkin.data)
            : this.renderEmptyData()}
          {this.showModal()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers,
    checkin: state.checkin,
  };
};

const mapDispatchToProps = {
  fetchCheckin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checkin);

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
    flex: 1,
    padding: 5,
    margin: 5,
    minHeight: 100,
    maxHeight: 100,
    minWidth: 100,
    maxWidth: 100,
    borderRadius: 4,
    elevation: 5,
  },
  timerCont: {
    flex: 1,
    alignItems: 'flex-end',
  },
  roomNameCont: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  roomName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
    color: colors.WHITE,
  },
  formInput: {
    borderWidth: 1,
  },
  roomAvail: {
    backgroundColor: colors.GREEN,
  },
  roomUnAvail: {
    backgroundColor: colors.DARK_SILVER,
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
  dropDownCont: {
    maxHeight: 55,
  },
  dropDown: {
    backgroundColor: colors.WHITE,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    minHeight: 45,
    maxHeight: 45,
  },
  dropDownText: {
    fontFamily: strings.FONT,
    fontSize: 16,
  },
});
