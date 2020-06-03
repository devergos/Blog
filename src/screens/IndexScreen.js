import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = () => {
    const { state, addBlogPost } = useContext(BlogContext);


    return (
        <View style={styles.container}>
            <Text>Index Screen</Text>
            <Button title="Add a blogpost" onPress={() => addBlogPost()} />
            <FlatList
                data={state}
                keyExtractor={(blogPost) => blogPost.title}
                renderItem={({ item }) => {
                    return <Text>{item.title}</Text>
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default IndexScreen;