export default {
    cityList: {
        encryption: {
            required: () => true,
            paramsInterceptor: (params, self) => {
                return ({...params, ...self.pickInjectParams()});
            }
        },
        methodName: 'Y10001',
    },
}
