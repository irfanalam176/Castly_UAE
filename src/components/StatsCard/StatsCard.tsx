import React, { useEffect, useState } from 'react';
import {
  LogBox,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import NetworkLogger from 'react-native-network-logger';
import Draggable from 'react-native-draggable'
import { colors } from '../../utils/colors';
import OverlayModal from './overlayModal';
import { correctSize } from '../../utils';



const StatsCardWidth = 100;
export interface StatsCardProps { }

export interface IStats {
  jsFps: number;
  uiFps: number;
  usedCpu: number;
  usedRam: number;
  viewCount: number;
  visibleViewCount: number;
}
type IReactFC<T = object> = React.FC<T>;
const TOTALW: number = 812;
export const StatsCard: IReactFC<StatsCardProps> = () => {
  const [branch] = useState<string>();
  const [commit] = useState<string>();
  const [version, setVersion] = useState<string>();

  const [networkLoggerVisible, setNetworkLoggerVisible] = useState(false);
  const actionSheetRef = React.useRef(null);

  // console.log('Is it comming hereeeee');
  useEffect(() => {
    setVersion(DeviceInfo.getReadableVersion());
  });

  const envir = Config.ENVIRONMENT?.toLocaleUpperCase();

  return (
    <>
      <View style={styles.overlay} pointerEvents={'box-none'}>
        <Draggable
          x={StatsCardWidth}
          y={100}
          z={9999}
          shouldReverse={false}
          onDrag={() => { }}>
          <Pressable
            style={styles.container}
            onPress={() => setNetworkLoggerVisible(true)}>
            <View style={{ height: 'auto' }}>
              <Text style={styles.text}>
                Build: {version ?? '-'}
              </Text>
              <Text style={styles.text}>
                Branch: {branch ?? '-'}
              </Text>
              {/* <Text style={styles.text}>Commit: {commit}</Text> */}
              <Text style={styles.text}>
                Environment: {envir ?? '-'}
              </Text>
            </View>
          </Pressable>
        </Draggable>
      </View>
      <OverlayModal
        closeOverlay={() => setNetworkLoggerVisible(false)}
        visible={networkLoggerVisible}
        customStyle={{ height: '100%' }}>
        <View style={styles.main}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.black }}>
              Network Logger
            </Text>
          </View>
          <NetworkLogger />
        </View>
      </OverlayModal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: -40,
    right: 0,
    bottom: 0,
    left: 150,
    zIndex: 9999,
    elevation: 9999,
  },
  container: {
    backgroundColor: colors.yellow,
    padding: correctSize(10),
    width: 130,
    borderRadius: 20,
    overflow: 'hidden',
    height: 'auto',
    opacity: 0.3,
  },
  containerAlt: {
    position: 'absolute',
    zIndex: 9999,
    opacity: 0.5,
    right: 80,
    top: 40,
  },
  main: {
    paddingTop: correctSize(50),
    flex: 1,
  },
  text: {
    color: colors.black,
    fontSize: 9,
    lineHeight: 15,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: correctSize(3),
  },
});
