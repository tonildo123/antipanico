import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview';

const WebViewComponent = () => {
    const url = 'https://guia-mipyme-blog.netlify.app/'
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: url }}  
                style={{ flex: 1 }}
            />
        </View>
    )
}

export default WebViewComponent