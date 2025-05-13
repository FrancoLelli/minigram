import { UserPost } from '@/types/models';
import { Link } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import LikeButton from './LikeButton';
import SendButton from './SendButton';

const PostCard: React.FC<UserPost> = ({ imageUrl, username, title, id }) => {
  return (
    <View style={styles.card}>
      <Link href={`/profile?userId=${id}`}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://picsum.photos/100/100" }} style={styles.profileImg} />
          <Text style={styles.username}>@{username}</Text>
        </View>
      </Link>
      <Image source={{ uri: "https://picsum.photos/900/500" }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actionsBanner}>
        <LikeButton />
        <SendButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ddd',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    color: '#333',
  },
  actionsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  }
});

export default PostCard;
