// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License for license information.

import React from 'react';
import PropTypes from 'prop-types';

import {makeStyleFromTheme} from 'mattermost-redux/utils/theme_utils';

export default class PostTypeS4b extends React.PureComponent {
    static propTypes = {

        /*
         * The post to render the message for.
         */
        post: PropTypes.object.isRequired,

        /*
         * Logged in user's theme.
         */
        theme: PropTypes.object.isRequired,

        /*
         * Creator's name.
         */
        creatorName: PropTypes.string.isRequired,
    };

    render() {
        const style = getStyle(this.props.theme);
        const post = this.props.post;
        const props = post.props || {};
        let preText;
        if (props.meeting_status === 'SCHEDULED') {
            preText = `${this.props.creatorName} has scheduled a meeting`;
        } else {
            preText = `${this.props.creatorName} has started a meeting`;
        }

        let content;
        if (props.meeting_status === 'SCHEDULED') {
            content = (
                <div>
                    <p>
                        Start date: {props.start_time}
                    </p>
                    <p>
                        End date: {props.end_time}
                    </p>
                </div>
            );
        } else {

            content = (
                <a
                    className='btn btn-lg btn-primary'
                    style={style.button}
                    rel='noopener noreferrer'
                    target='_blank'
                    href={props.meeting_link}
                >
                    {'JOIN MEETING'}
                </a>
            );
        }

        let title = 'Skype for Business Meeting';
        if (props.meeting_topic) {
            title = props.meeting_topic;
        }

        return (
            <div>
                {preText}
                <div style={style.attachment}>
                    <div style={style.content}>
                        <div style={style.container}>
                            <h1 style={style.title}>
                                {title}
                            </h1>
                            <div>
                                <div style={style.body}>
                                    {content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const getStyle = makeStyleFromTheme((theme) => {
    return {
        attachment: {
            marginLeft: '-20px',
            position: 'relative',
        },
        content: {
            borderRadius: '4px',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#BDBDBF',
            margin: '5px 0 5px 20px',
            padding: '2px 5px',
        },
        container: {
            borderLeftStyle: 'solid',
            borderLeftWidth: '4px',
            padding: '10px',
            borderLeftColor: '#89AECB',
        },
        body: {
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingRight: '5px',
            width: '100%',
        },
        title: {
            fontSize: '16px',
            fontWeight: '600',
            height: '22px',
            lineHeight: '18px',
            margin: '5px 0 1px 0',
            padding: '0',
        },
        button: {
            fontFamily: 'Open Sans',
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            lineHeight: '19px',
            marginTop: '12px',
            borderRadius: '4px',
            color: theme.buttonColor,
        },
        buttonIcon: {
            paddingRight: '8px',
            position: 'relative',
            fill: theme.buttonColor,
            top: '4px',
        },
    };
});
