// 浦发的sessIonId
// const sessionId = 's%2FkaL3YUjZppASWJKCdM4jJUefepFZN7jsEgpjM5xiYY3eqwi94SQi2s%2FDG7XO4lqiLbx%2BXChCw1xWhF%2B6Ll3t8ZjRjXbDOxiAbv4q%2F10aUG4nWi3CnV6aM6BomdDNcqbvrHVddPDii7maX%2F2xGwfNufkGibbVFG3utmat0iR9DsKmrTShl70LfPr%2Fz%2FHV70pWd6M7k2Tj0Ra8RhiFgD%2BKrD444igmZew1jlokjRe5qH8n%2BK7Ja85g%3D%3D';

const cipher = '6c15f6f677613b4c2e41b7c7dcbb102214da87a4f09818c4feadd7f2cc8eea3e732a136d88bdc45cb77a99476e213d27194e23538eee1b0c0bf2f46bc5856689b9c3bbcd452828b75ca22d2a8f624d41e9ea5947709884643e8bb9fe17d1e4377e672a5e0d8e6978aa0796046ecde1944afc4c61bc66c723d95afcc276f3f7c549fdc6f5891da421ccb9eadb544945da65604bb83e32a51e4783b63159db92488876e865cb80675a0114184f35130822764b0085e64377c44a4b0e4daa1e66bf7698c5c5c9bd2eff680533ec97868e1f71203e21710988de0faeb051fad04d8a96dc7d452642b92c7f4f870497eda0ce305e7c758dd4ca1361b1888f03af3a61476f25baf8d496985b5dad889beea363d3570f845231f9f67d2a2d969814cb7b5202b1448737250e857a82e2e81f9e2a5865735d389d6f77fe03da0d3d39d21eae885ed6860490528913e09767e538fd';
const iv = '30818a022100b2183fdb55d83c9862b6102da024a798f40c481aee22eb6c42ca2d32838c8c51022100c5bf565f148c8f4a0ca76ae3ff45d0a06570b20c19ef0b4de23526bbb3337ba60420a58dd3f6cff3a533142f1facfccb94c5f497ebae86ffd7748295f8ab451b58c204202cf65da171766ea84079e97eed75c9fa0e78e52ff796967320f713e0cd76fca9';
const key = '3081890220650223ba43adb3d4bc14a82418a15b105e5eac56d35135b16f6a93c26210675f022100e5b53cd3be5e16ab39ee8167f00db13d2cbb9917ddaf0d1f1e9e3b0fbc6caf2a0420ae3b856711993ba74be4397fe3106540e7b8c2a180fcf82e86b160c14aa17c070420c2df5febe54b92ca375e05c1a1da3a4842b82a5688d2245e9a5222eb27535d4e';

const secretObject = JSON.stringify({cipher, iv, key})

class AccountManager{
    static account: AccountModel = {
        // sessionId,
        openId: null
    };

    static accountInfo(): AccountModel{
        return this.account
    }

    static accountSecret(){
        return secretObject;
    }

    static updateAccount(data: CGBAccount){
        this.account = {
            ...data,
            openId: data.userid,
        };
    }
}

export default AccountManager;
