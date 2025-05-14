import { UserPost } from '@/types/models';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import ButtonCard from './ButtonCard';

interface PostCardProps extends UserPost {
  fullPost?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ imageUrl, username, title, id, fullPost = false }) => {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => router.push(`/users-profile?id=${id}`)} style={styles.profileContainer}>
        <Image source={{ uri: `https://i.pravatar.cc/150?u=${id}` }} style={styles.profileImg} />
        <Text style={styles.username}>@{username}</Text>
      </TouchableOpacity>
      <Image source={{ uri: `https://picsum.photos/seed/${id}/900/500` }} style={[styles.image, { height: fullPost ? 500 : 300 }]} />
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
