// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License for license information.

import {getFullName} from 'mattermost-redux/utils/user_utils';

export function displayUsernameForUser(user, config) {
    if (user) {
        const nameFormat = config.TeammateNameDisplay;
        let name = user.username;
        if (nameFormat === 'nickname_full_name' && user.nickname && user.nickname !== '') {
            name = user.nickname;
        } else if ((user.first_name || user.last_name) && (nameFormat === 'nickname_full_name' || nameFormat === 'full_name')) {
            name = getFullName(user);
        }

        return name;
    }

    return '';
}

export function isDesktopApp() {
    const userAgent = window.navigator.userAgent;
    return userAgent.indexOf('Mattermost') !== -1 && userAgent.indexOf('Electron') !== -1;
}