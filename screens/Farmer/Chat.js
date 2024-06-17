import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';
import COLORS from '../../constants/color';

import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelList, MessageList, MessageInput, OverlayProvider } from 'stream-chat-expo';

import { getUserIdAndToken, fetchUserDataById, fetchAllUsers } from '../../utils/fetchHelpers';
import { color } from 'react-native-elements/dist/helpers';

const client = StreamChat.getInstance('88h9mdnkfeyq');

const ChatUser = () => {
    const [channel, setChannel] = useState(null); // Initialize channel as null
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null); // Initialize user as null
    const [allUsers, setAllUsers] = useState([]); // Initialize user as null
    const [initialized, setInitialized] = useState(false); // Track initialization state

    useEffect(() => {
        const fetchData = async () => {
            const { userId } = await getUserIdAndToken();
            setUserId(userId);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await fetchUserDataById(userId);
                setUser(userData); // Set user data once fetched
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error (e.g., show a message, retry fetching, etc.)
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    useEffect(() => {
        async function init() {
            try {
                if (userId && user && !initialized) {
                    if (client.userID) {
                        await client.disconnectUser();
                    }
                    
                    await client.connectUser(
                        {
                            id: userId,
                            name: user?.data.user.firstname,
                            image: user?.data.user.profilePicture,
                        },
                        client.devToken(userId)
                    );

                    // if user id already exists in 'members', don't add current userId
                    const users = ["6660586cb7823317ac6fe141", "666058eab7823317ac6fe16b" ,"666058bab7823317ac6fe163", "66605285b7823317ac6fe010", "666056d8b7823317ac6fe05d"];
                    if (!users.includes(userId)) {
                        users.push(userId);
                    }

                    const newChannel = client.channel("messaging", {
                        members: users,
                    });

                    await newChannel.watch();

                    setChannel(newChannel);
                    setInitialized(true); // Mark initialization as complete
                }
            } catch (error) {
                console.error('Error connecting user or setting up channel:', error);
            }
        }

        init();
    }, [userId, user, initialized]);

    const theme = {
        messageSimple: {
            content: {
                senderMessageBackgroundColor: COLORS.lightGreen,
                receiverMessageBackgroundColor: '#FFFFFF',
            },
    
            text: {
                fontSize: 16,
                color: COLORS.orange,
                fontFamily: 'Quicksand_500Medium', // Specify the font family here
            },
        },
        messageList: {
            container: {
                backgroundColor: COLORS.offWhite,
            },
        },
    };

    const style = { style: theme };

    return (
        <OverlayProvider value={style}>
            { client && (
                <Chat client={client}>
                    {channel ? (
                        <Channel
                            channel={channel}
                            style={globalStyles.headerText}
                        >
                            <MessageList />
                            <MessageInput />
                        </Channel>
                    ) : (
                        <ChannelList
                            filters={{ members: { $in: [userId] } }}
                            onSelect={setChannel}
                        />
                    )}
                </Chat>
            )}
        </OverlayProvider>
    );
};

export default ChatUser;
