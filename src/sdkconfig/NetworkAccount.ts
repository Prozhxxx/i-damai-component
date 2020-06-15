export default {
    login: {
        methodName: 'C10006',
        params:{
            key: true,
        },
        book: ['key']
    },
    decrypt: {
        methodName: 'C10009',
        book: ['content'],
        params: {
            content: true
        }
    }
}
