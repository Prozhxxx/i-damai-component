interface CGBAccount {
    GetCurCityName: string
    Options: string
    crGroupNbr: string
    customerlevel: string
    loginflag: string
    paybackgr: string
    phoneNum: string
    rsa_random_num: string
    rsa_time_flag: string
    signvalue: string
    userid: string
    wdBranchX: string
    wdBranchY: string
}

type AccountModel = {
    [P in keyof CGBAccount]?: CGBAccount[P];
} & {
    openId: string
}
