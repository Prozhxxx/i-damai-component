import React from "react";
import GlobalConstant from "@/util/GlobalConstant";

export default class AlertManager {
    static showAlert(content: string) {
        GlobalConstant.store.dispatch({
            type: 'ALERT',
            data: {
                isShow:true,
                content,
            }
        })
    }
}


