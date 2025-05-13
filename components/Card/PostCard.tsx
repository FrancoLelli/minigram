import { UserPost } from '@/types/models';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import ButtonCard from './ButtonCard';

const PostCard: React.FC<UserPost> = ({ imageUrl, username, title, id }) => {
  return (
    <View style={styles.card}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: "https://picsum.photos/100/100" }} style={styles.profileImg} />
        <Text style={styles.username}>@{username}</Text>
      </View>
      <Image source={{ uri: "https://picsum.photos/900/500" }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actionsBanner}>
        <View style={styles.leftActionsBanner}>
          <ButtonCard color={Colors.red} colorPressed={Colors.black} icon="heart-outline" iconPressed="heart" />
          <ButtonCard color={Colors.black} colorPressed={Colors.black} icon="send-outline" iconPressed="send" />
        </View>
        <ButtonCard color={Colors.black} colorPressed={Colors.black} icon="bookmark-outline" iconPressed="bookmark" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: Colors.white,
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 5,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
  },
  actionsBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftActionsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  }
});

export default PostCard;
