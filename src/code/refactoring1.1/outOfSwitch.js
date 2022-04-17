//연극의 장르와 광객 규모를 기초로 비용을 책정

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    const format = new Intl.NumberFormat("en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];

        const thisAmount = amountFor(play, perf);

        volumeCredits += Math.max(perf.audience - 30, 0);

        if("comedy" === play.type)
            volumeCredits += Math.floor(perf.audience / 5);

        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
        totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;
    return result;

}

//switch를 따로 함수로 빼자
// perf, play, thisAmount가 필요한데 thisAmount는 값이 바뀌므로 이를 return으로 해주자
function amountFor(play, perf) {
    let thisAmount = 0;

    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;

            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;

            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown genre: ${play.type}`);
    }

    return thisAmount;

}

module.exports = statement;
