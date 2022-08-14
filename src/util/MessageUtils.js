import Alert from "react-s-alert";

export const messageService = (response) => {
    if (response.success && response.message) {
        Alert.success(response.message)
    } else if (!response.success) {
        response.errors && response.errors.map(e => {
            Alert.error(e.errorMsg)
        })
    }
}