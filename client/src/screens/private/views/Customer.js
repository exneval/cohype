import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
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
import fetchCustomers from '../../../_store/customers';
import Error from '../../../components/error';
import Loading from '../../../components/loading';
import Empty from '../../../components/empty';

import background from '../../../assets/images/background.jpg';
import ava1 from '../../../assets/images/avatar1.png';
import ava2 from '../../../assets/images/avatar2.png';
import ava3 from '../../../assets/images/avatar3.png';
import ava4 from '../../../assets/images/avatar4.png';
import ava5 from '../../../assets/images/avatar5.png';
import ava6 from '../../../assets/images/avatar6.png';
import ava7 from '../../../assets/images/avatar7.png';
import ava8 from '../../../assets/images/avatar8.png';
import ava9 from '../../../assets/images/avatar9.png';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: null,
      customerName: null,
      customerIdNum: null,
      customerPhoneNum: null,
      modalVisible: false,
      isEdit: false,
    };
  }

  toogleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  handleCustomerEdit = (isEdit, customerId) => {
    this.setState({isEdit, customerId});
  };

  handleChangeName = customerName => {
    this.setState({customerName});
  };

  handleChangeIdNum = customerIdNum => {
    this.setState({customerIdNum});
  };

  handleChangePhoneNum = customerPhoneNum => {
    this.setState({customerPhoneNum});
  };

  handleGetCustomers = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchCustomers(METHOD_GET, user.id);
    } catch (error) {
      console.log(error);
    }
  };

  handleAddCustomer = async customerData => {
    try {
      const user = await getAuthKey();
      this.toogleModal();
      this.props.fetchCustomers(METHOD_POST, user.id, customerData);
    } catch (error) {
      console.log(error);
    }
  };

  handleEditCustomer = async (customerData, customerId) => {
    try {
      const user = await getAuthKey();
      this.toogleModal();
      this.props.fetchCustomers(METHOD_PUT, user.id, customerData, customerId);
    } catch (error) {
      console.log(error);
    }
  };

  renderFloatBtn = () => {
    return (
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => {
          this.handleChangeName(null);
          this.handleChangeIdNum(null);
          this.handleChangePhoneNum(null);
          this.handleCustomerEdit(false);
          this.toogleModal();
        }}>
        <Icon name="plus" size={25} color={colors.WHITE} />
      </TouchableOpacity>
    );
  };

  getAvatar = customer => {
    const avatar = [ava1, ava2, ava3, ava4, ava5, ava6, ava7, ava8, ava9];

    return avatar[(customer.id - 1) % avatar.length];
  };

  getColor = customer => {
    const {MAUVE, BGUM, CALAMANSI, MENTHOL, NPBLUE, MBPURPLE} = colors;
    const color = [MAUVE, BGUM, CALAMANSI, MENTHOL, NPBLUE, MBPURPLE];

    return color[(customer.id - 1) % color.length];
  };

  showCustomers = customer => {
    const {id, name, identity_number, phone_number} = customer;
    const color = this.getColor(customer);

    return (
      <TouchableOpacity
        onPress={() => {
          this.handleChangeName(name);
          this.handleChangeIdNum(identity_number);
          this.handleChangePhoneNum(phone_number);
          this.handleCustomerEdit(true, id);
          this.toogleModal();
        }}>
        <View style={[styles.customerCont, {backgroundColor: color}]}>
          <View style={styles.cDataCont}>
            <Text style={styles.cName}>{name}</Text>
            <Text style={styles.cIdNum}>{identity_number}</Text>
            <Text style={styles.cPhonNum}>{phone_number}</Text>
          </View>
          <Image source={this.getAvatar(customer)} style={styles.avatar} />
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>{strings.CUSTOMERCFG}</Text>
        <View style={styles.headBorder} />
      </View>
    );
  };

  renderSub = customers => {
    return (
      <FlatList
        data={customers}
        renderItem={({item}) => this.showCustomers(item)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.renderHeader()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetCustomers()}
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
              {this.state.isEdit ? 'Edit Customer' : 'Add Customer'}
            </Text>
          </View>
          <Text style={styles.inputLabel}>{strings.INPUT_NAME}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.handleChangeName(text)}
            value={this.state.customerName}
          />
          <Text style={styles.inputLabel}>{strings.INPUT_ID_NUM}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.handleChangeIdNum(text)}
            value={this.state.customerIdNum}
            keyboardType="numeric"
          />
          <Text style={styles.inputLabel}>{strings.INPUT_PHONE_NUM}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.handleChangePhoneNum(text)}
            value={this.state.customerPhoneNum}
            keyboardType="numeric"
          />
          <View style={styles.btnInputCont}>
            <TouchableOpacity onPress={() => this.toogleModal()}>
              <Text style={styles.btnCancel}>{strings.CANCEL}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const {
                  customerName,
                  customerIdNum,
                  customerPhoneNum,
                } = this.state;
                const data = {
                  name: customerName,
                  identity_number: customerIdNum,
                  phone_number: customerPhoneNum,
                  image: '',
                };

                this.state.isEdit
                  ? this.handleEditCustomer(data, this.state.customerId)
                  : this.handleAddCustomer(data);
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
        <Text style={styles.headerText}>{strings.CUSTOMERCFG}</Text>
        <View style={styles.headBorder} />
        <Empty />
      </View>
    );
  };

  render() {
    const {customers} = this.props;

    if (customers.error) {
      return (
        <Error message={customers.error} onPress={this.handleGetCustomers} />
      );
    }

    if (customers.isLoading && !customers.isPost) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} style={styles.background}>
          {customers.data.length > 0
            ? this.renderSub(customers.data)
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
    customers: state.customers,
  };
};

const mapDispatchToProps = {
  fetchCustomers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Customer);

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
  customerCont: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    margin: 5,
    minWidth: 310,
    maxWidth: 310,
    borderRadius: 8,
    elevation: 5,
  },
  cName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 24,
  },
  cIdNum: {
    fontFamily: strings.FONT,
    fontSize: 12,
  },
  cPhonNum: {
    fontFamily: strings.FONT,
    fontSize: 12,
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
  cDataCont: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    left: 30,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
