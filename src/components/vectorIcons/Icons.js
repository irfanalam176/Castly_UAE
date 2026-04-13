import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { FontAwesome } from '@react-native-vector-icons/fontawesome';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { colors } from '../../utils/colors';



const Icons = ({ family, name, color, size, ...props }) => {
  let Family;
  switch (family) {
    // case 'AntDesign':
    //   Family = AntDesign;
    //   break;
    // case 'Entypo':
    //   Family = Entypo;
    //   break;
    // case 'EvilIcons':
    //   Family = EvilIcons;
    //   break;
    // case 'Feather':
    //   Family = Feather;
    //   break;
    case 'FontAwesome':
      Family = FontAwesome;
      break;
    // case 'FontAwesome5':
    //   Family = FontAwesome5;
    //   break;
    case 'FontAwesome6':
      Family = FontAwesome6;
      break;
    // case 'Fontisto':
    //   Family = Fontisto;
    //   break;
    // case 'Foundation':
    //   Family = Foundation;
    //   break;
    case 'Ionicons':
      Family = Ionicons;
      break;
    // case 'MaterialCommunityIcons':
    //   Family = MaterialCommunityIcons;
    //   break;
    case 'MaterialIcons':
      Family = MaterialIcons;
      break;
    // case 'Octicons':
    //   Family = Octicons;
    //   break;
    // case 'SimpleLineIcons':
    //   Family = SimpleLineIcons;
    //   break;
    // case 'Zocial':
    //   Family = Zocial;
    //   break;
    // case 'FontAwesome5Pro':
    //   Family = FontAwesome5Pro;
    //   break;
    default:
      Family = MaterialIcons;
  }

  return (
    <Family
      name={name || 'help-outline'}
      color={color || colors.black}
      size={size || 14}
      iconStyle={"solid"}
      {...props}
    />
  );
};
export default Icons;
