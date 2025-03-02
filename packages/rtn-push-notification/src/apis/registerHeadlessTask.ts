// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { AppRegistry } from 'react-native';
import { getConstants } from './getConstants';
import { NativeMessage, PushNotificationMessage } from '../types';
import { normalizeNativeMessage } from '../utils';

export const registerHeadlessTask = (
	task: (message: PushNotificationMessage | null) => Promise<void>,
): void => {
	const { NativeHeadlessTaskKey } = getConstants();
	if (NativeHeadlessTaskKey) {
		AppRegistry.registerHeadlessTask(
			NativeHeadlessTaskKey,
			() => async (nativeMessage: NativeMessage) => {
				await task(normalizeNativeMessage(nativeMessage));
			},
		);
	}
};
