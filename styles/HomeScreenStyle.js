import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff'
    },
    postSection: {
        marginBottom: 16,
        padding: 10,
        justifyContent: 'space-between',
        borderRadius: 8,
        backgroundColor: '#e9f7fc',
        height: 'auto'
    },
    postAddContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    postInput: {
        padding: 10,
        marginBottom: 8,
        width: "auto",
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginVertical: 10,
        borderRadius: 8,
    },

    mediaIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    storySection: {
        flexDirection: 'row',
        marginBottom: 16
    },
    storyItem: {
        alignItems: 'center',
        marginRight: 12
    },
    storyCircle: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: '#ddd',
        marginBottom: 4
    },
    storyText: {
        fontSize: 12
    },
    postContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        zIndex: -1,
        elevation: 0
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    postNameTime: {
        flexDirection: 'column',
        marginBottom: 4,
        padding: 10
    },
    postAuthor: {
        fontWeight: 'bold'
    },
    postText: {
        marginBottom: 8,
        paddingLeft: 5,
        zIndex: -1,
        paddingRight: 5
    },
    postImage: {
        width: '100%',
        height: 200,
        zIndex: -1,
        borderRadius: 8,
        marginBottom: 8
    },
    engagementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    commentBox: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },

    commentInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5,
    },

    submitButton: {
        color: '#3faeda',
        fontWeight: 'bold',
        textAlign: 'right',
        marginVertical: 'auto',
        fontSize: 24
    },

    noBorder: {
        borderWidth: 0,
        borderColor: 'transparent',
        outlineStyle: 'none', // iOS
        elevation: 0,         // Android
    },
    userCircle: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#ddd',
        marginBottom: 4
    },
    menuDropDown: {
        position: 'absolute', // Required for zIndex to work
        top: 50,               // Or 45, based on your need
        right: 0,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        zIndex: 9999,         // Ensure it's above other components
        elevation: 10,        // Important for Android in RN
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 40, // adjust for where menu should drop
        paddingRight: 10,
    },

    menuDropDown: {
        width: 120,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        zIndex: 9999,
        elevation: 20,
    }


});


