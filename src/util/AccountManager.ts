const sessionId = 's%2FkaL3YUjZppASWJKCdM4jJUefepFZN7jsEgpjM5xiYY3eqwi94SQi2s%2FDG7XO4lqiLbx%2BXChCw1xWhF%2B6Ll3t8ZjRjXbDOxiAbv4q%2F10aUG4nWi3CnV6aM6BomdDNcqbvrHVddPDii7maX%2F2xGwfNufkGibbVFG3utmat0iR9DsKmrTShl70LfPr%2Fz%2FHV70pWd6M7k2Tj0Ra8RhiFgD%2BKrD444igmZew1jlokjRe5qH8n%2BK7Ja85g%3D%3D';
class AccountManager{
    static account = {
        sessionId,
        openId: null
    };
    static accountInfo(){
        return this.account
    }

    static updateAccountOpenId(openId){
        this.account.openId = openId;
    }
}

export default AccountManager;
