/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { type ReactNode } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { correctSize } from '../../utils';

interface OverlayModalProps {
  visible: boolean;
  closeOverlay: () => void;
  children: ReactNode;
  customStyle?: ViewStyle;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  visible,
  closeOverlay,
  children,
  customStyle,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType='slide'
      onRequestClose={closeOverlay}>
      <TouchableWithoutFeedback onPress={closeOverlay}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, customStyle]}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                persistentScrollbar={true}>
                {children}
              </ScrollView>
              <TouchableOpacity
                onPress={closeOverlay}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: correctSize(20),
  },
  closeButton: {
    padding: correctSize(10),
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OverlayModal;
