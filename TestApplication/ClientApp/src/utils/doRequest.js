import { NotificationManager } from 'react-notifications';

const defaultOptions = {
    successMsg: 'Успешно выполнено',
    showError: true,
    showSuccess: false
}

export const doRequest = async (request, errorMsg, opts = defaultOptions) => {
    const { showError, showSuccess, successMsg } = opts;

    try {
        let response = await request();
        response = await response.json();

        if (response.status === 403 || response.isError) {
            throw { response };
        }

        if (showSuccess) {
            NotificationManager.success(successMsg);
        }
        
        return ({
            data: response,
            error: null,
            success: true
        })
    } catch (e) {
        if (showError) {
            NotificationManager.error(e?.response?.message || 'Произошла ошибка');
        }
        
        return ({
            data: null,
            error: e?.response?.message,
            success: false,
            status: e?.response?.status
        })
    }
};